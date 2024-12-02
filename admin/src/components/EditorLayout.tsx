import React, { type ReactNode, useEffect, useState } from 'react';
import { Box, Flex, IconButton, FocusTrap, Portal } from '@strapi/design-system';
import { Expand, Collapse } from '@strapi/icons';
import { css, styled } from 'styled-components';

import type { Styles } from 'src/config';
import { useEditorContext } from './EditorProvider';

export function EditorLayout({ children }: { children: ReactNode }) {
  const { error, preset } = useEditorContext();

  const [isExpandedMode, setIsExpandedMode] = useState(false);

  const handleToggleExpand = () => setIsExpandedMode(true);
  const handleOnCollapse = () => setIsExpandedMode(false);

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
      <Portal role="dialog" aria-modal={false}>
        <FocusTrap onEscape={handleOnCollapse}>
          <Backdrop
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={4}
            justifyContent="center"
            onClick={handleOnCollapse}
          >
            <FullScreenBox
              background="neutral100"
              hasRadius
              shadow="popupShadow"
              overflow="hidden"
              width="90%"
              height="90%"
              onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
              position="relative"
            >
              <Flex height="100%" alignItems="flex-start" direction="column">
                <EditorWrapper
                  $presetStyles={preset?.styles}
                  $isExpanded={isExpandedMode}
                  $hasError={Boolean(error)}
                  className="ck-editor__expanded"
                >
                  {children}
                  <CollapseButton label="Collapse" onClick={handleOnCollapse}>
                    <Collapse />
                  </CollapseButton>
                </EditorWrapper>
              </Flex>
            </FullScreenBox>
          </Backdrop>
        </FocusTrap>
      </Portal>
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
  $presetStyles?: Styles;
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

const Backdrop = styled(Flex)`
  background: ${({ theme }) => `${theme.colors.neutral800}1F`};
`;

const ExpandButton = styled(IconButton)`
  position: absolute;
  bottom: 1.4rem;
  right: 1.2rem;
  z-index: 2;
`;

const CollapseButton = styled(IconButton)`
  position: absolute;
  bottom: 2.5rem;
  right: 1.2rem;
  z-index: 2;
`;

const FullScreenBox = styled(Box)`
  max-width: var(--ck-editor-full-screen-box-max-width);
`;
