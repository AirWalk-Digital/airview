import { CmsApiHandler } from "../../../Handler/CmsApiHandler.js";
import { Errors, Request, Response, Utilities } from "ts-lambda-handler";

export class GetSearchBySha extends CmsApiHandler {
  public async process(request: Request, response: Response): Promise<void> {
    let query: string = request.getQueryStringParameter("query", undefined);

    if (query == undefined) {
      this.response.fail(new Errors.BadRequestError());
      return Promise.resolve();
    }

    let data: any;
    try {
      data = await this.cmsBackend.searchContent(
        request.getPathParameter("sha"),
        query
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
