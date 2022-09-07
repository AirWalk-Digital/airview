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

/*
export class getContentBySha extends CmsApiHandler {
  public async process(request: Request, response: Response): Promise<void> {
    let data: any;
    try {
      const path: string = request.getQueryStringParameter("path", "");
      Utilities.Functions.print_debug(`Query String: path == "${path}"`);

      if (path === "") {
        console.error("Missing path query string parameters!");
        this.response.fail(new Errors.BadRequestError());
        return Promise.resolve();
      }
      data = await this.cmsBackend.getTreeContent(
        request.getPathParameter("sha"),
        path
      );
      Utilities.Functions.print_debug(`Data: ${data}`);
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

    response
      .setBody(JSON.stringify(data))
      .addHeader("content-type", "application/json")
      .send();
    return Promise.resolve();
  }
}
*/
