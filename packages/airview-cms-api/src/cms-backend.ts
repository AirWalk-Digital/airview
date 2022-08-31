import {
  GitClient,
  GitBranch,
  GitTree,
  GitPullRequest,
  CmsEntity,
  InboundContent,
  InboundEntity,
  CmsCache,
  CmsResult,
} from "./interfaces";
import matter from "gray-matter";

export class CmsBackend {
  readonly _client: GitClient;
  readonly _cache: CmsCache;
  readonly _exclusions: string[];

  constructor(client: GitClient, cache: CmsCache) {
    this._client = client;
    this._cache = cache;
    this._exclusions =
      process.env.EXCLUSIONS == undefined
        ? []
        : process.env.EXCLUSIONS.split(",");
  }

  private async _getFilteredTree(
    sha: string,
    filterFunc: any = (x: GitTree) => x
  ): Promise<GitTree[]> {
    const fetcher = async () => await this._client.getTree(sha);
    const data = await this._getCachedResponse(fetcher, sha);
    const filtered = data.filter(filterFunc);
    return filtered;
  }

  private async _getCachedResponse<T>(fetcher: any, cacheKey: string) {
    const cached = await this._cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const data = await fetcher();

    await this._cache.set(cacheKey, data);
    return data;
  }

  async getBranches(): Promise<GitBranch[]> {
    return this._client.getBranches();
  }

  async createBranch(
    baseSha: string,
    branchName: string
  ): Promise<CmsResult<void>> {
    return this._client.createBranch(baseSha, branchName);
  }

  async createPullRequest(
    pullRequest: GitPullRequest
  ): Promise<CmsResult<GitPullRequest>> {
    return this._client.createPullRequest(pullRequest);
  }

  async setContent(inboundContent: InboundContent): Promise<void> {
    const content = await this._client.setContent(inboundContent);
    for (const item of content) {
      await this._cache.set(item.sha, item);
    }
  }

  async deleteEntity(content: InboundEntity): Promise<void> {
    await this._client.deleteEntity(content);
  }

  async searchContent(branchSha: string, query: string) {
    return [];
  }

  async getTreeContent(
    treeSha: string,
    path: string
  ): Promise<Record<string, string>> {
    const listing = await this.getListing(treeSha);
    const sha = listing[path];
    if (!sha) {
      throw Error("No sha for path");
    }
    const blobFetcher = async () => this._client.getBlob(sha);
    const blob = await this._getCachedResponse(blobFetcher, sha);
    return { content: blob.content };
    /*
    const cb = async () => await this._client.getTree(treeSha, true);
    const files = await this._getCachedResponse(cb, treeSha);
    const file = files.find((f: any) => f.type === "blob" && f.path === path);

    const blobFetcher = async () => this._client.getBlob(file.sha);
    const blob = await this._getCachedResponse(blobFetcher, file.sha);
    return { content: blob.content };
    */
  }

  async getContent(sha: string): Promise<Record<string, string>> {
    const cb = async () => await this._client.getTree(sha);
    const files = await this._getCachedResponse(cb, sha);
    const filtered = files.filter((f: any) => f.type === "blob");

    // get content
    const results = await Promise.all(
      filtered.map(async (item: any) => {
        const blobFetcher = async () => this._client.getBlob(item.sha);
        const blob = await this._getCachedResponse(blobFetcher, item.sha);
        return { name: item.path, data: blob.content };
      })
    );

    return results.reduce((ac, a) => ({ ...ac, [a.name]: a.data }), {});
  }

  async getData(sha: string): Promise<any> {
    interface pathSha {
      path: string;
      sha: string;
    }

    const cachedMapping = await this._cache.get("meta|" + sha);
    if (cachedMapping) {
      return cachedMapping;
    }

    const collections = await this._getFilteredTree(sha, () => true);

    let listing: Record<string, string> = {};
    let meta: CmsEntity[] = [];
    await Promise.all(
      collections.map(async (collection) => {
        if (collection.type === "blob") {
          listing[String(`${collection.path}`)] = collection.sha;
          return;
        }
        const entities = await this._getFilteredTree(
          collection.sha,
          () => true
        );

        await Promise.all(
          entities.map(async (entity): Promise<any> => {
            if (entity.type === "blob") {
              listing[String(`${collection.path}/${entity.path}`)] = entity.sha;
              return;
            }
            /*
            const id = `${collection.path}/${entity.path}`;
            const cachedTree = await this._cache.get(
              `tree|${entity.sha}|${id}`
            );
            if (cachedTree) return cachedTree;
	    */

            const recursiveTreeGet = async () =>
              await this._client.getTree(entity.sha, true);
            const recursiveTree = await this._getCachedResponse<pathSha>(
              recursiveTreeGet,
              entity.sha
            );

            const obj = recursiveTree
              .filter((f: any) => f.type === "blob")
              .reduce(
                (acc: Record<string, string>, item: any) => ({
                  ...acc,
                  [`${collection.path}/${entity.path}/${item.path}`]: item.sha,
                }),
                {}
              );

            await Promise.all(
              recursiveTree
                .filter((f: any) => f.type === "blob")
                .map(async (entityBlob: any) => {
                  const id = `${collection.path}/${entity.path}`;
                  /*
                  const cachedTree = await this._cache.get(
                    `tree|${entity.sha}|${id}`
                  );
                  if (cachedTree) return cachedTree;
		  */

                  if (entityBlob.path === "_index.md") {
                    const blobFetcher = async () =>
                      await this._client.getBlob(entityBlob.sha);
                    const blob = await this._getCachedResponse(
                      blobFetcher,
                      entityBlob.sha
                    );
                    var b = Buffer.from(blob.content, "base64");
                    var s = b.toString();

                    const thisTree = {
                      id,
                      collection: collection.path,
                      sha: entity.sha,
                      meta: matter(s).data,
                    };
                    // await this._cache.set(`tree|${entity.sha}|${id}`, thisTree);
                    meta.push(thisTree);
                    // return thisTree;
                  }
                })
            );
            Object.assign(listing, obj);
          })
        );
      })
    );

    await this._cache.set(`meta|${sha}`, { meta, listing });
    return { listing, meta };
  }

  async getListing(sha: string): Promise<Record<string, string>> {
    return (await this.getData(sha)).listing;
  }
  async getEntries(sha: string): Promise<CmsEntity[]> {
    return (await this.getData(sha)).meta;
    /*
    const cachedMapping = await this._cache.get("meta|" + sha);
    if (cachedMapping) {
      return cachedMapping;
    }

    const collections = await this._getFilteredTree(
      sha,
      (item: GitTree) =>
        item.type == "tree" &&
        this._exclusions.find((f) => f === item.path) === undefined
    );

    const results = await Promise.all(
      collections.map(async (collection) => {
        const entities = await this._getFilteredTree(
          collection.sha,
          (item: GitTree) => item.type == "tree"
        );

        const mapped = await Promise.all(
          entities.map(async (entity): Promise<CmsEntity | null> => {
            const id = `${collection.path}/${entity.path}`;
            const cachedTree = await this._cache.get(
              `tree|${entity.sha}|${id}`
            );
            if (cachedTree) return cachedTree;
            const filtered = await this._getFilteredTree(
              entity.sha,
              (item: GitTree) =>
                item.path === "_index.md" && item.type === "blob"
            );

            if (filtered.length == 1) {
              const blobFetcher = async () =>
                await this._client.getBlob(filtered[0].sha);
              const blob = await this._getCachedResponse(
                blobFetcher,
                filtered[0].sha
              );
              var b = Buffer.from(blob.content, "base64");
              var s = b.toString();

              const thisTree = {
                id,
                collection: collection.path,
                sha: entity.sha,
                meta: matter(s).data,
              };
              await this._cache.set(`tree|${entity.sha}|${id}`, thisTree);
              return thisTree;
            }
            return null;
          })
        );
        return mapped.filter((x): x is CmsEntity => x !== null);
      })
    );

    const final = results.reduce((acc, val) => acc.concat(val), []);
    await this._cache.set(`meta|${sha}`, final);
    return final;
  */
  }
}
