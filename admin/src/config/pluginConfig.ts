import type { PluginConfig } from './types';
import { PLUGIN_ID } from '../utils';

export async function getPluginConfig(): Promise<PluginConfig | null> {
  const config = await loadConfig().catch(error => console.error('CKEditor: ', error));

  return config || null;
}

async function loadConfig(): Promise<PluginConfig | null> {
  return new Promise((resolve, reject) => {
    const { backendURL } = window.strapi;
    const url =
      backendURL !== '/'
        ? `${backendURL}/${PLUGIN_ID}/config/ckeditor`
        : `/${PLUGIN_ID}/config/ckeditor`;

    const script = document.createElement('script');
    script.id = 'ckeditor-config';
    script.src = url;

    script.onload = () => resolve(window.SH_CKE_CONFIG);
    script.onerror = () => reject(new Error('Failed loading config script'));

    document.body.appendChild(script);
  });
}
