import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { InputProps } from '@strapi/strapi/admin';

import { type Preset, setUpLanguage, getPluginConfig } from '../config';
import cloneDeep from 'lodash/cloneDeep';

type EditorProviderBaseProps = Pick<
  InputProps,
  'name' | 'disabled' | 'placeholder' | 'hint' | 'label' | 'required'
> & {
  labelAction?: React.ReactNode;
  presetName: string;
  wordsLimit?: number;
  charsLimit?: number;
  isFieldLocalized: boolean;
  error?: string;
};

type EditorContextValue = EditorProviderBaseProps & {
  preset: Preset | null;
};

type EditorProviderProps = EditorProviderBaseProps & {
  children: React.ReactElement;
};

const EditorContext = createContext<EditorContextValue | null>(null);

export function useEditorContext(): EditorContextValue {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error('The useEditorContext hook must be used within the EditorProvider.');
  }

  return context;
}

export function EditorProvider({
  name,
  disabled,
  error,
  placeholder,
  hint,
  label,
  labelAction,
  required,
  presetName,
  wordsLimit,
  charsLimit,
  children,
  isFieldLocalized,
}: EditorProviderProps) {
  const [preset, setPreset] = useState<Preset | null>(null);

  useEffect(() => {
    (async () => {
      const { presets } = getPluginConfig();
      const currentPreset = cloneDeep(presets[presetName]);
      await setUpLanguage(currentPreset.editorConfig, isFieldLocalized);

      if (placeholder) {
        currentPreset.editorConfig.placeholder = placeholder;
      }

      setPreset(currentPreset);
    })();
  }, [presetName, placeholder, isFieldLocalized]);

  const EditorContextValue = useMemo(
    () => ({
      name,
      disabled,
      placeholder,
      hint,
      label,
      labelAction,
      required,
      presetName,
      preset,
      error,
      wordsLimit,
      charsLimit,
      isFieldLocalized,
    }),
    [
      name,
      disabled,
      placeholder,
      hint,
      label,
      labelAction,
      required,
      presetName,
      wordsLimit,
      charsLimit,
      preset,
      error,
      isFieldLocalized,
    ]
  );

  return <EditorContext.Provider value={EditorContextValue}>{children}</EditorContext.Provider>;
}
