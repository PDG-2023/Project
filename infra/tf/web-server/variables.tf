variable "aws_instance_type" {
  description = "ec2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "aws_region" {
  description = "Datacenter location"
  type        = string
  default     = "eu-west-2" # London
}

variable "aws_ami" {
  description = "AMI"
  type        = string
  default     = "ami-0aaa5410833273cfe" # Ubuntu 22.04
}

variable "aws_keypair_name" {
  description = "Name of the key pair"
  type        = string
  default     = "deployer-key"
}

variable "aws_keypair_public_key" {
  description = "ssh public key"
  type        = string
  default     = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCsyLTLkXCNhsiaKBoHeuIXq/7L0T1PY1Ape6h+x8XXRaxQjvXkPRGWXJuN3Oca0SYlkcuN9oxehlj82gpfHkUmMFh8JvCFLa0gsIkU46y15ugrQGgBKpeBHkkQa4vVAXixCVkwRvmOj2ozbO24xKloVa/5X9WcXcKC7/+HRe/98j1vko5GMJZqUacZwOAnnamh5igdCh/TLVnpHAtGpWWx4UvQxEIMf920L7Aui27M8iM/G64n2/eBHXN7YkEPCmxWjHEWD47HCjDnRsvDhUEfz5qSdsGoHVLZk3bZmT2E0ZLBqgkpbr30ZzE73y3EvdRjBDGArBSVoM33Z9k8ZWxR nigel@honeypot"
}

variable "cf_ipv4_list" {
  description = "Cloudflare Ips"
  type = list(string)
  default = [
    "173.245.48.0/20",
    "103.21.244.0/22",
    "103.22.200.0/22",
    "103.31.4.0/22",
    "141.101.64.0/18",
    "108.162.192.0/18",
    "190.93.240.0/20",
    "188.114.96.0/20",
    "197.234.240.0/22",
    "198.41.128.0/17",
    "162.158.0.0/15",
    "104.16.0.0/13",
    "104.24.0.0/14",
    "172.64.0.0/13",
    "131.0.72.0/22",
  ]
}

variable "cf_ipv6_list" {
  description = "Cloudflare Ips"
  type = list(string)
  default = [
    "2400:cb00::/32",
    "2606:4700::/32",
    "2803:f800::/32",
    "2405:b500::/32",
    "2405:8100::/32",
    "2a06:98c0::/29",
    "2c0f:f248::/32",
  ]
}
