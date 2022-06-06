import fs from "fs";
import jwt from "jsonwebtoken";
import {
  GitClient,
  GitTree,
  GitBlob,
  GitBranch,
  InboundContent,
  InboundEntity,
  IdentifiableEntity,
} from "./interfaces";
import fetch from "node-fetch";

const appId = process.env.APP_ID;
const installationId = process.env.INSTALLATION_ID;
const repo = process.env.REPO;
const org = process.env.ORG;

interface Token {
  value: string;
  expiry: number;
}

export function getTokenFromPrivateKeyCb(privateKeyPath: string) {
  let token: Token;
  const privateKey = fs.readFileSync(privateKeyPath);

  async function getToken(): Promise<string> {
    if (token === undefined || token.expiry < new Date().getTime() + 1000) {
      const timeSinceEpoch: number = new Date().getTime() / 1000;
      const payload = {
        iat: Math.floor(timeSinceEpoch - 100),
        exp: Math.floor(timeSinceEpoch + 100),
        iss: appId,
      };
      const encodedJwt: string = jwt.sign(payload, privateKey, {
        algorithm: "RS256",
      });
      const resp = await fetch(
        `https://api.github.com/app/installations/${installationId}/access_tokens`,
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
  return getToken;
}

export class GithubClient implements GitClient {
  private _getToken!: () => Promise<string>;
  constructor(getTokenCallback: () => Promise<string>) {
    this._getToken = getTokenCallback;
  }
  private async _fetchWithHeaders(url: string, options: any = {}) {
    const headers = {
      ...(options?.headers || {}),
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${await this._getToken()}`,
      "Content-Type": "application/json",
    };

    const resp = await fetch(url, { ...options, headers });
    return resp;
  }

  private async _deletePath(id: string, baseSha: string) {
    const url = `https://api.github.com/repos/${org}/${repo}/contents/${id}?ref=${baseSha}`;
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
    const treeUrl = `https://api.github.com/repos/${org}/${repo}/git/trees`;
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
    console.log(tree);
    const url = `https://api.github.com/repos/${org}/${repo}/git/trees`;
    const resp = await this._fetchWithHeaders(url, {
      method: "POST",
      body: JSON.stringify(tree),
    });
    const data: any = await resp.json();
    console.log(response);
    return [data.sha, response];
  }

  private async _updateBranch(commitSha: string, branchName: string) {
    const url = `https://api.github.com/repos/${org}/${repo}/git/refs/heads/${branchName}`;
    const getResp = await this._fetchWithHeaders(url);

    if (getResp.status === 404) {
      const resp = await this._fetchWithHeaders(
        `https://api.github.com/repos/${org}/${repo}/git/refs`,
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
    const url = `https://api.github.com/repos/${org}/${repo}/git/blobs`;
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
    const url = `https://api.github.com/repos/${org}/${repo}/git/commits`;
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
    const url = `https://api.github.com/repos/${org}/${repo}/branches`;
    const resp = await this._fetchWithHeaders(url);
    if (resp.status != 200)
      throw Error(
        `Bad status getting branches ${resp.status} ${await resp.text()})`
      );
    const data: any = await resp.json();
    const mapped = data.map((item: any) => ({
      name: item.name,
      sha: item.commit.sha,
      protected: item.protected,
    }));
    return mapped;
  }

  async getTree(sha: string): Promise<GitTree[]> {
    const url = `https://api.github.com/repos/${org}/${repo}/git/trees/${sha}`;
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
    const url = `https://api.github.com/repos/${org}/${repo}/git/blobs/${sha}`;
    const resp = await this._fetchWithHeaders(url);
    if (resp.status != 200)
      throw Error(
        `Bad status getting blob ${resp.status} ${await resp.text()})`
      );
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

  async deleteEntity(inboundEntity: IdentifiableEntity) {
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
}
