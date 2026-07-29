export function prefixFileUrlWithBackendUrl(fileURL: string): string {
  // `backendURL` is set on window.strapi by the Strapi admin panel at runtime,
  // but is not part of the public `Strapi` type from @strapi/types.
  const { backendURL } = window.strapi as unknown as { backendURL: string };
  return !!fileURL && fileURL.startsWith('/') ? `${backendURL}${fileURL}` : fileURL;
}
