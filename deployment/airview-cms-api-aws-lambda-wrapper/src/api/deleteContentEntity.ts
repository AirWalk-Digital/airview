import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { getAuthorDetails, cmsBackendFactory, utils } from "../common";

export function deleteContentEntity() {
  const factory = cmsBackendFactory();
  async function handle(
    event: APIGatewayEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    const cmsBackend = await factory.getInstance();
    const branch: string = event.queryStringParameters["branch"];
    const baseSha: string = event.queryStringParameters["baseSha"];
    if (!branch || !baseSha) {
      return {
        statusCode: 400,
        body: "Bad Request. Missing query params",
      };
    }

    const entityId = `${event.pathParameters["collection"]}/${event.pathParameters["entity"]}`;
    utils.printDebug(`entityID == "${entityId}"`);

    const cookie = event.headers["cookie"];
    const author = getAuthorDetails(cookie);
    await cmsBackend.deleteEntity({
      id: entityId,
      branchName: branch,
      baseSha: baseSha,
      author,
    });

    return {
      statusCode: 204,
      body: null,
    };

    //
  }

  return { handle };
}
