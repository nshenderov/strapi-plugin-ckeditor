import React, { useRef, useState } from 'react';
import { useField } from '@strapi/strapi/admin';
import { Flex } from '@strapi/design-system';
import { ClassicEditor } from 'ckeditor5';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import 'ckeditor5/ckeditor5.css';

import { useEditorContext } from './EditorProvider';
import { getStoredToken } from '../../../utils/localStorage';
import MediaLib from './MediaLib';
import type {
  StrapiMediaLibPlugin,
  StrapiUploadAdapterConfig,
  StrapiUploadAdapterPlugin,
} from '../plugins';

export type CKEditorWordCountPluginStats = {
  words: number;
  characters: number;
};

export default function CKEReact() {
  const [mediaLibVisible, setMediaLibVisible] = useState<boolean>(false);
  const [editorInstance, setEditorInstance] = useState<ClassicEditor | null>(null);

  const { name, disabled, error, preset, wordsLimit, charsLimit, validateInputLength } =
    useEditorContext();
  const { onChange: fieldOnChange, value: fieldValue } = useField(name);

  const wordCounterRef = useRef<HTMLDivElement>(null);

  const toggleMediaLib = () => setMediaLibVisible(prev => !prev);

  const pluginSetups = {
    WordCount: setUpWordCount,
    ImageUploadEditing: setUpImageUploadEditing,
    StrapiMediaLib: setUpStrapiMediaLib,
    StrapiUploadAdapter: setUpStrapiUploadAdapter,
  };

  const onEditorReady = (editor: ClassicEditor) => {
    setUpPlugins(editor);
    setEditorInstance(editor);
  };

  const onEditorChange = (_e, editor: ClassicEditor) => {
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
        config={preset?.editorConfig}
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

  function setUpPlugins(editor: ClassicEditor) {
    Object.entries(pluginSetups).forEach(([pluginName, setupFn]) => {
      if (editor.plugins.has(pluginName)) {
        try {
          setupFn(editor);
        } catch (err) {
          console.error(`Error setting up ${pluginName} plugin:`, err);
        }
      }
    });
  }

  function setUpWordCount(editor: ClassicEditor) {
    const wordCountPlugin = editor.plugins.get('WordCount');

    if (wordsLimit || charsLimit) {
      wordCountPlugin.on('update', (_e, stats: CKEditorWordCountPluginStats) =>
        validateInputLength(stats)
      );

      validateInputLength({
        words: wordCountPlugin.words,
        characters: wordCountPlugin.characters,
      });
    }

    wordCounterRef.current?.appendChild(wordCountPlugin.wordCountContainer);
  }

  function setUpImageUploadEditing(editor: ClassicEditor) {
    const imageUploadEditingPlugin = editor.plugins.get('ImageUploadEditing');

    const setAltAttribute = (_e, { data, imageElement }) => {
      editor.model.change(writer => {
        writer.setAttribute('alt', data.alt, imageElement);
      });
    };

    imageUploadEditingPlugin.on('uploadComplete', setAltAttribute);
  }

  function setUpStrapiMediaLib(editor: ClassicEditor) {
    const strapiMediaLibPlugin = editor.plugins.get('StrapiMediaLib') as StrapiMediaLibPlugin;
    strapiMediaLibPlugin.connect(toggleMediaLib);
  }

  function setUpStrapiUploadAdapter(editor: ClassicEditor) {
    const StrapiUploadAdapterPlugin = editor.plugins.get(
      'StrapiUploadAdapter'
    ) as StrapiUploadAdapterPlugin;
    const token = getStoredToken();
    // @ts-ignore
    const backendURL: string | undefined = globalThis.strapi.backendURL;
    const config: StrapiUploadAdapterConfig = {
      uploadUrl: `${backendURL}/upload`,
      backendUrl: backendURL,
      headers: { Authorization: 'Bearer ' + token },
      responsive: globalThis.SH_CKE_UPLOAD_ADAPTER_IS_RESPONSIVE,
    };

    StrapiUploadAdapterPlugin.initAdapter(config);
  }

  function handleChangeAssets(newElems) {
    if (!editorInstance) {
      throw Error('Editor instance is not initialized');
    }

    const viewFragment = editorInstance.data.processor.toView(newElems);
    const modelFragment = editorInstance.data.toModel(viewFragment);
    editorInstance?.model.insertContent(modelFragment);

    toggleMediaLib();
  }
}
