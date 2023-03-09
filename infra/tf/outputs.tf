output "server_ip" {
    description = "EC2 server ip"
    value = module.web_server.server_eip[0]
}

output "server_dns_name" {
    value = module.web_server.ipv4_dns_name
}
