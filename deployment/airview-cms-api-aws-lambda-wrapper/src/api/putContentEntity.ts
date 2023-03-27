import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { cmsBackendFactory, utils, getAuthorDetails } from "../common";

export function putContentEntity() {
  const factory = cmsBackendFactory();
  async function handle(
    event: APIGatewayEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    const cmsBackend = await factory.getInstance();
    const branch: string = event.queryStringParameters["branch"] || "";
    const baseSha: string = event.queryStringParameters["baseSha"] || "";

    if (branch === "" || baseSha === "") {
      console.error("Missing query string parameters!");

      return {
        statusCode: 400,
        body: "Bad Request. Missing query params",
      };
    }

    const entityId = `${event.pathParameters["collection"]}/${event.pathParameters["entity"]}`;
    utils.printDebug(`entityID == "${entityId}"`);

    const body = JSON.parse(event.body);
    utils.printDebug(`body == "${event.body}"`);

    const cookie = event.headers["Cookie"];
    const author = getAuthorDetails(cookie);
    try {
      await cmsBackend.setContent({
        id: entityId,
        branchName: branch,
        baseSha: baseSha,
        content: body,
        author,
      });
    } catch (err) {
      return {
        statusCode: 400,
        body: "Failed to persist content. Please check branch protection policies and that the branch has not been committed to since begining edits.",
      };
    }

    return {
      statusCode: 201,
      body: null,
    };
  }

  return { handle };
}
