import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { cmsBackendFactory, utils } from "../common";

export function getExternalContentByRepoOwner() {
  const factory = cmsBackendFactory();
  async function handle(
    event: APIGatewayEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    const repo: string = event.pathParameters["repo"];
    const owner: string = event.pathParameters["owner"];
    const path: string = event.queryStringParameters["path"];
    utils.printDebug(`Path String: repo == "${repo}"`);
    utils.printDebug(`Path String: owner == "${owner}"`);
    utils.printDebug(`Query String: path == "${path}"`);

    if (typeof path !== "string") {
      return {
        statusCode: 400,
        body: "'path' query string parameter missing",
      };
    }

    const cmsBackend = await factory.getInstance();

    try {
      const data = await cmsBackend.getExternalData(repo, owner, path);

      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (err) {
      return {
        statusCode: 404,
        body: null,
      };
    }
  }

  return { handle };
}
