terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_instance" "web" {
  ami             = var.aws_ami
  instance_type   = var.aws_instance_type
  security_groups = [aws_security_group.instances.name]
  key_name        = var.aws_keypair_name
}

resource "aws_key_pair" "deployer" {
  key_name   = var.aws_keypair_name
  public_key = var.aws_keypair_public_key
}

resource "aws_eip" "lb" {
  instance = aws_instance.web.id
  vpc      = true
}

resource "aws_security_group" "instances" {
  name = "instance-security-group"
}

resource "aws_security_group_rule" "allow_https_inbound" {
  type              = "ingress"
  security_group_id = aws_security_group.instances.id

  from_port   = 443
  to_port     = 443
  protocol    = "tcp"
  cidr_blocks = var.cf_ipv4_list
  ipv6_cidr_blocks = var.cf_ipv6_list
}

resource "aws_security_group_rule" "allow_ssh" {
  type              = "ingress"
  security_group_id = aws_security_group.instances.id

  from_port   = 22
  to_port     = 22
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "allow_all" {
  type              = "egress"
  security_group_id = aws_security_group.instances.id

  from_port   = 0
  to_port     = 0
  protocol    = "-1"
  cidr_blocks = ["0.0.0.0/0"]
}
