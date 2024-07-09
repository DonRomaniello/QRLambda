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

const Bucket = "qr-code";

// test writing to s3

const listParams = {
    Bucket
};

const posterId = Math.floor(Math.random() * 100);

const timestamp = new Date().getTime();

const bodyObject = {
    timestamp,
    posterId,
    browser: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    ip: "192.168.20.192",
}
    
const uploadParams = {
    Bucket,
    Key: timestamp.toString() + "_" + posterId.toString() + ".txt",
    Body: Object.values(bodyObject).map(item => item.toString()).join(",")
};

async function uploadToS3(yourParams) {
    try {
        const data = await s3Client.send(new PutObjectCommand(yourParams));
        console.log("Successfully uploaded data to S3", data);
        
    } catch (err) {
        console.error("Error uploading data: ", err);
    }
}

uploadToS3(uploadParams).then(() => {
    // return data by fetching the name of the file uploaded from s3

    const listCommand = new ListObjectsCommand(listParams);
    
    s3Client.send(listCommand).then((data) => {
        console.log(data.Contents.map(item => item.Key));
    })
})

const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { createWriteStream } = require("fs");
const { pipeline } = require("stream/promises");

async function downloadObject(bucketName, key, downloadPath) {
    const getObjectParams = {
        Bucket: bucketName,
        Key: key,
    };
    try {
        const data = await s3Client.send(new GetObjectCommand(getObjectParams));
        await pipeline(data.Body, createWriteStream(downloadPath));
        console.log(`Successfully downloaded ${key} to ${downloadPath}`);
    } catch (err) {
        console.error("Error downloading object: ", err);
    }
}

// Assuming listParams is defined and includes the Bucket name
s3Client.send(new ListObjectsCommand(listParams)).then(async (data) => {
    for (const item of data.Contents) {
        const downloadPath = `./s3_test_downloads/${item.Key}`; // Define your download path
        await downloadObject(listParams.Bucket, item.Key, downloadPath);
    }
});



// exports.handler = async (event) => {
    
//     const { queryStringParameters } = event;
//     const timestamp = new Date().getTime();
//     const Key = `${queryStringParameters?.pi}_${timestamp}.txt`;
    
//     const BodyObject = {
//         timestamp: timestamp,
//         posterId: queryStringParameters?.pi,
//         browser: event?.headers["User-Agent"],
//         ip: event?.requestContext.identity.sourceIp,
//     }

//     // const uploadParams = {
//     //     Bucket,
//     //     Key,
//     //     Body
//     // };

//     console.log(BodyObject)

//     const response = {
//         statusCode: 302,
//         headers: {
//             Location: "https://www.google.com"
//         }
//     };
//     return response;

// const uploadCommand = new PutObjectCommand(uploadParams);

// try {
//     const result = await s3Client.send(uploadCommand);
//     console.log(result);
// } catch (error) {
//     console.log(error);
// } finally {
//     console.log("done");
// }


