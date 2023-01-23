'use strict';

module.exports = {

  getUploadConfig: async (ctx) => {
    const uploadConfig = await strapi.plugin('ckeditor').service('config').getUploadConfig('upload').getSettings();
    ctx.send(uploadConfig);
  },

  getCKEditorConfig: async (ctx) => {
    const config = await strapi.plugin('ckeditor').service('config').getCKEditorConfig();
    ctx.type = 'application/javascript';
    ctx.send(config);
  }
};