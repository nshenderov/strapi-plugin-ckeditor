const prefixFileUrlWithBackendUrl = (fileURL: string) => {
  return !!fileURL && fileURL.startsWith('/')
    ? // @ts-ignore
      `${globalThis.strapi.backendURL}${fileURL}`
    : fileURL;
};

export default prefixFileUrlWithBackendUrl;
