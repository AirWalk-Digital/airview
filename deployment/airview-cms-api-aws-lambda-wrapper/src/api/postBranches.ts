import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { cmsBackendFactory, utils } from "../common";

export function postBranches() {
  const factory = cmsBackendFactory();
  async function handle(
    event: APIGatewayEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    const cmsBackend = await factory.getInstance();
    const body = JSON.parse(event.body);
    const baseSha = body.baseSha;
    const branchName = body.name;

    const isSuccess = await cmsBackend.createBranch(baseSha, branchName);
    utils.printDebug(`isSuccess: ${isSuccess}`);

    if (isSuccess) {
      return {
        statusCode: 201,
        body: null,
      };
    } else {
      return {
        statusCode: 422,
        body: null,
      };
    }
  }

  return { handle };
}
