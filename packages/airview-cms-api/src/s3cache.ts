import { CmsCache } from "interfaces";
import AWS from "aws-sdk";
AWS.config.update({ region: "eu-west-1" });
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

export class S3Cache implements CmsCache {
  async get(key: string): Promise<any> {
    try {
      const file = await s3
        .getObject({
          Bucket: "msc-demo-s3-bucket",
          Key: key,
        })
        .promise();
      if (file.Body === undefined) return undefined;

      const objectData = file.Body.toString("utf-8");
      return JSON.parse(objectData);
    } catch (err: any) {
      if (err.code === "NoSuchKey") {
        return undefined;
      }
      throw err;
    }
  }
  async set(key: string, value: any): Promise<void> {
    const params = {
      Body: JSON.stringify(value),
      Bucket: "msc-demo-s3-bucket",
      Key: key,
      ContentType: "application/json",
    };
    await s3.putObject(params).promise();
  }
}
