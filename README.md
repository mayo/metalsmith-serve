[![Build Status](https://travis-ci.org/mayo/metalsmith-serve.svg?branch=master)](https://travis-ci.org/mayo/metalsmith-serve)

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
  .build(function(err) {
    if (err) { throw err; }
  });
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
  .build(function(err) {
    if (err) { throw err; }
  });
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
Default: `false`

Log all requests

### not_found
Type: `String`
Default: `undefined`

Serves a [404](https://en.wikipedia.org/wiki/HTTP_404) file if the requested file isn't located
e.g. '`/404.html`'

### redirects
Type: `Object`
Default: `{}`

Redirects with [301](https://en.wikipedia.org/wiki/HTTP_301) headers unless the file is located
e.g. ```js
{
  '/old_url.php': '/new_url/index.html'
}
```

## License

  MIT
