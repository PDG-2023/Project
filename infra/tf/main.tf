terraform {
  cloud {
    organization = "pdg2023"

    workspaces {
      name = "storeme"
    }
  }
}

module "web_server" {
  source = "./web-server"
}

module "dns" {
  source = "./dns"

  server_ip_addr = module.web_server.server_eip[0]

  depends_on = [
    module.web_server
  ]
}
