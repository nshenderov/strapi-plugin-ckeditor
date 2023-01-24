'use strict';

const pluginId = require("../../admin/src/utils/pluginId");

module.exports = {

  getUploadConfig: async (ctx) => {
    const uploadConfig = await strapi.plugin(pluginId).service('config').getUploadConfig('upload').getSettings();
    ctx.send(uploadConfig);
  },

  getCKEditorConfig: async (ctx) => {
    const config = await strapi.plugin(pluginId).service('config').getCKEditorConfig();
    ctx.type = 'text/javascript';
    ctx.send(config);
  }
};