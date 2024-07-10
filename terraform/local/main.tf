provider "aws" {

  access_key                  = var.aws_access_key
  secret_key                  = var.aws_secret_key
  region                      = var.aws_region

  s3_use_path_style           = true
  skip_credentials_validation = var.skip_credentials_validation
  skip_metadata_api_check     = var.skip_metadata_api_check
  skip_requesting_account_id  = var.skip_requesting_account_id

  endpoints {
    s3             = var.endpoint
    lambda         = var.endpoint
  }
}

# add an s3 bucket
resource "aws_s3_bucket" "qr-code-bucket" {
  bucket = "qr-code-bucket"
}

# add a lambda function
resource "aws_lambda_function" "qr-code-lambda" {
  function_name = "qr-code-lambda"
  filename      = var.path_to_lambda_zip
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  role          = "arn:aws:iam::000000000000:role/lambda-role"
}
