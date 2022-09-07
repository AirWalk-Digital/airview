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
/*
export class postPulls extends CmsApiHandler {
  public async process(request: Request, response: Response): Promise<void> {
    let prResponse: any;
    const requestBody = request.getBodyAsJSON();
    try {
      prResponse = await this.cmsBackend.createPullRequest(requestBody);
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

    if (prResponse.value) {
      response
        .setBody(JSON.stringify(prResponse.value))
        .addHeader("content-type", "application/json")
        .send();
    } else if (prResponse.error === "conflict") {
      response.setStatusCode(422).send();
    } else {
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
