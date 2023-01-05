'use strict';

const fs = require("fs");

/**
 * config.js configuration service
 */

module.exports = ({ strapi }) => {
  return {
    getConfig(key = 'editor') {
      return strapi.plugin('ckeditor').config(key) ?? {};
    },
    getEditorConfigScript() {
      const appDir = process.cwd();
      const isTSProject = fs.existsSync(`${appDir}/dist`);
      const jsDir = isTSProject ? `${appDir}/dist` : appDir;

      const filename = `${jsDir}/config/ckeditor.js`;
      return fs.existsSync(filename)
        ? fs.readFileSync(filename)
        : 'globalThis.ckEditorConfig = null' // empty script tag causes no problems
    },
    getUploadConfig(name) {
      return strapi.plugin('upload').service(name) ?? {};
    },
  };
};