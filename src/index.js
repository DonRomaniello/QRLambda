// import { 
//     S3Client,
//     PutObjectCommand,
//  } from "@aws-sdk/client-s3";

// const s3Client = new S3Client({
//   endpoint: "http://localhost:4566", // LocalStack endpoint
//   region: "us-east-1", // Default LocalStack region
//   credentials: {
//     accessKeyId: "test", // Default LocalStack access key
//     secretAccessKey: "test" // Default LocalStack secret key
//   },
//   forcePathStyle: true, // Required for LocalStack
// });

// const Bucket = "qr-code";

exports.handler = async (event) => {

    
    const { queryStringParameters } = event;
    const timestamp = new Date().getTime();
    const Key = `${queryStringParameters?.pi}_${timestamp}.txt`;
    
    const BodyObject = {
        timestamp: timestamp,
        posterId: queryStringParameters?.pi,
        browser: event?.headers["User-Agent"],
        ip: event?.requestContext.identity.sourceIp,
    }

    // const uploadParams = {
    //     Bucket,
    //     Key,
    //     Body
    // };

    console.log(BodyObject)

    const response = {
        statusCode: 302,
        headers: {
            Location: "https://www.google.com"
        }
    };
    return response;

// const uploadCommand = new PutObjectCommand(uploadParams);

// try {
//     const result = await s3Client.send(uploadCommand);
//     console.log(result);
// } catch (error) {
//     console.log(error);
// } finally {
//     console.log("done");
// }


};

//  test connection
// const command = new ListBucketsCommand({});

// const buckets = await s3Client.send(command).then((data) => {
//     console.log(data);
// }).catch((error) => {
//     console.log(error);
// });

// test writing to s3


// const listParams = {
//     Bucket
// };

// const listCommand = new ListObjectsV2Command(listParams);

// try {
//     const listResult = await s3Client.send(listCommand);
//     console.log("Contents of the bucket:", listResult.Contents);
// } catch (error) {
//     console.error("Error listing bucket contents:", error);
// }

// const fileKey = "1720468939824.txt"
// const getParams = {
//     Bucket,
//     Key: fileKey
// };

// const getCommand = new GetObjectCommand(getParams);

// try {
//     const { Body } = await s3Client.send(getCommand);
//     const stream = Body.pipe(createWriteStream(fileKey));
//     stream.on('finish', () => {
//         console.log("File downloaded successfully.");
//     });
// } catch (error) {
//     console.error("Error downloading file:", error);
// }