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

// Function to list all S3 buckets
function listBuckets() {
  s3.listBuckets((err, data) => {
    if (err) console.log("Error", err);
    else console.log("Bucket List", data.Buckets);
  });
}

// Function to check if a specific bucket exists
function checkBucketExists(bucketName) {
  s3.headBucket({ Bucket: bucketName }, (err, data) => {
    if (err) console.log(`Bucket ${bucketName} does not exist or you do not have permission to access it.`, err);
    else console.log(`Bucket ${bucketName} exists.`, data);
  });
}

// Check that a file can be added to the bucket
async function uploadToS3(uploadParams) {
    try {
        const data = await s3Client.send(new PutObjectCommand(uploadParams));
        console.log("Successfully uploaded data to S3", data);
        
    } catch (err) {
        console.error("Error uploading data: ", err);
    }
}

file_to_upload = {
    Bucket: "qr-code-bucket",
    Key: "test.txt",
    Body: "Hello, World!"
}

// Run tests
listBuckets();
checkBucketExists("qr-code-bucket"); // Replace 'your-bucket-name' with the actual 
uploadToS3(file_to_upload);

// check that the file was uploaded and that the file name is returned and the contents of the file are correct
const listParams = {
    Bucket: "qr-code-bucket"
};

