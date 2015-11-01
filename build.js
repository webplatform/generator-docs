
/**
 * Build static HTML files using Metalsmith
 */

var  metalsmith = require("metalsmith")
    ,changed = require("metalsmith-changed")
    ,layouts = require("metalsmith-layouts")
    ,assets = require("metalsmith-assets")
    ,remarkable = require("metalsmith-markdown-remarkable")
    ,remarkableHighlighter = require("./lib/remarkable/highlighter")
    ,remarkableExtender = require("./lib/remarkable")
    ,handlebarsExtender = require("./lib/handlebars")()
    ,pkg = require("./package.json");

metalsmith(__dirname)
  .clean(false)
  .use(changed())
  .source("./src")
  .destination("./build")
  .use(remarkable("full", {
     html: true
    ,breaks: true
    ,typographer: true
    ,langPrefix: ""
    ,highlight: remarkableHighlighter
  }).use(remarkableExtender))
  .use(layouts({
     engine: "handlebars"
    ,default: "default.hbs"
    ,partials: "partials"
  }))
  .use(assets({
     source: "./static"
    ,destination: "./"
  }))
  .build(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Site build complete!");
    }
  });
