'use strict';

const fs = require('fs');

module.exports = ({ strapi }) => {
  return {
    getConfig() {
      const appDir = process.cwd();
      const isTsProject = fs.existsSync(`${appDir}/dist`);

      const cfgDir = isTsProject ? `${appDir}/dist/config` : `${appDir}/config`;
      const cfgFileName = 'ckeditor.js';
      const envName = process.env.NODE_ENV;

      const envFilePath = `${cfgDir}/env/${envName}/${cfgFileName}`;
      const baseFilePath = `${cfgDir}/${cfgFileName}`;
      let fileToRead;

      if (fs.existsSync(envFilePath)) {
        fileToRead = envFilePath;
      } else if (fs.existsSync(baseFilePath)) {
        fileToRead = baseFilePath;
      }

      return fileToRead ?
          fs.readFileSync(fileToRead, 'utf8') +
            `\nglobalThis.SH_CKE_CONFIG = CKEConfig()`
        : `globalThis.SH_CKE_CONFIG = null`;
    },
  };
};
