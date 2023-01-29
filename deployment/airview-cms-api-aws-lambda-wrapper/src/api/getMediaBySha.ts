import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { cmsBackendFactory, utils } from "../common";
import FileType from "file-type";
//const FileType = require('file-type/browser');

export function getMediaBySha() {
  const factory = cmsBackendFactory();
  async function handle(
    event: APIGatewayEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    const sha: string = event.pathParameters["sha"];
    utils.printDebug(`Query String: sha == "${sha}"`);

    const cmsBackend = await factory.getInstance();
    const data = await cmsBackend.getContent(sha);
    const buffer = Buffer.from(data.content, "base64");
    const contentType = await FileType.fromBuffer(buffer);
    return {
      statusCode: 200,
      body: data.content,
      isBase64Encoded: true,
      headers: { "content-type": contentType?.mime || "text/plain" },
    };
  }

  return { handle };
}
