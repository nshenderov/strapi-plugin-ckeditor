import React from 'react';
import { useStrapiApp } from '@strapi/strapi/admin';
import { prefixFileUrlWithBackendUrl, isImageResponsive } from '../utils';

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
      const isYouTube = isYouTubeUrl(url);

      if (mime.includes('image')) {
        if (formats && isImageResponsive(formats)) {
          const set = formSrcSet(formats);
          newElems += `<img src="${url}" alt="${alt}" width="${width}" height="${height}" srcset="${set}" />`;
        } else {
          newElems += `<img src="${url}" alt="${alt}" width="${width}" height="${height}" />`;
        }
      } else if (mime.includes('video') || isYouTube) {
        if (isYouTube) {
          const videoId = extractYouTubeVideoId(url);
          if (videoId) {
            newElems += `
              <iframe width="560" height="315"
                src="https://www.youtube.com/embed/${videoId}"
                frameborder="0"
                allowfullscreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>`;
          } else {
            newElems += `<a href="${url}">${name || 'Watch on YouTube'}</a>`;
          }
        } else {
          newElems += `
              <video class="video" controls width="500px">
                  <source src="${url}" type="${mime}" />
              </video>`;
        }
      } else {
        newElems += `<a href="${url}">${name || 'Open document'}</a>`;
      }
    });

    return newElems;
  }

  function formSrcSet(formats: any): string {
    let set = '';
    const keys = Object.keys(formats).sort((a, b) => formats[a].width - formats[b].width);
    keys.forEach(k => {
      set += `${prefixFileUrlWithBackendUrl(formats[k].url)} ${formats[k].width}w,`;
    });

    return set;
  }

  function isYouTubeUrl(url: string): boolean {
    return /(?:youtube\.com\/watch\?v=|youtu\.be\/)/.test(url);
  }

  function extractYouTubeVideoId(url: string): string | null {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  }

  if (!isOpen) {
    return null;
  }

  // @ts-ignore
  return <MediaLibraryDialog onClose={toggle} onSelectAssets={handleSelectAssets} />;
}

const MemoizedMediaLib = React.memo(MediaLib);
export { MemoizedMediaLib as MediaLib };
