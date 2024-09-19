'use strict';

const fs = require('fs');

module.exports = ({ strapi }) => {
  return {
    getConfig() {
      const appDir = process.cwd();

      const fileName = 'ckeditor';

      for (const ext of ['js', 'ts']) {
        const filePath = `${appDir}/config/${fileName}.${ext}`;
        if (fs.existsSync(filePath)) {
          return (
            fs.readFileSync(filePath, 'utf8') +
            `\nglobalThis.SH_CKE_CONFIG = CKEConfig()`
          );
        }
      }

      return `globalThis.SH_CKE_CONFIG = null`;
    },
  };
};
