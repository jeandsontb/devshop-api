import { Injectable } from '@nestjs/common';
import * as aws from 'aws-sdk';

interface IUploadDTO {
  stream: NodeJS.ReadStream;
  bucket: string;
  destinationFileName: string;
  mimetype: string;
}

@Injectable()
export class S3 {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    aws.config.update({
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'AKIAYXQN2LNFQIJZKCPT',
        secretAccessKey: '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',
      },
    });
  }

  async upload({
    stream,
    mimetype,
    bucket,
    destinationFileName,
  }: IUploadDTO): Promise<string> {
    const s3 = new aws.S3();
    const s3Params = {
      Bucket: bucket,
      Body: stream,
      ContentType: mimetype,
      ACL: 'public-read',
      Key: destinationFileName,
    };

    const { Location } = await s3.upload(s3Params).promise();

    return Location;
  }
}
