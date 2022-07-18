import { CmsApiHandler } from "../../../Handler/CmsApiHandler.js";
import { Errors, Request, Response, Utilities } from "ts-lambda-handler";

export class GetBranches extends CmsApiHandler {
  public async process(request: Request, response: Response): Promise<void> {
    let data: any;
    try {
      data = await this.cmsBackend.getBranches();
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
