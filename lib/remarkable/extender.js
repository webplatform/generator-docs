'use strict';

/**
 * A Remarkable parser configuration object as plugin.
 */
module.exports = function (instance, options) {

  instance.block.ruler.enable([
    'deflist'
  ]);

};

