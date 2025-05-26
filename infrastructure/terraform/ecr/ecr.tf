terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

resource "aws_ecrpublic_repository" "animals-frontend" {
  provider = aws.us_east_1
  repository_name = "animals-frontend"
}

resource "aws_ecrpublic_repository" "animals-backend" {
  provider = aws.us_east_1
  repository_name = "animals-backend"
}

output "animals-frontend_url" {
  value = aws_ecrpublic_repository.animals-frontend.repository_uri
}

output "animals-backend_url" {
  value = aws_ecrpublic_repository.animals-backend.repository_uri
}