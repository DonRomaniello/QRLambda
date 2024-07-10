variable "aws_access_key" {
  description = "AWS Access Key"
  type        = string
  default     = "mock_access_key"
}

variable "aws_secret_key" {
  description = "AWS Secret Key"
  type        = string
  default     = "mock_secret_key"
}

variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "us-east-1"
}

variable "endpoint" {
  description = "AWS Service Endpoint"
  type        = string
  default     = "http://localhost:4566"
}

variable "skip_credentials_validation" {
  description = "Only skip if running locally."
  type = bool
  default = false
}

variable "skip_metadata_api_check" {
  type = bool
  default = false
}

variable "skip_requesting_account_id" {
  type = bool
  default = false
}
