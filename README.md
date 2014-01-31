# ngrok-services

[![Build Status](https://travis-ci.org/lightsofapollo/ngrok-services.png?branch=master)](https://travis-ci.org/lightsofapollo/ngrok-services)

Node based wrapper for ngrok... Ideally this would be baked into ngrok
(or as a go client) but as an inital PoC I wrote this by wrapping ngrok.

## Features

  - machine readable (json) output
  - multiple (machine readable) output formats from start/restart (json/env file)

## Usage

### CLI

```sh
ngrok-services --help
```

```
  Usage: ngrok-services [options] [command]

  Commands:

    stop [config]          terminate ngrok tunneling
    start [config]         start running ngrok with the config
    restart [config]       ensure the service is running by stopping/starting

  Options:

    -h, --help             output usage information
    -p, --pid-file <path>  pid file location
    -f, --format <name>    name of formatter [env|json]
```

### Config Files

create a `ngrok_services.json` (can also be a js file) like this:

``` json
{
  "http": { "port": 8080 },
  "amqp": { "port": 5701, "proto": "tcp", "authtoken": "..." },
}
```

Then it can be manipulated via `ngrok-services`:

## Examples

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

```sh
# output formats
ngrok-services start -f env
ngrok-services start -f json
ngrok-services start -f ./path/to/custom/thing
```
