import fs from 'fs';
import type { Core } from '@strapi/strapi';

export default function configService(): Core.Service {
  return {
    readConfig(): string {
      const configFileContent = readConfigFile();
      let config = configFileContent && trimConfig(configFileContent);
      config ??= `globalThis.SH_CKE_CONFIG = null`;

      return config;
    },
  };
}

function readConfigFile(): string | null {
  const appDir: string = process.cwd();
  const isTSProject: boolean = fs.existsSync(`${appDir}/dist`);
  const envName: string = process.env.NODE_ENV;

  const cfgDir: string = isTSProject ? `${appDir}/dist/config` : `${appDir}/config`;
  const cfgFileName: string = 'ckeditor.js';

  const envFilePath: string = `${cfgDir}/env/${envName}/${cfgFileName}`;
  const baseFilePath: string = `${cfgDir}/${cfgFileName}`;

  if (fs.existsSync(envFilePath)) {
    return fs.readFileSync(envFilePath, 'utf8');
  }

  if (fs.existsSync(baseFilePath)) {
    return fs.readFileSync(baseFilePath, 'utf8');
  }

  return null;
}

function trimConfig(rawBuf: string): string | null {
  let config: string | null = null;

  ['const CKEConfig', 'function CKEConfig'].some(func => {
    const idx = rawBuf.indexOf(func);
    if (idx >= 0) {
      config = `${rawBuf.substring(idx)}\nglobalThis.SH_CKE_CONFIG = CKEConfig()`;
      return true;
    }
    return false;
  });

  return config;
}
