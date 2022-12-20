export interface GitBranch {
  sha: string;
  name: string;
  isProtected?: boolean;
}

export interface GitTree {
  sha: string;
  path: string;
  type: "blob" | "tree";
}
export interface GitBlob {
  sha: string;
  content: string;
}

export interface GitPullRequest {
  baseBranch: string;
  headBranch: string;
  url?: string;
}

export interface InboundEntity {
  id: string;
  baseSha: string;
  branchName: string;
  author: { name: string; email: string };
}

export interface InboundContent extends InboundEntity {
  content: Record<string, string>;
}

export interface CmsResult<T> {
  value?: T;
  error?: "conflict";
}

export interface GitClient {
  getBranches(): Promise<GitBranch[]>;
  getTree(sha: string, recursive?: boolean): Promise<GitTree[]>;
  getBlob(sha: string): Promise<GitBlob>;
  getExternalContent(
    repo: string,
    owner: string,
    path: string
  ): Promise<GitBlob>;
  setContent(content: InboundContent): Promise<GitBlob[]>;
  deleteEntity(content: InboundEntity): Promise<any>;
  createBranch(baseSha: string, branchName: string): Promise<CmsResult<void>>;
  createPullRequest(
    pullRequest: GitPullRequest
  ): Promise<CmsResult<GitPullRequest>>;
}

export interface CmsCache {
  get(key: string): Promise<any | undefined>;
  set(key: string, value: any): Promise<void>;
}

export interface CmsEntity {
  id: string;
  collection: string;
  meta: any;
  sha: string;
  index: string;
}
