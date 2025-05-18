terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "eu-north-1"
}

resource "aws_ecr_repository" "animals-frontend" {
  name         = "animals-frontend"
  force_delete = true
  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "animals-backend" {
  name         = "animals-backend"
  force_delete = true
  image_scanning_configuration {
    scan_on_push = true
  }
}

output "animals-frontend_url" {
  value = aws_ecr_repository.animals-frontend.repository_url
}

output "animals-backend_url" {
  value = aws_ecr_repository.animals-backend.repository_url
}