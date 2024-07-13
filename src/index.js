const { 
    S3Client,
    PutObjectCommand,
 } = require("@aws-sdk/client-s3");

let allErrors = [];

const s3Client = new S3Client({});

const Bucket = "hydra-qr-code-lambda";

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
    const response = {
        statusCode: 302,
        headers: {
            Location: "https://example.com"
        }
        
    };

    try {
        const bodyObject = {
            lambdaTimestamp : new Date().getTime(),
            posterId : Number(event.queryStringParameters?.pi),
            browser: event.requestContext.http?.userAgent,
            ip: event.requestContext.http?.sourceIp,
            requestHumanTime: event.requestContext?.time,
            requestTimestamp: event.requestContext?.timeEpoch,
        }

        const uploadParams = {
            Bucket,
            Key: bodyObject.lambdaTimestamp.toString() + "_" + bodyObject.posterId.toString() + ".txt",
            Body: Object.values(bodyObject).map(item => item ? item.toString() : " ").join(","),
            // Body: "Test connections only!",
        };

        //  for now, wait to respond until after the file is uploaded
        await uploadToS3(uploadParams)
    } catch (error) {
        console.log(error);
        return response
    };
    return response;
};