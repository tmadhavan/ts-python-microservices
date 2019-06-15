import { Injectable, Req, Res } from '@nestjs/common';
import * as aws from 'aws-sdk';
import { StorageProvider } from '../storage.interface';

@Injectable()
export class S3StorageProvider implements StorageProvider {

  readonly s3client: aws.S3;

  // TODO inject this config, or at least create it somewhere else 
  readonly s3Bucket = process.env.AWS_BUCKET_NAME;

  constructor() {
    // set up S3 config
    
    // get this from secret config/env vars 
    aws.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    });
    
    this.s3client = new aws.S3();
    
    console.log(`Using bucket ${this.s3Bucket}`);
  }

  uploadFile(file: any) {
    console.log('uploading some stuff to S3...');
    this.listBucketObjects();
  }

  private listBucketObjects() {
    console.log('Listing bucket objects...'); 
    this.s3client.listObjects({
      Bucket: this.s3Bucket
    }, (err, data) => {
      if (err) {
        console.error('error');
      } else {
        console.log(data)
      }
    })
  }
}
