
# metalsmith-serve

  A metalsmith plugin to serve the build directory. Best used in development and with metalsmith-watch.

## Installation

    $ npm install metalsmith-serve

## Basic Example

```js
var metalsmith = require('metalsmith');
var serve = require('metalsmith-serve');

metalsmith(__dirname)
  .use(serve())
  .build();
```

This will serve Metalsmith's build directory on localhost:8080. By default, metalsmith-serve will only log error requests.

## Advanced Example

```js
var metalsmith = require('metalsmith');
var serve = require('metalsmith-serve');

metalsmith(__dirname)
  .use(serve({
    port: 8081,
    verbose: true
  }))
  .build();
```

This will serve Metalsmith's build directory on localhost:8081 and will show all served requests.

## Options

### host
Type: `String`
Default: `localhost`

Hostname or IP to listen on.

### port
Type: `Number`
Default: `8080`

Port to listen on.

### cache
Type: `Number`
Default: `0`

Number of seconds to cache served files

### verbose
Type: `Boolean`
Default: false

Log all requests

## License

  MIT
