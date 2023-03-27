import { CmsCache } from "./interfaces";
import AWS from "aws-sdk";
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

export interface S3CacheConstructorNamedParameters {
  bucketRegion: string;
  bucketName: string;
}

export class S3Cache implements CmsCache {
  private readonly _bucketName: string;

  constructor(private params: S3CacheConstructorNamedParameters) {
    this._bucketName = params.bucketName;
    AWS.config.update({
      region: params.bucketRegion,
    });
  }

  async get(key: string): Promise<any> {
    try {
      const file = await s3
        .getObject({
          Bucket: this._bucketName,
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
      Bucket: this._bucketName,
      Key: key,
      ContentType: "application/json",
    };
    await s3.putObject(params).promise();
  }
}
