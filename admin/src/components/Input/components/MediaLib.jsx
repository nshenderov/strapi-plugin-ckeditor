import React from 'react';
import PropTypes from 'prop-types';
import { useStrapiApp } from '@strapi/strapi/admin';

import { prefixFileUrlWithBackendUrl } from '../../../utils/prefixFileUrlWithBackendUrl'

export const MediaLib = ({ isOpen = false, onToggle = () => {}, editor }) => {
  const components = useStrapiApp('MediaLib', ({ components }) => components);
  
  const MediaLibraryDialog = components['media-library'];

  const handleChangeAssets = (assets) => {
    let newValue = '';

    assets.map(({ name, url, alt, formats, mime, width, height }) => {
      if (mime.includes('image')) {
        if (formats && globalThis.SH_CKE_UPLOAD_ADAPTER_IS_RESPONSIVE) {
          let set = '';
          let keys = Object.keys(formats).sort((a, b) => formats[a].width - formats[b].width);
          keys.map((k) => (set += prefixFileUrlWithBackendUrl(formats[k].url) +` ${formats[k].width}w,`));
          newValue = `<img src="${prefixFileUrlWithBackendUrl(url)}" alt="${alt}" width="${width}" height="${height}" srcset="${set}" />`;
        } else {
          newValue = `<img src="${prefixFileUrlWithBackendUrl(url)}" alt="${alt}" width="${width}" height="${height}" />`;
        }
      } else if (mime.includes('video')) {
        newValue = `
            <video class="video" controls width="500px">
                <source src="${prefixFileUrlWithBackendUrl(url)}" type="${mime}" />
            </video>`;
      } else {
        newValue = `<a href="${prefixFileUrlWithBackendUrl(url)}">${name || 'Open document'}</a>`;
      }
    });

    const viewFragment = editor.data.processor.toView(newValue);
    const modelFragment = editor.data.toModel(viewFragment);
    editor.model.insertContent(modelFragment);

    onToggle();
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

    handleChangeAssets(formattedFiles);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <MediaLibraryDialog
      onClose={onToggle}
      onSelectAssets={handleSelectAssets}
    />
  );
};

MediaLib.propTypes = {
  isOpen: PropTypes.bool,
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
};