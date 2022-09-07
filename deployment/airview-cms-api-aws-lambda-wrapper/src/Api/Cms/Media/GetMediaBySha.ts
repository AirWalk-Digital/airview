// import { CmsApiHandler } from "../../../Handler/CmsApiHandler.js";
import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
// import { Errors, Request, Response, Utilities } from "ts-lambda-handler";

import { CmsBackend, S3Cache, GithubClient } from "airview-cms-api";
import { SecretsManager } from "aws-sdk";

function getEnvVar(envVarName: string): string {
  // Make sure our Encrypted variable exists.
  if (process.env[envVarName] == undefined) {
    throw new Error(envVarName + " is not a valid process variable.");
  }
  return process.env[envVarName]!;
}

function GithubClientSingletonFactory(): any {
  async function getGithubSecretPemValue(): Promise<string> {
    const secretId: string = getEnvVar("GITHUB_PEM_SECRET_ID");
    const secretManager: SecretsManager = new SecretsManager();
    let data: any;
    let secret: string;

    data = await secretManager.getSecretValue({ SecretId: secretId }).promise();

    if ("SecretString" in data) {
      secret = data.SecretString;
    } else {
      throw Error("SecretString not in AWS Secrets manager response!");
    }

    return Promise.resolve(secret);
  }

  var instance: GithubClient;
  return {
    getInstance: async function (): Promise<GithubClient> {
      if (!instance) {
        const githubPemSecret: string = await getGithubSecretPemValue();
        const githubClientConfig = {
          applicationId: getEnvVar("GITHUB_APP_ID"),
          installationId: getEnvVar("GITHUB_INSTALL_ID"),
          privateKey: githubPemSecret,
          repositoryName: getEnvVar("GITHUB_REPO_NAME"),
          organisation: getEnvVar("GITHUB_ORG_NAME"),
          githubApiBaseUri: getEnvVar("GITHUB_API_BASE"),
        };
        instance = new GithubClient(githubClientConfig);
        delete instance.constructor;
      }
      return instance;
    },
  };
}

const s3CacheBucketConfig = {
  bucketName: getEnvVar("AWS_S3_BUCKET"),
  bucketRegion: getEnvVar("AWS_S3_REGION"),
};
const s3CacheBucket = new S3Cache(s3CacheBucketConfig);

export class GetMediaBySha {
  public async handle(
    event: APIGatewayEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    const githubClient = await GithubClientSingletonFactory().getInstance();
    const cmsBackend = new CmsBackend(githubClient, s3CacheBucket);
    let data: any;
    const path: string = event.queryStringParameters["path"];
    const sha: string = event.pathParameters["sha"];
    console.log(`Query String: path == "${path}"`);
    console.log(`Query String: sha == "${sha}"`);

    data = await cmsBackend.getTreeContent(sha, path);
    return {
      statusCode: 200,
      body: data.content,
      isBase64Encoded: true,
    };
  }
}
/********
export class GetMediaByShaOld extends CmsApiHandler {
  public async process(request: Request, response: Response): Promise<void> {
    let data: any;
    try {
      const path: string = request.getQueryStringParameter("path", "");
      const sha = request.getPathParameter("sha");
      Utilities.Functions.print_debug(`Query String: path == "${path}"`);
      Utilities.Functions.print_debug(`Query String: sha == "${sha}"`);

      if (path === "") {
        console.error("Missing path query string parameters!");
        this.response.fail(new Errors.BadRequestError());
        return Promise.resolve();
      }

      data = await this.cmsBackend.getTreeContent(
        request.getPathParameter("sha"),
        path
      );
      Utilities.Functions.print_debug(`Data: ${data.content}`);
    } catch (error) {
      console.log(error);
      this.response.fail(
        new Errors.InternalServerError({
          Function: this.context.functionName,
          Name: this.context.logStreamName,
          Request: this.context.awsRequestId,
        })
      );
    }

    // const buffer = Buffer.from(data.content, "base64");

    response
      .setBody(data.content)
      .addHeader("content-type", "application/octet-stream")
      .send();
    return Promise.resolve();
  }
}
*/
