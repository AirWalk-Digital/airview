import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { cmsBackendFactory, utils } from "../common";

export function getEntryBySha() {
  const factory = cmsBackendFactory();
  async function handle(
    event: APIGatewayEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    const sha: string = event.pathParameters["sha"];
    utils.printDebug(`Query String: sha == "${sha}"`);

    const cmsBackend = await factory.getInstance();
    const data = await cmsBackend.getEntries(sha);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }

  return { handle };
}

/*
export class getEntryBySha extends CmsApiHandler {
  public async process(request: Request, response: Response): Promise<void> {
    let data: any;
    try {
      data = await this.cmsBackend.getEntries(request.getPathParameter("sha"));
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
