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

function githubClientSingletonFactory(): any {
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

export function cmsBackendFactory() {
  const s3CacheBucketConfig = {
    bucketName: getEnvVar("AWS_S3_BUCKET"),
    bucketRegion: getEnvVar("AWS_S3_REGION"),
  };
  const s3CacheBucket = new S3Cache(s3CacheBucketConfig);

  const githubClientFactory = githubClientSingletonFactory();

  async function getInstance(): Promise<CmsBackend> {
    const githubClient = await githubClientFactory.getInstance();
    const cmsBackend = new CmsBackend(githubClient, s3CacheBucket);
    return cmsBackend;
  }
  return { getInstance };
}
