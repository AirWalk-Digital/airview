import { CmsApiHandler } from "../../../Handler/CmsApiHandler.js";
import { Errors, Request, Response, Utilities } from "ts-lambda-handler";

export class GetContentBySha extends CmsApiHandler {
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
