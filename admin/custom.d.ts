export {};

/// <reference types="vite/client" />

interface BrowserStrapi {
  backendURL: string;
}

declare global {
  interface Window {
    strapi: BrowserStrapi;
  }
}
