import React, { useEffect, useState } from 'react';
import { Box, Flex, IconButton, FocusTrap, Portal } from '@strapi/design-system';
import { Expand, Collapse } from '@strapi/icons';
import styled from 'styled-components';

export const EditorLayout = ({ children, presetStyles }) => {
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
              onClick={(e) => e.stopPropagation()}
              position="relative"
            >
              <Flex height="100%" alignItems="flex-start" direction="column">
                <EditorWrapper
                  $presetStyles={presetStyles}
                  className={isExpandedMode ? 'ck-editor__expanded' : ''}
                >
                  {children}
                  <CollapseButton
                    label="Collapse"
                    onClick={handleOnCollapse}
                  >
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
    <EditorWrapper $presetStyles={presetStyles}>
      {children}
      <ExpandButton label="Expand" onClick={handleToggleExpand}>
        <Expand />
      </ExpandButton>
    </EditorWrapper>
  );
};

const EditorWrapper = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;

  ${({ $presetStyles }) => $presetStyles}
`;

const Backdrop = styled(Flex)`
  // Background with 20% opacity
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
`