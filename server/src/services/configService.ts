import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import type { Core } from '@strapi/strapi';

export default function configService(): Core.Service {
  return {
    async readConfig(): Promise<string> {
      const configFileContent = await readConfigFile();
      let config = configFileContent && trimConfig(configFileContent);
      config &&= `${config}\nwindow.SH_CKE_CONFIG = CKEConfig()\n`;
      config ??= `window.SH_CKE_CONFIG = null\n`;

      return config;
    },
  };
}

function readConfigFile(): Promise<string | null> {
  const appDir = process.cwd();
  const isTSProject = existsSync(`${appDir}/dist`);
  const envName = process.env.NODE_ENV;

  const cfgDir = isTSProject ? `${appDir}/dist/config` : `${appDir}/config`;
  const cfgFileName = 'ckeditor.js';

  const envFilePath = `${cfgDir}/env/${envName}/${cfgFileName}`;
  const baseFilePath = `${cfgDir}/${cfgFileName}`;

  if (existsSync(envFilePath)) {
    return readFile(envFilePath, 'utf8');
  }

  if (existsSync(baseFilePath)) {
    return readFile(baseFilePath, 'utf8');
  }

  return null;
}

function trimConfig(rawBuf: string): string | null {
  let config: string | null = null;

  ['const CKEConfig', 'function CKEConfig'].some(func => {
    const idx = rawBuf.indexOf(func);
    if (idx >= 0) {
      config = `${rawBuf.substring(idx)}`;
      return true;
    }
    return false;
  });

  return config;
}
