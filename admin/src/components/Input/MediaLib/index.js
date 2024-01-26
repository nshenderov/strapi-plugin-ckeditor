import React from "react";
import { prefixFileUrlWithBackendUrl, useLibrary } from "@strapi/helper-plugin";
import PropTypes from "prop-types";

const MediaLib = ({ isOpen, onChange, onToggle, editor, uploadConfig: { responsiveDimensions } }) => {
  const { components } = useLibrary();
  const MediaLibraryDialog = components["media-library"];

  const handleChangeAssets = (assets) => {
    let newValue = "";

    assets.map(({ name, url, alt, formats, mime }) => {
      if (mime.includes("image")) {
        if (formats && responsiveDimensions) {
          let set = "";
          let keys = Object.keys(formats).sort((a, b) => formats[a].width - formats[b].width);
          keys.map((k) => (set += prefixFileUrlWithBackendUrl(formats[k].url) + ` ${formats[k].width}w,`));
          newValue += `<img src="${url}" alt="${alt}" width="${formats[keys[keys.length - 1]].width}px" srcset="${set}" />`;
        } else {
          newValue += `<img src="${url}" alt="${alt}" />`;
        }
      } else if (mime.includes("application/pdf")) {
        newValue = `<a href="${prefixFileUrlWithBackendUrl(url)}" download="${name}">${name || "Download PDF"}</a>`;
      } else if (mime.includes("video")) {
        newValue = `
            <video class="video" controls width="500px">
                <source src="${prefixFileUrlWithBackendUrl(url)}" type="${mime}" />
            <video/>`;
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
    }));

    handleChangeAssets(formattedFiles);
  };

  if (!isOpen) {
    return null;
  }

  return <MediaLibraryDialog onClose={onToggle} onSelectAssets={handleSelectAssets} />;
};

MediaLib.defaultProps = {
  isOpen: false,
  onChange: () => {},
  onToggle: () => {},
};

MediaLib.propTypes = {
  isOpen: PropTypes.bool,
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
};

export default MediaLib;
