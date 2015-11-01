
/**
 * Handlebars helpers registry
 */

var Remarkable = require('remarkable')
  , Handlebars = require('handlebars');

module.exports = function () {
  'use strict';
   var md = new Remarkable();

Handlebars.registerHelper('markdown', function(options) {
	var text = md.render(options.fn(this));
  return new Handlebars.SafeString( text );
});

};
