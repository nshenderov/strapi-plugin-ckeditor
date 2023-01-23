'use strict';

const fs = require("fs");

/**
 * config.js configuration service
 */

module.exports = ({ strapi }) => {
  return {
    getUploadConfig(name) {
      return strapi.plugin('upload').service(name) ?? {};
    },
    getCKEditorConfig() {
      const appDir = process.cwd();
      const isTSProject = fs.existsSync(`${appDir}/dist`);
      const jsDir = isTSProject ? `${appDir}/dist` : appDir;

      const filename = `${jsDir}/config/ckeditor.txt`;
      return fs.existsSync(filename)
        ? fs.readFileSync(filename)
        : 'globalThis.CKEditorConfig = null' // empty script tag causes no problems
    },
  };
};