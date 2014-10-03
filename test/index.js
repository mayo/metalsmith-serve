
var assert = require('assert');
var http = require('http');
var fs = require('fs');
var path = require('path');
var Metalsmith = require('metalsmith');
var serve = require('..');

describe('metalsmith-serve', function(){

  it('should serve on local port', function(done){
    var port = 8081;

    var test = function(metalsmith) {
      var options = {
        host: "localhost",
        "port": port,
        path: "/"
      };

      var callback = function(res) {
        var body = '';

        res.on('data', function(buf) {
          body += buf;
        });

        res.on('end', function() {
          assert.equal(res.statusCode, 200);

          var contents = fs.readFileSync(path.join(metalsmith.destination(), "index.html"), "utf8");
          assert.equal(body, contents);

          done();
        });

        res.on('error', function(e) {
          throw(e);
        });
      };

      var req = http.request(options, callback)
      req.end();

    };

    var metalsmith = Metalsmith("test/fixtures/site");
    metalsmith
      .use(serve({ "port": port }))
      .build(function() { test(metalsmith); });
  });

});

