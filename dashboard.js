fs       = require('fs');
http     = require('http');
connect  = require('connect');
app      = connect();
dispatch = require('dispatch');
send     = require('send');

app.use(connect.static(__dirname + '/images'));
app.use(connect.static(__dirname + '/javascripts'));

app.use(dispatch({
  'GET /' : function(req, res, next) {
    res.setHeader('Content-Type', 'text/html');
    renderUI(function(err, html) {
      if (err !== null) return next(err);
      res.end(html);
    });
  }
}));

app.use(dispatch({
  'GET /app.css' : function(req, res, next) {
    res.setHeader('Content-Type', 'text/css');
    res.end(css);
  }
}));

app.use(dispatch({
  'GET /jquery.js' : function(req, res, next) {
    send(req, 'javascripts/jquery.min.js').pipe(res);
  }
}));

app.use(dispatch({
  'GET /app.js' : function(req, res, next) {
    send(req, 'javascripts/app.js').pipe(res);
  }
}));

template = fs.readFileSync('dashboard.html');
function renderUI(cb) {
  return cb(noErr, template);
}

css = (function catCSS() {
  var allCss = '';
  var files = ['stylesheets/normalize.css', 'stylesheets/custom.css', 'stylesheets/foundation.css'];
  for (var i in files) {
    allCss += fs.readFileSync(files[i], 'utf8');
  };
  return allCss;
})();

port   = process.env.PORT != null ? process.env.PORT : 4000;
server = http.createServer(app);
server.listen(port, function() {
  console.log("app running on port: " + port);
});

noErr = null;
