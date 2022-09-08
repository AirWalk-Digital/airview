import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { cmsBackendFactory, utils } from "../common";

export function postPulls() {
  const factory = cmsBackendFactory();
  async function handle(
    event: APIGatewayEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    const cmsBackend = await factory.getInstance();
    const requestBody = JSON.parse(event.body);
    const prResponse = await cmsBackend.createPullRequest(requestBody);
    if (prResponse.value) {
      return {
        statusCode: 200,
        body: JSON.stringify(prResponse.value),
      };
    }
    if (prResponse.error === "conflict") {
      return {
        statusCode: 422,
        body: "Conflict. Check PR does not exist already",
      };
    }
    //
  }

  return { handle };
}
