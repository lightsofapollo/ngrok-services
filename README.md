# ngrok-services

Node based wrapper for ngrok... Ideally this would be baked into ngrok
(or as a go client) but as an inital PoC I wrote this by wrapping ngrok.

## Features

  - machine readable (json) output
  - json config files to generate unique (public) hostnames.

## Usage

create a `ngrok_services.json` (can also be a js file) like this:

``` json
{
  "http": { "port": 8080 },
  "amqp": { "port": 5701, "proto": "tcp", "authtoken": "..." },
}
```

Then it can be manipulated via `ngrok-services`:

```sh
# usage is global ngrok-services might be at ./node_modules/.bin/ngrok-services
ngrok-services start
ngrok-services stop
ngrok-services restart
```

```sh
# can also be used with paths
ngrok-services start some_folder
ngrok-services stop some_folder
ngrok-services restart some_folder
```
