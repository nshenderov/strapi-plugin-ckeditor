'use strict';

const fs = require("fs");

module.exports = ({ strapi }) => {
  return {
    getUploadConfig(name) {
      return strapi.plugin('upload').service(name) ?? {};
    },
    getCKEditorConfig() {
      const appDir = process.cwd();

      const filename = `${appDir}/config/ckeditor.txt`;
      
      return fs.existsSync(filename)
        ? fs.readFileSync(filename)
        : 'globalThis.CKEditorConfig = null'
    },
  };
};