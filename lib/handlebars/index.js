
/**
 * Handlebars helpers registry
 */

var Remarkable = require('remarkable')
  , Handlebars = require('handlebars');

module.exports = function () {
  'use strict';
  var md = new Remarkable();

  Handlebars.registerHelper('markdown', function markdownRendererHelper (options) {
    var text = md.render(options.fn(this));
    return new Handlebars.SafeString(text);
  });

  Handlebars.registerHelper('urlencode', function urlencodeHelper (options) {
    var urlArg = options.fn(this) + '/'
      , out = urlArg.replace(/\s+/g, '_');
    return new Handlebars.SafeString(encodeURI(out));
  });

  Handlebars.registerHelper('breadcrumbize', function breadcrumbizeHelper (options) {
    var fragments = options.fn(this).split('/')
      , subpath = '/'
      , out = '';

    fragments.forEach(function(str, index, full){
      subpath += `${str}/`;
      out += `<li><a href="${subpath}">${str}</a></li>`;
    });

    return new Handlebars.SafeString(out);
  });

  Handlebars.registerHelper('readiness_marker', function readinessHelper (options) {
      var  label = options.fn(this)
        ,  className = label.replace(/\s/g, '_')
        ,  template = `<div class="readiness-state ${className}"><p>This page is <a>${label}</a></p></div>`;

      if (label.length > 1) {
        return new Handlebars.SafeString(template);
      }
  });

};
