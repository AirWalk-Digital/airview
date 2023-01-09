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

  /**
   * Returns an array of branches
   *
   * @remarks
   * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
   *
   * @returns The array of branches
   *
   */
  async getBranches(): Promise<GitBranch[]> {
    return this._client.getBranches();
  }

  /**
   * Creates a branch at the git backend
   * @param baseSha - The SHA of the commit to branch from
   * @param branchName - The name of the branch
   *
   * @returns The result indicating the success of the operation
   *
   */
  async createBranch(
    baseSha: string,
    branchName: string
  ): Promise<CmsResult<void>> {
    return this._client.createBranch(baseSha, branchName);
  }

  /**
   * Creates a pull request at the git backend
   * @param baseSha - The SHA of the commit to branch from
   * @param branchName - The name of the branch
   *
   * @returns The result object containing the details of the PR or indication of failure
   *
   */
  async createPullRequest(
    pullRequest: GitPullRequest
  ): Promise<CmsResult<GitPullRequest>> {
    return this._client.createPullRequest(pullRequest);
  }

  /**
   * Pushes the content to the git backend.
   *
   * The inbound object descibes what is being pushed and holds the content to be persistend in base64 encoding
   *
   * @param inboundContent - The object to push to the backend
   *
   * @returns A promise indicating the success/failure of the operation
   *
   */
  async setContent(inboundContent: InboundContent): Promise<void> {
    const content = await this._client.setContent(inboundContent);
    for (const item of content) {
      await this._cache.set(item.sha, item);
    }
  }

  /**
   * Deletes an entity from the git backend
   *
   * @param content - The details of the content to delete
   *
   * @returns A promise indicating the success/failure of the operation
   *
   */
  async deleteEntity(content: InboundEntity): Promise<void> {
    await this._client.deleteEntity(content);
  }

  /**
   * Get the content at a given path from within a git tree in base64 encoded format
   *
   * @param treeSha - The sha of the tree to fetch content from
   * @param path - The relative path of the content in the tree to return
   *
   * @returns - The content in base64 encoded format
   *
   */
  async getTreeContent(
    treeSha: string,
    path: string
  ): Promise<Record<string, string>> {
    const listing = await this.getListing(treeSha);
    const sha = listing[path];
    if (!sha) {
      throw Error("No content sha for requested path");
    }
    const blobFetcher = async () => this._client.getBlob(sha);
    const blob = await this._getCachedResponse(blobFetcher, sha);
    return { content: blob.content };
  }

  /**
   * Gets the listing and entry meta data for the provided branch sha
   *
   * @param sha - The sha of the branch to get the data from
   *
   * @returns - The listing and meta data
   *
   * @remarks
   * This is the basis for how the bulk of the cms backend works.
   * The CMS relies on a per-branch description of the site structure and metadata so that it can allow a consumer access to peices of info
   * without having to parse many markdown files on the fly. e.g. to construct a nav.
   *
   * We do not have a database to work with, so any metadata is stamped into an _index.md markdown file as frontmatter.
   * When a commit is made and this method is called using new new sha, the method pulls the neccesary files and reconstructs
   * the data based on the changes.
   * Assest are cached locally to avoid rate limiting and to prevent computing data which we already have.
   * Because of the nature of how git works as a set of nested immutable trees/objects, we know if we have seen the sha of a tree/object before
   * then we can re-use any data previously pulled from git or constucted here.
   * By carrying out this caching, when a push to a document is made via the cms and this method subsequently invoked,
   * we can keep the response time down to a minimum pulling mostly cached assets.
   *
   * Folder structure at the cms only goes 3 levels deep, so for a call to this method we should only need direct 3 api requests to git to find
   * what has changed and prepare the response with the rest being constructed from the cache.
   */
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
    const resp: any = {};

    await Promise.all(
      collections.map(async (collection) => {
        const entities = await this._getFilteredTree(
          collection.sha,
          () => true
        );

        await Promise.all(
          entities.map(async (entity): Promise<any> => {
            const recursiveTreeGet = async () =>
              await this._client.getTree(entity.sha, true);
            const recursiveTree = await this._getCachedResponse<pathSha>(
              recursiveTreeGet,
              entity.sha
            );

            await Promise.all(
              recursiveTree
                .filter((f: any) => f.type === "blob")
                .map(async (entityBlob: any) => {
                  /*
                  const cachedTree = await this._cache.get(
                    `tree|${entity.sha}|${id}`
                  );
                  if (cachedTree) return cachedTree;
		  */

                  resp[collection.path] = resp[collection.path] || {};
                  resp[collection.path][entity.path] =
                    resp[collection.path][entity.path] || {};

                  resp[collection.path][entity.path][entityBlob.path] = {
                    sha: entityBlob.sha,
                  };
                  if (
                    entityBlob.path.endsWith("md") ||
                    entityBlob.path.endsWith("mdx")
                  ) {
                    const blobFetcher = async () =>
                      await this._client.getBlob(entityBlob.sha);
                    const blob = await this._getCachedResponse(
                      blobFetcher,
                      entityBlob.sha
                    );
                    var b = Buffer.from(blob.content, "base64");
                    var s = b.toString();

                    resp[collection.path][entity.path][entityBlob.path].meta =
                      matter(s).data;
                  }
                })
            );
          })
        );
      })
    );

    //    await this._cache.set(`meta|${sha}`, { meta, listing });
    //    return { listing, meta };
    return { meta: resp };
  }

  /**
   * Get the listing for the sha provided
   *
   * @param sha - The sha of the tree to fetch content from
   *
   * @returns - The listing at the sha provided
   *
   */
  async getListing(sha: string): Promise<Record<string, string>> {
    return (await this.getData(sha)).listing;
  }
  /**
   * Get the entries metat for the sha provided
   *
   * @param sha - The sha of the tree to fetch content from
   *
   * @returns - The entries meta for the sha provided
   *
   */
  async getEntries(sha: string): Promise<CmsEntity[]> {
    return (await this.getData(sha)).meta;
  }

  /**
   * Get the external content for the data givem
   *
   * @param repo - The name of the external repo
   * @param owner - The name of the external owner
   * @param path - The name of the external path
   *
   * @returns - The dxternal content in base64 encoded format
   *
   */
  async getExternalData(
    repo: string,
    owner: string,
    path: string
  ): Promise<Record<string, string>> {
    const blob = await this._client.getExternalContent(repo, owner, path);
    return { content: blob.content };
  }
}
