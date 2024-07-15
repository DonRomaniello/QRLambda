const { 
    S3Client,
    PutObjectCommand,
 } = require("@aws-sdk/client-s3");

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

// instead of making a few different lambdas for each redirect,
// use a dictionary of base urls
const redirect_urls = {
    "ps" : "prometheusstudios.org",
    "tc" : "producedbythecore.com",
    "eb" : "eventbrite.com"
}

// create the url
const urlCreator = (domain = "ps", subdomain = null, path = null) => {
    let url = "https://"
    subdomain ? url = url + subdomain + "." : null;
    url = url + redirect_urls[domain];
    path ? url = url + "/" + path : null;
    return url
}

exports.handler = async (event) => {
    const queryParameters = {
        pi: event.queryStringParameters?.pi,
        domain: event.queryStringParameters?.d,
        subdomain: event.queryStringParameters?.sd,
        p: event.queryStringParameters?.p,
    }
    
    const Location = urlCreator(queryParameters?.domain, queryParameters?.subdomain, queryParameters?.p)

    const response = {
        statusCode: 302,
        headers: {
            Location
        }
    };

    try {
        const bodyObject = {
            posterId : Number(queryParameters?.pi),
            requestHumanTime: event.requestContext?.time,
            lambdaTimestamp : new Date().getTime(),
            requestTimestamp: event.requestContext?.timeEpoch,
            Location,
            browser: event.requestContext.http?.userAgent,
            ip: event.requestContext.http?.sourceIp,
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