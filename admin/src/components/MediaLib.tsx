import React from 'react';
import { useStrapiApp } from '@strapi/strapi/admin';

import { prefixFileUrlWithBackendUrl } from '../utils';

type MediaLibProps = {
  isOpen: boolean;
  toggle: () => void;
  handleChangeAssets: (newElems: string) => void;
};

function MediaLib({ isOpen = false, toggle, handleChangeAssets }: MediaLibProps) {
  const components = useStrapiApp('MediaLib', state => state.components);
  const MediaLibraryDialog = components['media-library'];

  function handleSelectAssets(files: any[]): void {
    const formattedFiles = files.map(f => ({
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
  }

  function getNewElems(assets: any): string {
    let newElems = '';

    assets.forEach(({ name, url, alt, formats, mime, width, height }: any) => {
      if (mime.includes('image')) {
        if (formats && window.SH_CKE.IS_UPLOAD_RESPONSIVE) {
          const set = formSet(formats);
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
  }

  function formSet(formats: any): string {
    let set = '';
    const keys = Object.keys(formats).sort((a, b) => formats[a].width - formats[b].width);
    keys.forEach(k => {
      set += `${prefixFileUrlWithBackendUrl(formats[k].url)} ${formats[k].width}w,`;
    });

    return set;
  }

  if (!isOpen) {
    return null;
  }

  // @ts-ignore
  return <MediaLibraryDialog onClose={toggle} onSelectAssets={handleSelectAssets} />;
}

const MemoizedMediaLib = React.memo(MediaLib);
export { MemoizedMediaLib as MediaLib };
