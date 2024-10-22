'use strict';

const fs = require('fs');

module.exports = ({ strapi }) => {
  const readConfigFile = () => {
    const appDir = process.cwd();
    const isTSProject = fs.existsSync(`${appDir}/dist`);
    const envName = process.env.NODE_ENV;

    const cfgDir = isTSProject ? `${appDir}/dist/config` : `${appDir}/config`;
    const cfgFileName = 'ckeditor.js';

    const envFilePath = `${cfgDir}/env/${envName}/${cfgFileName}`;
    const baseFilePath = `${cfgDir}/${cfgFileName}`;

    if (fs.existsSync(envFilePath)) {
      return fs.readFileSync(envFilePath, 'utf8');
    } else if (fs.existsSync(baseFilePath)) {
      return fs.readFileSync(baseFilePath, 'utf8');
    } else {
      return null;
    }
  };

  const trimConfig = (str) => {
    for (const func of ['const CKEConfig', 'function CKEConfig']) {
      const idx = str.indexOf(func);
      if (idx >= 0) {
        return str.substring(idx) + `\nglobalThis.SH_CKE_CONFIG = CKEConfig()`;
      }
    }
  };

  return {
    getConfig() {
      const configFileContent = readConfigFile();
      const config = configFileContent && trimConfig(configFileContent);

      return config || `globalThis.SH_CKE_CONFIG = null`;
    },
  };
};
