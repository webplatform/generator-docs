
/**
 * A minimal webserver for local development
 *
 * Use with `make serve`.
 *
 * To serve site for production, refer to notes
 * in README.md
 */

var express = require('express');
var app = express();

app.use(express.static('build'));

app.get('/', function matchRoot (req, res) {
   res.redirect('/Main_Page');
});

app.get(/(?!\.html$)/, function matchNonHtml (req, res) {
  req.url += ".html";
  res.redirect(req.url);
});

var server = app.listen(process.env.PORT || 4000, function() {
    console.log('Listening on port %d', server.address().port);
});
