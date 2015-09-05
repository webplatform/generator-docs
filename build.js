var  metalsmith = require('metalsmith')
    ,changed = require('metalsmith-changed')
    ,markdown = require('metalsmith-markdown-remarkable')
    ,handlebars = require('handlebars')
    ,layouts = require('metalsmith-layouts')
    ,assets = require('metalsmith-assets')
    ,syntaxHighlighter = require('./lib/metalsmith/highlighter')
    ,pkg = require('./package.json');

metalsmith(__dirname)
  .clean(false)
  .use(changed())
  .source('./src')
  .destination('./build')
  .use(markdown('full', {
    breaks: true,
    typographer: true,
    html: true,
    langPrefix: '',
    highlight: syntaxHighlighter
  }))
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
