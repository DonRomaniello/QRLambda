const { 
    S3Client,
    PutObjectCommand,
    ListObjectsCommand
 } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
    endpoint: "http://localhost:4566", // LocalStack endpoint
    region: "us-east-1", // Default LocalStack region
    credentials: {
        accessKeyId: "test", // Default LocalStack access key
        secretAccessKey: "test" // Default LocalStack secret key
    },
    forcePathStyle: true, // Required for LocalStack
});

const Bucket = "qr-code-bucket";

async function uploadToS3(yourParams) {
    try {
        const data = await s3Client.send(new PutObjectCommand(yourParams));
        console.log("Successfully uploaded data to S3", data);
        return data;
        
    } catch (err) {
        console.error("Error uploading data: ", err);
        return err;
    }
}

exports.handler = async (event) => {
    try {

        const bodyObject = {
            lambdaTimestamp : new Date().getTime(),
            posterId : Number(event.queryStringParameters.pi),
            browser: event.requestContext.http?.userAgent,
            ip: event.requestContext.http?.sourceIp,
            requestHumanTime: event.requestContext?.time,
            requestTimestamp: event.requestContext?.timeEpoch,
            secretMessage: "This is a secret message!"
        }

        const uploadParams = {
            Bucket,
            Key: bodyObject.lambdaTimestamp.toString() + "_" + bodyObject.posterId.toString() + ".txt",
            Body: Object.values(bodyObject).map(item => item.toString()).join(",")
        };

        //  for now, wait to respond until after the file is uploaded
        const info = await uploadToS3(uploadParams)
        
        const response = {
            statusCode: 200,
            body: JSON.stringify(info),
        };

        return response;
    }

    catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: "An error occurred"
        };
    }

};