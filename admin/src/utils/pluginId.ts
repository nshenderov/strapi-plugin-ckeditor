import pluginPkg from '../../../package.json';

const PLUGIN_ID = pluginPkg.strapi.name || pluginPkg.name.replace(/^(@_sh\/strapi-)plugin-/i, '');

export default PLUGIN_ID;
