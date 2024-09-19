import pluginPkg from '../../../package.json';

export const PLUGIN_ID =
  pluginPkg.strapi.name ||
  pluginPkg.name.replace(/^(@_sh\/strapi-)plugin-/i, '');
