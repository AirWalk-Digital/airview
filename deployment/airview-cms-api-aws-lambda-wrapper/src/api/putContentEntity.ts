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
    utils.printDebug(`body == "${body}"`);

    const cookie = this.event.headers["cookie"];
    const author = await getAuthorDetails(cookie);
    await cmsBackend.setContent({
      id: entityId,
      branchName: branch,
      baseSha: baseSha,
      content: body,
      author,
    });

    return {
      statusCode: 201,
      body: "Accepted",
    };
  }

  return { handle };
}

/*

export class putContentEntity extends CmsApiHandler {
  public async process(request: Request, response: Response): Promise<void> {
    const branch: string = request.getQueryStringParameter("branch", undefined);
    Utilities.Functions.print_debug(`Query String: branch == "${branch}"`);

    const baseSha: string = request.getQueryStringParameter(
      "baseSha",
      undefined
    );
    Utilities.Functions.print_debug(`Query String: baseSha == "${baseSha}"`);

    if (branch === "" || baseSha === "") {
      console.error("Missing query string parameters!");
      this.response.fail(new Errors.BadRequestError());
      return Promise.resolve();
    }

    const entityId = `${request.getPathParameter(
      "collection"
    )}/${request.getPathParameter("entity")}`;
    Utilities.Functions.print_debug(`entityID == "${entityId}"`);

    const body = request.getParseBody();
    Utilities.Functions.print_debug(`body == "${body}"`);

    try {
      const cookie = request.getHeader("cookie");
t     const author = await this.getAuthorDetails(cookie);
      await this.cmsBackend.setContent({
        id: entityId,
        branchName: branch,
        baseSha: baseSha,
        content: request.getParseBody(),
        author,
      });
      response.setStatusCode(201).send();
    } catch (error) {
      console.log(error);
      this.response.fail(
        new Errors.InternalServerError({
          Function: this.context.functionName,
          Name: this.context.logStreamName,
          Request: this.context.awsRequestId,
        })
      );
    }

    return Promise.resolve();
  }
 
}
*/
