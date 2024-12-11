import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { InputProps } from '@strapi/strapi/admin';

import { type Preset, setUpLanguage, getPluginConfig } from '../config';
import type { WordCountPluginStats } from './CKEReact';

type EditorProviderBaseProps = Pick<
  InputProps,
  'name' | 'disabled' | 'placeholder' | 'hint' | 'label' | 'required'
> & {
  labelAction?: React.ReactNode;
  presetName: string;
  wordsLimit?: number;
  charsLimit?: number;
  isFieldLocalized: boolean;
};

type EditorContextValue = EditorProviderBaseProps & {
  preset: Preset | null;
  error: string | null;
  validateInputLength: (stats: WordCountPluginStats) => void;
};

type EditorProviderProps = EditorProviderBaseProps & {
  fieldError: string | undefined;
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
  fieldError,
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
  const [error, setError] = useState<string | null>(fieldError ?? null);

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

  useEffect(() => {
    setError(fieldError ?? null);
  }, [fieldError]);

  const validateInputLength = useCallback(
    (stats: WordCountPluginStats): void => {
      const maxWordsErrMsg = 'Max words limit is exceeded';
      const maxCharsErrMsg = 'Max characters limit is exceeded';

      setError(prevErr => {
        const isWordLimitExceeded = wordsLimit && stats.words > wordsLimit;
        const isCharLimitExceeded = charsLimit && stats.characters > charsLimit;
        const isErrSet = prevErr && (prevErr === maxWordsErrMsg || prevErr === maxCharsErrMsg);

        if (isWordLimitExceeded) {
          return maxWordsErrMsg;
        }
        if (isCharLimitExceeded) {
          return maxCharsErrMsg;
        }
        if (isErrSet) {
          return null;
        }
        return prevErr;
      });
    },
    [wordsLimit, charsLimit]
  );

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
      validateInputLength,
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
      validateInputLength,
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
