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
  }
}

resource "aws_s3_bucket" "qr-code-bucket" {
  bucket = "qr-code-bucket"
}