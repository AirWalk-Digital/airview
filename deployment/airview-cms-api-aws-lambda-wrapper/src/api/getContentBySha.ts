import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { cmsBackendFactory, utils } from "../common";

export function getContentBySha() {
  const factory = cmsBackendFactory();
  async function handle(
    event: APIGatewayEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    const sha: string = event.pathParameters["sha"];
    utils.printDebug(`Query String: sha == "${sha}"`);

    const cmsBackend = await factory.getInstance();
    const data = await cmsBackend.getContent(sha);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }

  return { handle };
}
