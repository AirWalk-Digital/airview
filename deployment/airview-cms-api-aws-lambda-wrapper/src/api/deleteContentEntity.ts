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

    const cookie = this.event.headers["cookie"];
    const author = await getAuthorDetails(cookie);
    await this.cmsBackend.deleteEntity({
      id: entityId,
      branchName: branch,
      baseSha: baseSha,
      author,
    });

    return {
      statusCode: 204,
      body: "No Content",
    };

    //
  }

  return { handle };
}
/*
export class deleteContentEntity extends CmsApiHandler {
  public async process(request: Request, response: Response): Promise<void> {
    let branch: string = request.getQueryStringParameter("branch", undefined);
    let baseSha: string = request.getQueryStringParameter("baseSha", undefined);

    if (branch == undefined || baseSha == undefined) {
      this.response.fail(new Errors.BadRequestError());
      return Promise.resolve();
    }

    try {
      let entityId = `${request.getPathParameter(
        "collection"
      )}/${request.getPathParameter("entity")}`;

      const cookie = request.getHeader("cookie");
      const author = await this.getAuthorDetails(cookie);
      await this.cmsBackend.deleteEntity({
        id: entityId,
        branchName: branch,
        baseSha: baseSha,
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
