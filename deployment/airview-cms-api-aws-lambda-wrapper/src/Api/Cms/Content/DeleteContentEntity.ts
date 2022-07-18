import { CmsApiHandler } from "../../../Handler/CmsApiHandler.js";
import { Errors, Request, Response } from "ts-lambda-handler";

export class DeleteContentEntity extends CmsApiHandler {
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
      await this.cmsBackend.deleteEntity({
        id: entityId,
        branchName: branch,
        baseSha: baseSha,
        author: { name: "User", email: "user@noreply.com" },
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
