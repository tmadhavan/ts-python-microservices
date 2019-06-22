import { Injectable, Req, Res } from '@nestjs/common';
import * as aws from 'aws-sdk';
import { StorageProvider } from '../storage.interface';
import { Readable } from 'stream';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';

/**
 * This class provides cloud storage functionality using AWS S3.
 * It requires environment variables to have been set, defining
 * configuration for S3 (bucket name, access key, secret key)
 */
@Injectable()
export class S3StorageProvider implements StorageProvider {
  
  // TODO Inject this config, or at least create it somewhere else
  //      Could be a ConfigService maybe

  private readonly client: aws.S3;

  constructor(private readonly bucketName = process.env.AWS_BUCKET_NAME) {
    // set up S3 config

    // get this from secret config/env vars
    aws.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    });

    this.client = new aws.S3();
    console.log(`Using bucket ${this.bucketName}`);
  }

  uploadFile(file: Readable): Promise<string> {

    const fileKey = `${uuid()}.pdf`;

    // Stream the file data to S3
    const uploadConfig = {
      Key: fileKey,
      Bucket: this.bucketName,
      Body: file,
    };

    return new Promise( (resolve, reject) => {
      this.client.upload(uploadConfig, (err, data) => {
        if (err) {
          reject(`Error uploading to S3: ${err}`);
        } else {
          resolve(fileKey);
        }
      });
    });
  }
}
