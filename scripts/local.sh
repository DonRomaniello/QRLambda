#!/bin/bash

# get docker up
docker-compose up -d

# Wait for a specific container to become "healthy"
while [ "$(docker inspect -f {{.State.Health.Status}} local_qr_lambda)" != "healthy" ]; do
  echo "Waiting for container to become healthy..."
  sleep 1
done

echo "Container is healthy. Proceeding..."


# zip the lambda function
zip -r src/function.zip src/index.js

# set up the local lambda
awslocal lambda create-function \
    --function-name localstack-lambda-url-example \
    --runtime nodejs18.x \
    --zip-file fileb://src/function.zip \
    --handler index.handler \
    --role arn:aws:iam::000000000000:role/lambda-role \
    > /dev/null

# get a URL for the lambda and pipe output to jq
awslocal lambda create-function-url-config \
    --function-name localstack-lambda-url-example \
    --auth-type NONE \
    | jq -r .FunctionUrl \
    | pbcopy \
    > /dev/null

echo "URL for lambda has been copied to the clipboard."

