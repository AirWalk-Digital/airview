import { CmsApiHandler } from "../../../Handler/CmsApiHandler.js";
import { Errors, Request, Response, Utilities } from "ts-lambda-handler";

export class PostBranches extends CmsApiHandler {
  public async process(request: Request, response: Response): Promise<void> {
    try {
      const body = request.getBodyAsJSON();
      const baseSha = body.baseSha;
      const branchName = body.name;

      const isSuccess = await this.cmsBackend.createBranch(baseSha, branchName);
      Utilities.Functions.print_debug(`isSuccess: ${isSuccess}`);

      if (isSuccess) {
        response.setStatusCode(201).setBody(null).send();
      } else {
        response.setStatusCode(422).setBody(null).send();
      }
    } catch (error) {
      console.error(error);
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
