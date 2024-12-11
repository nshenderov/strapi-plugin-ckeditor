import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { InputProps } from '@strapi/strapi/admin';

import { type Preset, setUpLanguage, getPluginConfig } from '../config';

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
  if (!context) throw Error('useEditorAttributes can only be used inside EditorProvider');
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
      const currentPreset = clonePreset(presets[presetName]);
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

function clonePreset(preset: Preset): Preset {
  const clonedPreset = {
    ...preset,
    editorConfig: {
      ...preset.editorConfig,
    },
  };

  Object.entries(clonedPreset.editorConfig).forEach(([key, val]) => {
    if (val && typeof val === 'object' && Object.getPrototypeOf(val) === Object.prototype) {
      // @ts-ignore
      clonedPreset.editorConfig[key] = { ...val };
    }
  });

  return clonedPreset;
}
