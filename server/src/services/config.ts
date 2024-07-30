import type { Core } from '@strapi/strapi';
import fs from 'fs';

const config = ({ strapi }: { strapi: Core.Strapi }) => ({
  getUploadConfig(name) {
    return strapi.plugin('upload').service(name) ?? {};
  },
  getCKEditorConfig() {
    const appDir = process.cwd();

    const filename = `${appDir}/config/ckeditor.txt`;

    return fs.existsSync(filename) ? fs.readFileSync(filename) : 'globalThis.CKEditorConfig = null';
  },
});

export default config;
