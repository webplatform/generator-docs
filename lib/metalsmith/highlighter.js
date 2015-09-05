/*!
 * Syntax highlighter as a Remarkable Markdown renderer plugin.
 *
 * https://github.com/jonschlinkert/remarkable
 * https://www.npmjs.com/package/remarkable#options
 */

'use strict';

var hljs = require('highlight.js'),
    supportedLanguageSlugs = ['js','html','xml','svg','rss','python'];

/**
 * Process code blocks
 *
 * Roughly an adaptation of the syntax highlight
 * example function provided in Remarkable documentation.
 */
module.exports = function metalsmithRemarkableSyntaxHighlighter (str, lang) {
  var newLang = lang||'';

  // Notice that this won't change the code render block, but merely the string
  // sent as a language hint sent to hljs.
  newLang = (new String(lang)).replace('{.','').replace('}','').replace(':','');
  newLang = (supportedLanguageSlugs.indexOf(newLang) === -1) ? '' : newLang;

  if (newLang && hljs.getLanguage(newLang)) {
    try {
      return hljs.highlight(newLang, str).value;
    } catch (err) {}
  }

  try {
    return hljs.highlightAuto(str).value;
  } catch (err) {}

  return ''; // use external default escaping
};
