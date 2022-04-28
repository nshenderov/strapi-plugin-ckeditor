'use strict';

module.exports = {
  getConfig: async (ctx) => {
    const { configKey } = ctx.params;
    if(configKey === 'uploadcfg'){
      const uploadConfig = await strapi.plugin('ckeditor').service('config').getUploadConfig('upload').getSettings();
      ctx.send(uploadConfig);
    }else{
      const config = await strapi.plugin('ckeditor').service('config').getConfig(configKey);
      ctx.send(config);
    }
    
  },
};