import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { cmsBackendFactory, utils } from "../common";

export function getBranches() {
  const factory = cmsBackendFactory();
  async function handle(
    event: APIGatewayEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    const cmsBackend = await factory.getInstance();
    const data = await cmsBackend.getBranches();
    utils.printDebug(`Data: ${data}`);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }

  return { handle };
}
