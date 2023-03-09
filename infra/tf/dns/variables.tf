variable "server_ip_addr" {
    description = "Ip of the server"
    type = string
}

variable "cf_zone_id" {
  description = "Cloudflare zone id"
  type        = string
  default     = "2f59ccfec8cb3c223814ad4d8026ff98"
}
