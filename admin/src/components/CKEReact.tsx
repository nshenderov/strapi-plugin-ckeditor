import React, { useCallback, useRef, useState } from 'react';
import { useField } from '@strapi/strapi/admin';
import { Flex } from '@strapi/design-system';
import { ClassicEditor } from 'ckeditor5';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import 'ckeditor5/ckeditor5.css';

import { useEditorContext } from './EditorProvider';
import { getStoredToken } from '../utils';
import { MediaLib } from './MediaLib';
import type {
  StrapiMediaLibPlugin,
  StrapiUploadAdapterConfig,
  StrapiUploadAdapterPlugin,
} from '../plugins';

export type WordCountPluginStats = {
  words: number;
  characters: number;
};

export function CKEReact() {
  const [mediaLibVisible, setMediaLibVisible] = useState<boolean>(false);
  const [editorInstance, setEditorInstance] = useState<ClassicEditor | null>(null);

  const { name, disabled, error, preset, wordsLimit, charsLimit, validateInputLength } =
    useEditorContext();
  const { onChange: fieldOnChange, value: fieldValue } = useField(name);

  const wordCounterRef = useRef<HTMLElement>(null);

  const toggleMediaLib = useCallback(() => setMediaLibVisible(prev => !prev), [setMediaLibVisible]);

  const handleChangeAssets = useCallback(
    (newElems: string): void => {
      if (!editorInstance) {
        throw new Error('CKEditor: Editor instance is not initialized');
      }

      const viewFragment = editorInstance.data.processor.toView(newElems);
      const modelFragment = editorInstance.data.toModel(viewFragment);
      editorInstance?.model.insertContent(modelFragment);

      toggleMediaLib();
    },
    [toggleMediaLib, editorInstance]
  );

  const onEditorReady = (editor: ClassicEditor): void => {
    setUpPlugins(editor);
    setEditorInstance(editor);
  };

  const onEditorChange = (_e: any, editor: ClassicEditor): void => {
    const data = editor.getData();
    fieldOnChange(name, data);
  };

  if (!preset) {
    return null;
  }

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        config={preset.editorConfig}
        disabled={disabled}
        data={fieldValue ?? ''}
        onReady={onEditorReady}
        onChange={onEditorChange}
      />
      <Flex ref={wordCounterRef} color={error ? 'danger600' : 'neutral400'} />
      <MediaLib
        isOpen={mediaLibVisible}
        toggle={toggleMediaLib}
        handleChangeAssets={handleChangeAssets}
      />
    </>
  );

  function setUpPlugins(editor: ClassicEditor): void {
    const pluginsToSetup: Record<string, (editor: ClassicEditor) => void> = {
      WordCount: setUpWordCount,
      ImageUploadEditing: setUpImageUploadEditing,
      StrapiMediaLib: setUpStrapiMediaLib,
      StrapiUploadAdapter: setUpStrapiUploadAdapter,
    };

    Object.entries(pluginsToSetup).forEach(([pluginName, setUpFn]) => {
      if (editor.plugins.has(pluginName)) {
        try {
          setUpFn(editor);
        } catch (err) {
          console.error(`CKEditor: Error setting up ${pluginName} plugin `, err);
        }
      }
    });
  }

  function setUpWordCount(editor: ClassicEditor): void {
    const wordCountPlugin = editor.plugins.get('WordCount');

    if (wordsLimit || charsLimit) {
      wordCountPlugin.on('update', (_e, stats: WordCountPluginStats) => validateInputLength(stats));
    }

    wordCounterRef.current?.appendChild(wordCountPlugin.wordCountContainer);
  }

  function setUpImageUploadEditing(editor: ClassicEditor): void {
    const imageUploadEditingPlugin = editor.plugins.get('ImageUploadEditing');

    const setAltAttribute = (_e: any, { data, imageElement }: any) => {
      editor.model.change(writer => {
        writer.setAttribute('alt', data.alt, imageElement);
      });
    };

    imageUploadEditingPlugin.on('uploadComplete', setAltAttribute);
  }

  function setUpStrapiMediaLib(editor: ClassicEditor): void {
    const strapiMediaLibPlugin = editor.plugins.get('StrapiMediaLib') as StrapiMediaLibPlugin;
    strapiMediaLibPlugin.connect(toggleMediaLib);
  }

  function setUpStrapiUploadAdapter(editor: ClassicEditor): void {
    const StrapiUploadAdapterPlugin = editor.plugins.get(
      'StrapiUploadAdapter'
    ) as StrapiUploadAdapterPlugin;
    const token = getStoredToken();
    const { backendURL } = window.strapi;
    const config: StrapiUploadAdapterConfig = {
      uploadUrl: `${backendURL}/upload`,
      backendUrl: backendURL,
      headers: { Authorization: `Bearer ${token}` },
      responsive: window.SH_CKE.IS_UPLOAD_RESPONSIVE,
    };

    StrapiUploadAdapterPlugin.initAdapter(config);
  }
}
