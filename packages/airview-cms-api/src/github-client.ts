import jwt from "jsonwebtoken";
import {
  GitClient,
  GitTree,
  GitBlob,
  GitBranch,
  GitPullRequest,
  CmsResult,
  InboundContent,
  InboundEntity,
} from "./interfaces";
import fetch from "node-fetch";

interface Token {
  value: string;
  expiry: number;
}

export interface GithubClientConstructorNamedParameters {
  applicationId: string;
  installationId: string;
  privateKey: string;
  repositoryName: string;
  organisation: string;
  githubApiBaseUri?: string;
}

let token: Token;

export class GithubClient implements GitClient {
  private applicationId: string;
  private installationId: string;
  private privateKey: string;
  private repositoryName: string;
  private organisation: string;
  private githubApiBaseUri: string;

  constructor(private params: GithubClientConstructorNamedParameters) {
    this.applicationId = params.applicationId;
    this.installationId = params.installationId;
    this.privateKey = params.privateKey;
    this.repositoryName = params.repositoryName;
    this.organisation = params.organisation;
    this.githubApiBaseUri = params.githubApiBaseUri
      ? params.githubApiBaseUri
      : "https://api.github.com";
  }

  private githubRepoURI() {
    return `${this.githubApiBaseUri}/repos/${this.organisation}/${this.repositoryName}`;
  }

  private async _fetchWithHeaders(url: string, options: any = {}) {
    const headers = {
      ...(options?.headers || {}),
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${await this._getToken()}`,
    };

    const resp = await fetch(url, { ...options, headers });
    return resp;
  }

  private async _getToken(): Promise<string> {
    if (token === undefined || token.expiry < new Date().getTime() + 1000) {
      const timeSinceEpoch: number = new Date().getTime() / 1000;
      const payload = {
        iat: Math.floor(timeSinceEpoch - 100),
        exp: Math.floor(timeSinceEpoch + 100),
        iss: this.applicationId,
      };
      const encodedJwt: string = jwt.sign(payload, this.privateKey, {
        algorithm: "RS256",
      });
      const resp = await fetch(
        `${this.githubApiBaseUri}/app/installations/${this.installationId}/access_tokens`,
        {
          method: "POST",
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `Bearer ${encodedJwt}`,
          },
        }
      );
      const data: any = await resp.json();
      token = { value: data.token, expiry: Date.parse(data.expires_at) };
    }
    return token.value;
  }

  private async _deletePath(id: string, baseSha: string) {
    const url = `${this.githubRepoURI()}/contents/${id}?ref=${baseSha}`;
    const resp = await this._fetchWithHeaders(url);
    const data: any = await resp.json();
    if (resp.status != 200)
      throw Error(
        `Bad status getting contents for path ${
          resp.status
        } ${await resp.text()})`
      );
    const treeContent = data.map((i: any) => ({
      path: i.path,
      mode: "040000",
      type: "blob",
      sha: null,
    }));
    const tree = { base_tree: baseSha, tree: treeContent };
    const treeUrl = `${this.githubRepoURI()}/git/trees`;
    const treeResp = await this._fetchWithHeaders(treeUrl, {
      method: "POST",
      body: JSON.stringify(tree),
    });

    if (treeResp.status != 201)
      throw Error(
        `Bad status deleting tree ${resp.status} ${await resp.text()})`
      );

    const treeData: any = await treeResp.json();
    return treeData.sha;
  }

  private async _createTree(
    path: string,
    content: Record<string, string>,
    baseSha: string
  ): Promise<[string, GitBlob[]]> {
    const mapped = await Promise.all(
      Object.entries(content).map(async ([k, v]) => {
        const sha = await this._createBlob(v);
        return { path: `${path}/${k}`, mode: "100644", type: "blob", sha };
      })
    );
    const response = mapped.map(
      (m: any): GitBlob => ({
        sha: m.sha,
        content: content[m.path.replace(`${path}/`, "")],
      })
    );

    const tree = { base_tree: baseSha, tree: mapped };
    const url = `${this.githubRepoURI()}/git/trees`;
    const resp = await this._fetchWithHeaders(url, {
      method: "POST",
      body: JSON.stringify(tree),
    });
    const data: any = await resp.json();
    return [data.sha, response];
  }

  private async _updateBranch(commitSha: string, branchName: string) {
    const url = `${this.githubRepoURI()}/git/refs/heads/${branchName}`;
    const getResp = await this._fetchWithHeaders(url);

    if (getResp.status === 404) {
      const resp = await this._fetchWithHeaders(
        `${this.githubRepoURI()}/git/refs`,
        {
          method: "POST",
          body: JSON.stringify({
            ref: `refs/heads/${branchName}`,
            sha: commitSha,
          }),
        }
      );
      if (resp.status != 201)
        throw Error(
          `Bad status creating branch ${resp.status} ${await resp.text()})`
        );

      return;
    }

    const resp = await this._fetchWithHeaders(url, {
      method: "PATCH",
      body: JSON.stringify({ sha: commitSha }),
    });
    if (resp.status != 201 && resp.status != 200)
      throw Error(
        `Bad status updating branch ${resp.status} ${await resp.text()})`
      );
  }

  private async _createBlob(content: string): Promise<string> {
    const url = `${this.githubRepoURI()}/git/blobs`;
    const resp = await this._fetchWithHeaders(url, {
      method: "POST",
      body: JSON.stringify({ content, encoding: "base64" }),
    });
    if (resp.status != 201)
      throw Error(
        `Bad status posting content ${resp.status} ${await resp.text()})`
      );
    const data: any = await resp.json();
    return data.sha;
  }

  private async _commitTree(
    treeSha: string,
    baseSha: string,
    author: any
  ): Promise<string> {
    const url = `${this.githubRepoURI()}/git/commits`;
    const resp = await this._fetchWithHeaders(url, {
      method: "POST",
      body: JSON.stringify({
        message: "test",
        tree: treeSha,
        parents: [baseSha],
        author,
      }),
    });
    if (resp.status != 201)
      throw Error(
        `Bad status commiting tree ${resp.status} ${await resp.text()})`
      );
    const data: any = await resp.json();
    return data.sha;
  }

  async getBranches(): Promise<GitBranch[]> {
    const url = `${this.githubRepoURI()}/branches`;
    const resp = await this._fetchWithHeaders(url);
    if (resp.status != 200)
      throw Error(
        `Bad status getting branches ${resp.status} ${await resp.text()})`
      );
    const data: any = await resp.json();
    const mapped = data.map(
      (item: any): GitBranch => ({
        name: item.name,
        sha: item.commit.sha,
        isProtected: item.protected,
      })
    );
    return mapped;
  }

  async getTree(sha: string, recursive: boolean = false): Promise<GitTree[]> {
    // const url = `${this.githubRepoURI()}/git/trees/${sha}?recursive=${recursive}`;
    const url = `${this.githubRepoURI()}/git/trees/${sha}${
      recursive ? "?recursive=true" : ""
    }`;
    const resp = await this._fetchWithHeaders(url);
    if (resp.status != 200)
      throw Error(
        `Bad status getting tree ${resp.status} ${await resp.text()})`
      );
    const data: any = await resp.json();

    return data.tree.map((item: any) => ({
      sha: item.sha,
      path: item.path,
      type: item.type,
    }));
  }

  async getBlob(sha: string): Promise<GitBlob> {
    const url = `${this.githubRepoURI()}/git/blobs/${sha}`;
    const resp = await this._fetchWithHeaders(url);
    if (resp.status != 200)
      throw Error(
        `Bad status getting blob ${resp.status} ${await resp.text()})`
      );
    const data: any = await resp.json();
    return { sha: data.sha, content: data.content };
  }

  async getExternalContent(
    repo: string,
    owner: string,
    path: string
  ): Promise<GitBlob> {
    const url = `${this.githubApiBaseUri}/repos/${owner}/${repo}/contents/${path}`;
    const resp = await this._fetchWithHeaders(url);
    if (resp.status != 200) {
      throw Error(
        `Bad status getting external content ${
          resp.status
        } ${await resp.text()})`
      );
    }
    const data: any = await resp.json();
    return { sha: data.sha, content: data.content };
  }

  async setContent(inboundContent: InboundContent): Promise<GitBlob[]> {
    // needs to commit content and somehow announce the sha's of the content it put to github so they can be mapped to the base64 content
    // this will allow us to cache the blob without a second call to git
    const [treeSha, blobs] = await this._createTree(
      inboundContent.id,
      inboundContent.content,
      inboundContent.baseSha
    );
    const commitSha = await this._commitTree(
      treeSha,
      inboundContent.baseSha,
      inboundContent.author
    );
    await this._updateBranch(commitSha, inboundContent.branchName);
    return blobs;
  }

  async deleteEntity(inboundEntity: InboundEntity) {
    const treeSha = await this._deletePath(
      inboundEntity.id,
      inboundEntity.baseSha
    );
    const commitSha = await this._commitTree(
      treeSha,
      inboundEntity.baseSha,
      inboundEntity.author
    );
    await this._updateBranch(commitSha, inboundEntity.branchName);
  }

  async createBranch(
    baseSha: string,
    branchName: string
  ): Promise<CmsResult<void>> {
    const resp = await this._fetchWithHeaders(
      `${this.githubRepoURI()}/git/refs`,
      {
        method: "POST",
        body: JSON.stringify({
          ref: `refs/heads/${branchName}`,
          sha: baseSha,
        }),
      }
    );
    if (resp.status == 201) return {};
    if (resp.status == 422) return { error: "conflict" };

    throw Error(
      `Bad status creating branch ${resp.status} ${await resp.text()})`
    );
  }

  async createPullRequest(
    pullRequest: GitPullRequest
  ): Promise<CmsResult<GitPullRequest>> {
    const resp = await this._fetchWithHeaders(`${this.githubRepoURI()}/pulls`, {
      method: "POST",
      body: JSON.stringify({
        title: `Merge ${pullRequest.headBranch} into ${pullRequest.baseBranch}`,
        base: pullRequest.baseBranch,
        head: pullRequest.headBranch,
      }),
    });

    if (resp.status == 201) {
      const { html_url } = await resp.json();
      return { value: { ...pullRequest, url: html_url } };
    }

    if (resp.status == 422) return { error: "conflict" };

    throw Error(
      `Bad status creating branch ${resp.status} ${await resp.text()})`
    );
  }
}
