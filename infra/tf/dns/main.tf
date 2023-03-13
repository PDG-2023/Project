
terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 3.0"
    }
  }
}

resource "cloudflare_record" "production" {
  zone_id = var.cf_zone_id
  name    = "@"
  value   = var.server_ip_addr
  proxied = true
  type    = "A"
  ttl     = 1
}
