import React from 'react';
import { useStrapiApp } from '@strapi/strapi/admin';

import { prefixFileUrlWithBackendUrl } from '../../../utils/prefixFileUrlWithBackendUrl'

export const MediaLib = ({ isOpen = false, toggle, handleChangeAssets }) => {
  const components = useStrapiApp('MediaLib', ({ components }) => components);
  
  const MediaLibraryDialog = components['media-library'];

  const getNewElems = (assets) => {
    let newElems = '';

    assets.map(({ name, url, alt, formats, mime, width, height }) => {
      if (mime.includes('image')) {
        if (formats && globalThis.SH_CKE_UPLOAD_ADAPTER_IS_RESPONSIVE) {
          let set = '';
          let keys = Object.keys(formats).sort((a, b) => formats[a].width - formats[b].width);
          keys.map((k) => (set += prefixFileUrlWithBackendUrl(formats[k].url) +` ${formats[k].width}w,`));
          newElems += `<img src="${url}" alt="${alt}" width="${width}" height="${height}" srcset="${set}" />`;
        } else {
            newElems += `<img src="${url}" alt="${alt}" width="${width}" height="${height}" />`;
        }
      } else if (mime.includes('video')) {
        newElems += `
            <video class="video" controls width="500px">
                <source src="${url}" type="${mime}" />
            </video>`;
      } else {
        newElems += `<a href="${url}">${name || 'Open document'}</a>`;
      }
    });

    return newElems;
  };

  const handleSelectAssets = (files) => {
    const formattedFiles = files.map((f) => ({
      name: f.name,
      alt: f.alternativeText || f.name,
      url: prefixFileUrlWithBackendUrl(f.url),
      mime: f.mime,
      formats: f.formats,
      width: f.width,
      height: f.height,
    }));

    const newElems = getNewElems(formattedFiles);

    handleChangeAssets(newElems);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <MediaLibraryDialog
      onClose={toggle}
      onSelectAssets={handleSelectAssets}
    />
  );
};