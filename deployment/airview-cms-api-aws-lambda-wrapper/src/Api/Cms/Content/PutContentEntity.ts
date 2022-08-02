import { CmsApiHandler } from "../../../Handler/CmsApiHandler.js";
import { Errors, Request, Response, Utilities } from "ts-lambda-handler";

export class PutContentEntity extends CmsApiHandler {
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
      const author = await this.getAuthorDetails(cookie);
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
