
/**
 * Syntax highlighter as a Remarkable Markdown renderer plugin.
 *
 * https://github.com/jonschlinkert/remarkable
 * https://www.npmjs.com/package/remarkable#options
 */

var hljs = require('highlight.js');

/**
 * Process code blocks
 *
 * Roughly an adaptation of the syntax highlight
 * example function provided in Remarkable documentation.
 */
module.exports = function (str, lang) {
  'use strict';

  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value;
    } catch (err) {}
  }

  try {
    return hljs.highlightAuto(str).value;
  } catch (err) {}

  return '';
};
