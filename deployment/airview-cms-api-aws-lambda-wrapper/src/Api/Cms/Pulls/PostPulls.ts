import { CmsApiHandler } from "../../../Handler/CmsApiHandler.js";
import { Errors, Request, Response, Utilities } from "ts-lambda-handler";

export class PostPulls extends CmsApiHandler {
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
