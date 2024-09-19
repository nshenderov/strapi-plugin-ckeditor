'use strict';

const pluginId = require('./utils/pluginId');

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'CKEditor',
    plugin: pluginId,
    type: 'richtext',
  });
};
