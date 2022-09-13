import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { cmsBackendFactory, utils } from "../common";

export function getContentBySha() {
  const factory = cmsBackendFactory();
  async function handle(
    event: APIGatewayEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    const path: string = event.queryStringParameters["path"];
    const sha: string = event.pathParameters["sha"];
    utils.printDebug(`Query String: path == "${path}"`);
    utils.printDebug(`Query String: sha == "${sha}"`);

    const cmsBackend = await factory.getInstance();
    const data = await cmsBackend.getTreeContent(sha, path);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }

  return { handle };
}
