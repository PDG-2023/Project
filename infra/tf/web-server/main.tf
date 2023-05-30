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

resource "aws_sns_topic" "monitoring" {
  name = "pdg-monitoring"
}

resource "aws_cloudwatch_metric_alarm" "status_check_failed" {
  alarm_name                = "pdg-web-server-status-check-failed"
  comparison_operator       = "GreaterThanOrEqualToThreshold"
  evaluation_periods        = 2
  metric_name               = "StatusCheckFailed"
  namespace                 = "AWS/EC2"
  period                    = 120
  statistic                 = "Average"
  threshold                 = 0.99
  alarm_description         = "This metric monitors status checks"
  dimensions = {
    InstanceId = aws_instance.web.id
  }
  alarm_actions = [
    aws_sns_topic.monitoring.arn
  ]
  insufficient_data_actions = []
}

resource "aws_sns_topic_subscription" "email_notification" {
  topic_arn = aws_sns_topic.monitoring.arn
  protocol  = "email"
  endpoint  = var.monitoring_email
}
