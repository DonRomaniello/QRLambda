import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  endpoint: "http://localhost:4566", // LocalStack endpoint
  region: "us-east-1", // Default LocalStack region
  credentials: {
    accessKeyId: "test", // Default LocalStack access key
    secretAccessKey: "test" // Default LocalStack secret key
  },
  forcePathStyle: true, // Required for LocalStack
});

exports.handler = async (event) => {
    try {
        const command = new ListBucketsCommand({});
        const buckets = await s3Client.send(command);

        const response = {
            statusCode: 200,
            body: JSON.stringify({ buckets: buckets.Buckets }),
        };

        return response;
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: "An error occurred"
        };
    }
};