#!/bin/bash

# get docker up
docker compose up -d

# Wait for a specific container to become "healthy"
while [ "$(docker inspect -f {{.State.Health.Status}} local_qr_lambda)" != "healthy" ]; do
  echo "Waiting for container to become healthy..."
  sleep 1
done

echo "Container is healthy. Proceeding..."

# Save current directory
current_dir=$(pwd)

# Change to src directory
cd src

rm -rf function.zip

# Zip the lambda function with index.js at the root of the zip file
zip -r function.zip index.js

# Return to the original directory
cd "$current_dir"

cd terraform/local

terraform init

terraform apply -var-file="localstack.tfvars" -auto-approve


# # set up the local lambda
# awslocal lambda create-function \
#     --function-name localstack-lambda-url-example \
#     --runtime nodejs20.x \
#     --zip-file fileb://src/function.zip \
#     --handler index.handler \
#     --role arn:aws:iam::000000000000:role/lambda-role \
#     > /dev/null

# get a URL for the lambda and pipe output to jq
awslocal lambda create-function-url-config \
    --function-name qr-code-lambda \
    --auth-type NONE \
    | jq -r .FunctionUrl \
    | pbcopy \
    > /dev/null

# set up s3 bucket
awslocal s3api create-bucket --bucket hydra-qr-code-lambda

echo "URL for lambda has been copied to the clipboard."

