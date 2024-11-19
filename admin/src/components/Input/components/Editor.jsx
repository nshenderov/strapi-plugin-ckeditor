import React, { useEffect, useState } from 'react';
import { Loader } from '@strapi/design-system';
import { Box } from '@strapi/design-system';
import styled from 'styled-components';

import { CKEReact } from './CKEReact';
import { EditorLayout } from './EditorLayout';
import { MediaLib } from './MediaLib';
import { getConfiguredPreset } from '../config';
import { GlobalStyling } from './GlobalStyling';

export const Editor = ({
  name,
  disabled,
  presetName,
  maxLength,
  placeholder,
}) => {
  const [editorInstance, setEditorInstance] = useState(null);
  const [preset, setPreset] = useState(null);
  const [isMaxLength, setIsMaxLength] = useState(false);
  const [mediaLibVisible, setMediaLibVisible] = useState(false);

  const toggleMediaLib = () => setMediaLibVisible((prev) => !prev);

  const handleChangeAssets = (newElems) => {
    const viewFragment = editorInstance.data.processor.toView(newElems);
    const modelFragment = editorInstance.data.toModel(viewFragment);
    editorInstance.model.insertContent(modelFragment);

    toggleMediaLib();
  };

  useEffect(() => {
    (async () => {
      const currentPreset = await getConfiguredPreset(presetName, {
        toggleMediaLib: toggleMediaLib,
        strapiFieldPlaceholder: placeholder,
      });

      setPreset(currentPreset);
    })();
  }, []);

  if (!preset) {
    return (
      <LoaderBox hasRadius background="neutral100">
        <Loader>Loading...</Loader>
      </LoaderBox>
    );
  }

  return (
    <>
      <GlobalStyling />
      <EditorLayout
        presetStyles={preset.styles}
        name={name}
        isMaxLength={isMaxLength}
      >
        <CKEReact
          name={name}
          preset={preset}
          disabled={disabled}
          maxLength={maxLength}
          isMaxLength={isMaxLength}
          setIsMaxLength={setIsMaxLength}
          setEditorInstance={setEditorInstance}
        />
        <MediaLib
          isOpen={mediaLibVisible}
          toggle={toggleMediaLib}
          handleChangeAssets={handleChangeAssets}
        />
      </EditorLayout>
    </>
  );
};

const LoaderBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
`;
