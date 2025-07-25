## uptime

This flow demonstrates how to use jsonata-js to perform json transformations which follow similar substitutions rules supported by the Dynamic Mapper.

### Description

The flow is represented by the following steps:

1. Receives messages and transforms them as per the substitution rules

### Input

The flow expects the thin-edge.io service status message to be one of the following formats:

## Using it

### Install dependencies

```sh
npm install
```

### Run tests

```sh
npm run test
```

### Create package

Build the package and pull in all the dependencies and transpile the JavaScript down to the target version (e.g. `ES2018`)

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
