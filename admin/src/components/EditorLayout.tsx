import React, { type ReactNode, useEffect, useReducer } from 'react';
import { Flex, IconButton, Modal } from '@strapi/design-system';
import { Expand, Collapse } from '@strapi/icons';
import { css, styled } from 'styled-components';

import type { EditorStyles } from '../config';
import { useEditorContext } from './EditorProvider';

export function EditorLayout({ children }: { children: ReactNode }) {
  const { error, preset } = useEditorContext();

  const [isExpandedMode, handleToggleExpand] = useReducer(prev => !prev, false);

  useEffect(() => {
    if (isExpandedMode) {
      document.body.classList.add('lock-body-scroll');
    }

    return () => {
      document.body.classList.remove('lock-body-scroll');
    };
  }, [isExpandedMode]);

  if (isExpandedMode) {
    return (
      <Modal.Root open={isExpandedMode} onOpenChange={handleToggleExpand}>
        <Modal.Content style={{ maxWidth: 'unset', width: 'unset' }}>
          <FullScreenBox height="90vh" width="90vw" background="neutral100">
            <EditorWrapper
              $presetStyles={preset?.styles}
              $isExpanded={isExpandedMode}
              $hasError={Boolean(error)}
              className="ck-editor__expanded"
            >
              {children}
              <CollapseButton label="Collapse" onClick={handleToggleExpand}>
                <Collapse />
              </CollapseButton>
            </EditorWrapper>
          </FullScreenBox>
        </Modal.Content>
      </Modal.Root>
    );
  }

  return (
    <EditorWrapper
      $presetStyles={preset?.styles}
      $isExpanded={isExpandedMode}
      $hasError={Boolean(error)}
    >
      {children}
      <ExpandButton label="Expand" onClick={handleToggleExpand}>
        <Expand />
      </ExpandButton>
    </EditorWrapper>
  );
}

const EditorWrapper = styled('div')<{
  $isExpanded: boolean;
  $hasError: boolean;
  $presetStyles?: EditorStyles;
}>`
  position: relative;
  width: 100%;

  ${({ $presetStyles, theme, $hasError = false, $isExpanded }) => css`
    height: ${$isExpanded ? '100%' : 'auto'};
    border-radius: ${theme.borderRadius};
    outline: none;
    box-shadow: 0;
    transition-property: border-color, box-shadow, fill;
    transition-duration: 0.2s;
    border: 1px solid ${$hasError ? theme.colors.danger600 : theme.colors.neutral200};
    border-radius: ${theme.borderRadius};

    &:focus-within {
      border: 1px solid ${$isExpanded ? theme.colors.neutral200 : theme.colors.primary600};
      border-color: ${$hasError && theme.colors.danger600};
      box-shadow: ${$hasError ? theme.colors.danger600 : theme.colors.primary600} 0px 0px 0px 2px;
    }

    ${$presetStyles}
  `}
`;

const ExpandButton = styled(IconButton)`
  position: absolute;
  bottom: 1.4rem;
  right: 1.2rem;
  z-index: 2;
  box-shadow: ${({ theme }) => theme.shadows.filterShadow};
`;

const CollapseButton = styled(IconButton)`
  position: absolute;
  bottom: 2.5rem;
  right: 1.2rem;
  z-index: 2;
  box-shadow: ${({ theme }) => theme.shadows.filterShadow};
`;

const FullScreenBox = styled(Flex)`
  max-width: var(--ck-editor-full-screen-box-max-width);
`;
