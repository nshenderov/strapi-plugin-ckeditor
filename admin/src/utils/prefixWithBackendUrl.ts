export function prefixFileUrlWithBackendUrl(fileURL: string): string {
  return !!fileURL && fileURL.startsWith('/') ? `${window.strapi.backendURL}${fileURL}` : fileURL;
}
