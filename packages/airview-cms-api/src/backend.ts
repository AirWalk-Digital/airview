import cache from "./cache.js";
import {
  GitClient,
  GitBranch,
  GitTree,
  CmsEntity,
  InboundContent,
  InboundEntity,
} from "./interfaces";
import matter from "gray-matter";

export class CmsBackend {
  readonly _client: GitClient;
  readonly _exclusions: string[];

  constructor(client: GitClient) {
    this._client = client;
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

  private async _getCachedResponse<T>(
    fetcher: any,
    cacheKey: string,
    expireSecs?: number
  ) {
    const cached = await cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const data = await fetcher();

    await cache.set(cacheKey, data, expireSecs);
    return data;
  }

  async getBranches(): Promise<GitBranch[]> {
    return await this._getCachedResponse(
      async () => this._client.getBranches(), //needs fat arrow to avoid losing 'this' context.
      "branches",
      10
    );
  }

  async setContent(inboundContent: InboundContent): Promise<void> {
    const content = await this._client.setContent(inboundContent);
    for (const item of content) {
      await cache.set(item.sha, item);
    }
  }

  async deleteEntity(content: InboundEntity): Promise<void> {
    await this._client.deleteEntity(content);
    await cache.expire("branches");
  }

  async searchContent(branchSha: string, query: string) {
    return await cache.query(branchSha, query);
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
  async getEntries(
    sha: string
  ): Promise<Record<string, Record<string, CmsEntity>>> {
    const cachedMapping = await cache.get("meta|" + sha);
    if (cachedMapping) return cachedMapping;

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
          entities
            .map(async (entity): Promise<CmsEntity | null> => {
              const id = `${collection.path}/${entity.path}`;
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

                return {
                  id,
                  data: {
                    meta: matter(s).data,
                    collection: collection.path,
                    sha: entity.sha,
                  },
                };
              }
              return null;
            })
            .filter((f) => !!f)
        );

        const data = mapped.reduce(
          (ac, a) => (a === null ? ac : { ...ac, [a.id]: a.data }),
          {}
        );
        return { collection: collection.path, data };
      })
    );

    const final = results.reduce(
      (ac, a) => ({ ...ac, [a.collection]: a.data }),
      {}
    );
    await cache.set("meta|" + sha, final);
    return final;
  }
}
