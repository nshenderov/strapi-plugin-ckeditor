'use strict';

const pluginPkg = require('../../../package.json');

module.exports =
  pluginPkg.strapi.name ||
  pluginPkg.name.replace(/^(@_sh\/strapi-)plugin-/i, '');
