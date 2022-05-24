import { CmsCache } from "interfaces";
import AWS from "aws-sdk";
AWS.config.update({ region: "eu-west-1" });
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

export class S3Cache implements CmsCache {
  get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      s3.getObject(
        {
          Bucket: "msc-demo-s3-bucket",
          Key: key,
        },
        function (err, data: any) {
          if (err) {
            if (err.code === "NoSuchKey") {
              resolve(undefined);
            } else {
              reject(err);
            }
          } else {
            let objectData = data.Body.toString("utf-8");
            resolve(JSON.parse(objectData));
          }
        }
      );
    });
  }
  set(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const params = {
        Body: JSON.stringify(value),
        Bucket: "msc-demo-s3-bucket",
        Key: key,
        ContentType: "application/json",
      };
      s3.putObject(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
