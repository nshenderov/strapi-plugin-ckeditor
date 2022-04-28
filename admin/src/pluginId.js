const pluginPkg = require('../../package.json');

const pluginId = pluginPkg.name.replace(/^(@_sh\/strapi-)plugin-/i, '');
// const pluginId = pluginPkg.name.replace(/^(@[^-,.][\w,-]+\/|strapi-)plugin-/i, '');

module.exports = pluginId;
