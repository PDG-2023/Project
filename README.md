```
 ____  _                 __  __
/ ___|| |_ ___  _ __ ___|  \/  | ___
\___ \| __/ _ \| '__/ _ \ |\/| |/ _ \
 ___) | || (_) | | |  __/ |  | |  __/
|____/ \__\___/|_|  \___|_|  |_|\___|
```
=======
# Store Me
Welcome to `StoreMe ©`, the simple and efficient inventory management solution for businesses of all sizes. Our platform is designed to help you easily manage your inventory by focusing on three key concepts: categories of items, locations of items, and the items themselves.

With `StoreMe ©`, you can easily organise your inventory by assigning categories to each item. Whether you're managing clothing, electronics, or office supplies, our platform allows you to categorise your items in a way that makes sense for your business.

In addition, our location tracking feature enables you to keep track of where each item is stored. This helps you quickly locate items when you need them and also makes it easy to keep track of inventory levels for each location.

Finally, `StoreMe ©` it allows you to track each individual item in your inventory, giving you a complete picture of your stock levels and enabling you to easily manage restocking and ordering.

Making your workflow as simple as possible is the #1 priority, therefore we allow scanning of barcodes as well as 2D codes (such as QR codes).

With its simple and intuitive design, `StoreMe ©` it makes it easy to manage your inventory and stay on top of your stock levels. Say goodbye to the hassle of manual inventory management and streamline your operations with `StoreMe ©`. Sign up today and take control of your inventory!

Yours Truly,

The `StoreMe ©` team

## Contributing
If you feel something is missing or not working as it should be PR's are welcome.

Check out the following documents to help in the best way possible.
- [devflow](./docs/dev-flow.md)
- [style-guide](./docs/styleguide.md)

For running the different parts of the project checkout the desired specific documentation
- [frontend](./apps/frontend/README.md)
- [backend](./apps/backend/README.md)

## Self hosted version
This apps runs in the cloud but can also be self hosted.

For self hosting docker-images are created on each merge to develop (bleeding edge and unstable) and on each release.

Docker is our recommended way to self host the application but it should be noted that it is not required.

### Docker
The application will need at least 3 containers to run correctly
- database, [PostgreSQL](https://hub.docker.com/_/postgres)
- [frontend](https://hub.docker.com/repository/docker/nigelmann/storeme-webapp/general)
- [backend](https://hub.docker.com/repository/docker/nigelmann/storeme-api/general)

We recommend you also use docker-compose to simplyfy the usage of docker

Here is a bare minimum docker-compose file to run the application (replace version with your desired one)

```yaml
version: "3.7"

services:
  bd-sm:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: db
      POSTGRES_DB: db
      POSTGRES_USER: db
    networks:
      - app
    volumes:
        - db-data:/var/lib/postgresql
  
  front-sm:
    image: nigelmann/storeme-webapp:<version>
    ports:
      - "9080:8080"
    networks:
      - network-access
  
  back-sm:
    image: nigelmann/storeme-api:<version>
    ports:
      - "9090:8080"
    environment:
      DB_PORT: "5432"
      DB_HOST: "bd-sm"
    networks:
      - app
      - network-access

networks:
  app:
    internal: true
  network-access:

volumes:
  db-data:
```

With this configuration you will need to place everything behind a reverse proxy to redirect everything with `/api` to the backend. You can either install a reverse proxy of your choice on the server or use one within docker that is up to you and not covered in this representation.

Let it be noted that web strongly recommend using Apache for absolutely no reason.
So here is a configuration for apache

```
<VirtualHost *:443>
    ServerName <YOUR_DOMAIN>
    <Directory />
        Deny From All
    </Directory>
    ProxyPass "/api" "http://localhost:8090/api"
    ProxyPassReverse "/api" "http://localhost:8090/api"
    ProxyPassMatch "^/(.*?)$" "http://localhost:8080/$1"
    ProxyPassReverse "/" "http://localhost:8080/"
</VirtualHost>
```
