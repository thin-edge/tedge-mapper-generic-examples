## uptime

This flow demonstrates how to use `tedge-mapper-generic` to monitor the uptime (as a percentage) of a service.

### Description

The flow is represented by the following steps:

1. Receives status changes, record the timestamps
1. Every tick, publish the statistics

### Input

The flow expects the thin-edge.io service status message to be one of the following formats:

**JSON payload**

```json
{ "status": "down | up" }
```

**Text payload**

```
1 or 0
```

## Using it

### Install dependencies

```sh
npm install
```

### Generate code from protobuf definitions

```sh
npm run build:proto
```

### Run tests

```sh
npm run test
```

### Create package

Build the package and pull in all the dependencies and transpile the JavaScript down to the targer version (e.g. `ES2018`)

```sh
npm run build
```

The output package (which is a standalone JavaScript file) is under `./dist/main.mjs`.

### Run test package

First build the test variant of the package (which includes an entrypoint to start the script)

```sh
npm run build:test
npm run start:quickjs
npm run start:nodejs
```

Then run the build package under different JavaScript engines (you'll have to install the dependencies yourself).

```sh
npm run start:nodejs

# using quickjs runtime
npm run start:quickjs

# using wasm based quickjs version
npm run start:wasm-quickjs
```
