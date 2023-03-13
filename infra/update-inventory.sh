#!/bin/bash

cd tf

SERVER_IP=$(terraform output server_ip)

cd ../an

LINE=$(grep -e ansible_host inventory.yaml)

sed -i "s/$LINE/      ansible_host: $SERVER_IP/" ./inventory.yaml
