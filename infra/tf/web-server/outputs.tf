output "server_eip" {
  description = "Elastic ip address for Envoy nlb services"
  value       = aws_eip.lb.*.public_ip
}

output "ipv4_dns_name" {
  description = "Simple name"
  value = aws_instance.web.public_dns
}
