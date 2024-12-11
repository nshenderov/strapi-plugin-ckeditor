export {};

declare global {
  interface Window {
    strapi: {
      backendURL: string;
    };
    SH_CKE: {
      IS_UPLOAD_RESPONSIVE: boolean;
    };
  }
}
