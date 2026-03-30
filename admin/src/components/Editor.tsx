import React from 'react';
import { Field, Flex, Box, Loader } from '@strapi/design-system';
import { styled } from 'styled-components';

import { CKEReact } from './CKEReact';
import { EditorLayout } from './EditorLayout';
import { useGlobalStyles } from '../hooks/useGlobalStyles';
import { useEditorContext } from './EditorProvider';

export const Editor = React.forwardRef<{ focus: () => void }>((_, forwardedRef) => {
  const { name, hint, required, labelAction, label, error, preset } = useEditorContext();

  useGlobalStyles();

  return (
    <Field.Root id={name} name={name} error={error} hint={hint} required={required}>
      <Flex direction="column" alignItems="stretch" gap={1}>
        <Field.Label action={labelAction}>{label}</Field.Label>
        {preset ? (
          <EditorLayout>
            <CKEReact ref={forwardedRef} />
          </EditorLayout>
        ) : (
          <LoaderBox hasRadius background="neutral100">
            <Loader>Loading...</Loader>
          </LoaderBox>
        )}
        <Field.Hint />
        <Field.Error />
      </Flex>
    </Field.Root>
  );
});

const LoaderBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
`;
