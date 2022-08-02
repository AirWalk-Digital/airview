import { Handlers, Errors, Utilities } from "ts-lambda-handler";
import { Context, APIGatewayEvent, ProxyCallback } from "aws-lambda";
import {
  S3CacheConstructorNamedParameters,
  GithubClientConstructorNamedParameters,
  CmsBackend,
  S3Cache,
  GithubClient,
} from "airview-cms-api";
import { getEnvVar } from "../Utilities/Functions.js";
import { SecretsManager } from "aws-sdk";
import jwt_decode from "jwt-decode";

function GithubClientSingletonFactory(): any {
  async function getGithubSecretPemValue(): Promise<string> {
    const secretId: string = getEnvVar("GITHUB_PEM_SECRET_ID");
    const secretManager: SecretsManager = new SecretsManager();
    let data: any;
    let secret: string;

    data = await secretManager.getSecretValue({ SecretId: secretId }).promise();

    Utilities.Functions.print_debug(`Secret Data: ${JSON.stringify(data)}`);

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

export abstract class CmsApiHandler extends Handlers.AbstractHandler {
  private s3CacheBucketConfig!: S3CacheConstructorNamedParameters;
  protected s3CacheBucket!: S3Cache;

  private githubClientConfig!: GithubClientConstructorNamedParameters;
  protected githubClient!: GithubClient;

  protected cmsBackend: CmsBackend;

  protected async init(
    event: APIGatewayEvent,
    context: Context,
    callback: ProxyCallback
  ): Promise<void> {
    return super.init(event, context, callback).then(async () => {
      Utilities.Functions.print_debug(`Event is: ${JSON.stringify(event)}`);
      Utilities.Functions.print_debug(`Context is: ${JSON.stringify(context)}`);

      this.s3CacheBucketConfig = {
        bucketName: getEnvVar("AWS_S3_BUCKET"),
        bucketRegion: getEnvVar("AWS_S3_REGION"),
      };
      this.s3CacheBucket = new S3Cache(this.s3CacheBucketConfig);

      const githubClient = await GithubClientSingletonFactory().getInstance();
      this.cmsBackend = new CmsBackend(githubClient, this.s3CacheBucket);

      // try {
      //   const githubClient = (
      //     await GithubClientSingletonFactory()
      //   ).getInstance();
      //   this.cmsBackend = new CmsBackend(githubClient, this.s3CacheBucket);
      // } catch {
      //   this.response.fail(
      //     new Errors.InternalServerError({
      //       Function: this.context.functionName,
      //       Name: this.context.logStreamName,
      //       Request: this.context.awsRequestId,
      //     })
      //   );
      // }
    });
  }

  public async getAuthorDetails(cookieStr: string): Promise<any> {
    Utilities.Functions.print_debug("getting user details");
    const re = new RegExp(
      ".*CognitoIdentityServiceProvider.*idToken=(?<token>.*?);"
    );
    const matches = cookieStr.match(re);
    if (matches?.groups?.token) {
      const { name, email }: any = jwt_decode(matches.groups.token);
      return { name, email };
    }
    throw Error("Id token not found");
  }
}
