import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { cmsBackendFactory, utils } from "../common";

export function getMediaBySha() {
  const factory = cmsBackendFactory();
  async function handle(
    event: APIGatewayEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    let data: any;
    const path: string = event.queryStringParameters["path"];
    const sha: string = event.pathParameters["sha"];
    utils.printDebug(`Query String: path == "${path}"`);
    utils.printDebug(`Query String: sha == "${sha}"`);

    const cmsBackend = await factory.getInstance();
    data = await cmsBackend.getTreeContent(sha, path);
    return {
      statusCode: 200,
      body: data.content,
      isBase64Encoded: true,
    };
  }

  return { handle };
}
