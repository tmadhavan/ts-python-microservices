import os
import boto3

# TODO use a factory method for uploading to different providers
#      see: https://realpython.com/factory-method-python/

ACCESS_KEY = os.environ['AWS_ACCESS_KEY']
SECRET_KEY = os.environ['AWS_SECRET_KEY']
BUCKET_NAME = os.environ['AWS_BUCKET_NAME']

s3 = boto3.resource('s3')




