export const prefixFileUrlWithBackendUrl = () => {
  return !!fileURL && fileURL.startsWith('/')
    ? `${window.strapi.backendURL}${fileURL}`
    : fileURL;
};
