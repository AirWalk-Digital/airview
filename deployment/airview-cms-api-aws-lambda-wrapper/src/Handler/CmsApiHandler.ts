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

      let githubPemSecret: string = await this.getGithubSecretPemValue();
      this.githubClientConfig = {
        applicationId: getEnvVar("GITHUB_APP_ID"),
        installationId: getEnvVar("GITHUB_INSTALL_ID"),
        privateKey: githubPemSecret,
        repositoryName: getEnvVar("GITHUB_REPO_NAME"),
        organisation: getEnvVar("GITHUB_ORG_NAME"),
        githubApiBaseUri: getEnvVar("GITHUB_API_BASE"),
      };

      this.githubClient = new GithubClient(this.githubClientConfig);
      this.cmsBackend = new CmsBackend(this.githubClient, this.s3CacheBucket);
    });
  }

  public async getAuthorDetails(cookieStr: string): Promise<any> {
    Utilities.Functions.print_debug("getting user details");
    const jwt = this._getIdTokenFromCookieString(cookieStr);
    const { name, email }: any = jwt_decode(jwt);
    return { name, email };
  }
  private _getIdTokenFromCookieString(cookieStr: string): string {
    const regex = new RegExp(`CognitoIdentityServiceProvider(.*?)idToken`);
    const cookies = cookieStr.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const [a, b] = cookies[i].split("=");
      const matches = a.match(regex);
      if (matches) {
        return b;
      }
    }

    throw Error("Id token not found");
  }

  private async getGithubSecretPemValue(): Promise<string> {
    const secretId: string = getEnvVar("GITHUB_PEM_SECRET_ID");
    const secretManager: SecretsManager = new SecretsManager();
    let data: any;
    let secret: string;

    try {
      data = await secretManager
        .getSecretValue({ SecretId: secretId })
        .promise();
    } catch (error) {
      console.error(error);
      this.response.fail(
        new Errors.InternalServerError({
          Function: this.context.functionName,
          Name: this.context.logStreamName,
          Request: this.context.awsRequestId,
        })
      );
    }

    Utilities.Functions.print_debug(`Secret Data: ${JSON.stringify(data)}`);

    if ("SecretString" in data) {
      secret = data.SecretString;
    } else {
      console.error("SecretString not in AWS Secrets manager response!");
      this.response.fail(
        new Errors.InternalServerError({
          Function: this.context.functionName,
          Name: this.context.logStreamName,
          Request: this.context.awsRequestId,
        })
      );
    }

    return Promise.resolve(secret);
  }
}
