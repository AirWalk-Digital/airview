import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { cmsBackendFactory, utils } from "../common";

export function postBranches() {
  const factory = cmsBackendFactory();
  async function handle(
    event: APIGatewayEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    const cmsBackend = await factory.getInstance();
    const body = JSON.parse(event.body);
    const baseSha = body.baseSha;
    const branchName = body.name;

    const isSuccess = await cmsBackend.createBranch(baseSha, branchName);
    utils.printDebug(`isSuccess: ${isSuccess}`);

    if (isSuccess) {
      return {
        statusCode: 201,
        body: null,
      };
    } else {
      return {
        statusCode: 422,
        body: null,
      };
    }
  }

  return { handle };
}
/*
export class postBranches extends CmsApiHandler {
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

*/
