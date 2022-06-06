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

interface InboundItemDescriptor {
  baseSha: string;
  branchName: string;
  author: { name: string; email: string };
}

export interface IdentifiableEntity extends InboundItemDescriptor {
  id: string;
}

export interface InboundEntity extends InboundItemDescriptor {
  name: string;
  collection: string;
  content: Record<string, string>;
}

export interface OutboundEntity {
  id: string;
  name: string;
  collection: string;
  entity: string;
}

export interface InboundContent extends IdentifiableEntity {
  content: Record<string, string>;
}

export interface GitClient {
  getBranches(): Promise<GitBranch[]>;
  getTree(sha: string): Promise<GitTree[]>;
  getBlob(sha: string): Promise<GitBlob>;
  setContent(content: InboundContent): Promise<GitBlob[]>;
  deleteEntity(content: IdentifiableEntity): Promise<any>;
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
}
