const pluginPkg = require('../../package.json');

const pluginId = pluginPkg.strapi.name || pluginPkg.name.replace(/^(@_sh\/strapi-)plugin-/i, '');

module.exports = pluginId;