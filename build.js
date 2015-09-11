var  metalsmith = require('metalsmith')
    ,changed = require('metalsmith-changed')
    ,layouts = require('metalsmith-layouts')
    ,assets = require('metalsmith-assets')
    ,remarkable = require('metalsmith-markdown-remarkable')
    ,syntaxHighlighter = require('./lib/remarkable/highlighter')
    ,remarkablePlugin = require('./lib/remarkable/extender')
    ,pkg = require('./package.json');

metalsmith(__dirname)
  .clean(false)
  .use(changed())
  .source('./src')
  .destination('./build')
  .use(remarkable('full', {
    breaks: true,
    typographer: true,
    html: true,
    langPrefix: '',
    highlight: syntaxHighlighter
  }).use(remarkablePlugin))
  .use(layouts({
    engine: "handlebars",
    default: "default.hbs"
  }))
  .use(assets({
    source: "./static",
    destination: "./"
  }))
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Site build complete!');
    }
  });
