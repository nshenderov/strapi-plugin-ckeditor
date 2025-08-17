import React, { useCallback, useEffect, useRef, useState, useImperativeHandle } from 'react';
import { useField } from '@strapi/strapi/admin';
import { Flex } from '@strapi/design-system';
import { styled, css } from 'styled-components';
import { ClassicEditor } from 'ckeditor5';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import 'ckeditor5/ckeditor5.css';

import { useEditorContext } from './EditorProvider';
import { getStoredToken, prefixFileUrlWithBackendUrl } from '../utils';
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

export const CKEReact = React.forwardRef<{ focus: () => void }>((_, forwardedRef) => {
  const [mediaLibVisible, setMediaLibVisible] = useState<boolean>(false);
  const [editorInstance, setEditorInstance] = useState<ClassicEditor | null>(null);
  const [isWordsMax, setIsWordsMax] = useState(false);
  const [isCharsMax, setIsCharsMax] = useState(false);

  const { name, disabled, preset, wordsLimit, charsLimit } = useEditorContext();
  const { onChange: fieldOnChange, value: fieldValue } = useField(name);

  const wordCounterRef = useRef<HTMLElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const onEditorReady = (editor: ClassicEditor): void => {
    setUpPlugins(editor);
    setEditorInstance(editor);
  };

  const onEditorChange = (_e: any, editor: ClassicEditor): void => {
    // Prevents updating the whole strapi state
    // on every input change by debouncing it
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    const data = editor.getData();

    debounceTimeout.current = setTimeout(() => {
      fieldOnChange(name, data);
      debounceTimeout.current = null;
    }, 300);
  };

  const toggleMediaLib = useCallback(() => setMediaLibVisible(prev => !prev), [setMediaLibVisible]);

  const handleChangeAssets = useCallback(
    (newElems: string): void => {
      if (!editorInstance) {
        throw new Error('The editor instance has not been initialized.');
      }
      const viewFragment = editorInstance.data.processor.toView(newElems);
      const modelFragment = editorInstance.data.toModel(viewFragment);
      editorInstance?.model.insertContent(modelFragment);
      toggleMediaLib();
    },
    [toggleMediaLib, editorInstance]
  );

  useEffect(() => {
    // A crutch that prevents strapi modals from closing
    // when ckeditor popup buttons are clicked
    const ckWrapper = document.querySelector<HTMLElement>('.ck-body-wrapper');
    const listener = ckWrapper?.addEventListener('pointerdown', e => e.stopPropagation(), true);
    return () => {
      listener && ckWrapper?.removeEventListener('pointerdown', listener);
    };
  }, [editorInstance]);

  useImperativeHandle(
    forwardedRef,
    () => ({
      focus() {
        editorInstance?.focus();
      },
    }),
    [editorInstance]
  );

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
      <WordCounter ref={wordCounterRef} $isWordsMax={isWordsMax} $isCharsMax={isCharsMax} />
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
          console.error(`Failed to set up the ${pluginName} plugin `, err);
        }
      }
    });
  }

  function setUpWordCount(editor: ClassicEditor): void {
    const wordCountPlugin = editor.plugins.get('WordCount');

    if (wordsLimit || charsLimit) {
      wordCountPlugin.on('update', (_e, stats: WordCountPluginStats) => validateInputLength(stats));
      const { words, characters } = wordCountPlugin;
      validateInputLength({ words, characters });
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
    const config: StrapiUploadAdapterConfig = {
      uploadUrl: prefixFileUrlWithBackendUrl('/upload'),
      headers: { Authorization: `Bearer ${token}` },
    };

    StrapiUploadAdapterPlugin.initAdapter(config);
  }

  function validateInputLength(stats: WordCountPluginStats): void {
    if (wordsLimit) {
      setIsWordsMax(stats.words > wordsLimit);
    }
    if (charsLimit) {
      setIsCharsMax(stats.characters > charsLimit);
    }
  }
});

const WordCounter = styled(Flex)<{ $isWordsMax: boolean; $isCharsMax: boolean }>`
  ${({ theme, $isWordsMax, $isCharsMax }) => css`
    .ck-word-count__words {
      color: ${$isWordsMax ? theme.colors.danger600 : theme.colors.neutral400};
    }
    .ck-word-count__characters {
      color: ${$isCharsMax ? theme.colors.danger600 : theme.colors.neutral400};
    }
  `}
`;
