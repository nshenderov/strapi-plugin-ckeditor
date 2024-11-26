import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { type InputProps } from '@strapi/strapi/admin';

import type { CKEditorPreset } from 'src/types';
import { getConfiguredPreset } from '../config';
import { type CKEditorWordCountPluginStats } from './CKEReact';

type EditorContextBaseProps = Pick<
  InputProps,
  'name' | 'disabled' | 'placeholder' | 'hint' | 'label' | 'required'
> & {
  labelAction?: React.ReactNode;
  presetName: string;
  wordsLimit?: number;
  charsLimit?: number;
};

type EditorContextValue = EditorContextBaseProps & {
  preset: CKEditorPreset | null;
  error: string | null;
  validateInputLength: (stats: CKEditorWordCountPluginStats) => void;
};

type EditorContextProviderProps = EditorContextBaseProps & {
  fieldError: string | undefined;
  children: React.ReactElement;
};

const EditorContext = createContext<EditorContextValue | null>(null);

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
}: EditorContextProviderProps) {
  const [preset, setPreset] = useState(null);
  const [error, setError] = useState<string | null>(fieldError ?? null);

  useEffect(() => {
    (async () => {
      const currentPreset = await getConfiguredPreset(presetName);

      if (placeholder) {
        currentPreset.editorConfig.placeholder = placeholder;
      }

      setPreset(currentPreset);
    })();
  }, [presetName, placeholder]);

  useEffect(() => {
    setError(fieldError ?? null);
  }, [fieldError]);

  const validateInputLength = useCallback(
    (stats: CKEditorWordCountPluginStats) => {
      const maxWordErrorMsg = 'Max words limit is exceeded';
      const maxCharactersErrorMsg = 'Max characters limit is exceeded';

      const isWordLimitExceeded = !!wordsLimit && stats.words > wordsLimit;
      const isCharLimitExceeded = !!charsLimit && stats.characters > charsLimit;

      setError(prev => {
        if (isWordLimitExceeded) {
          return maxWordErrorMsg;
        }
        if (isCharLimitExceeded) {
          return maxCharactersErrorMsg;
        }
        if (prev && (prev === maxWordErrorMsg || prev === maxCharactersErrorMsg)) {
          return null;
        }
        return prev;
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
    ]
  );

  return <EditorContext.Provider value={EditorContextValue}>{children}</EditorContext.Provider>;
}

export function useEditorContext() {
  const context = useContext(EditorContext);
  if (!context) throw Error('useEditorAttributes can only be used inside EditorProvider');
  return context;
}
