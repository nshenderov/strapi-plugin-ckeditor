import { type ReactNode, useEffect, useState } from 'react';
import { Flex, IconButton, Modal } from '@strapi/design-system';
import { Expand, Collapse } from '@strapi/icons';
import { css, styled } from 'styled-components';

import type { EditorStyles } from '../config';
import { useEditorContext } from './EditorProvider';

export function EditorLayout({ children }: { children: ReactNode }) {
  const { error, preset } = useEditorContext();

  const [isExpandedMode, setIsExpandedMode] = useState(false);

  const handleToggleExpand = (open: boolean) => {
    if (open) {
      setTimeout(() => {
        // Move ckeditor popups wrapper into the radix modal
        // so that clicking them doesn’t close the modal
        // otherwise, they’re treated as outside clicks and the modal closes
        const ckPopupsWrapper = document.querySelector('.ck-body-wrapper');
        const ckEditorModal = document.getElementById('ck-editor-modal');

        if (ckPopupsWrapper && ckEditorModal) {
          ckEditorModal.appendChild(ckPopupsWrapper);
        }

        document.querySelector<HTMLElement>('.ck-editor__expanded .ck-editor__editable')?.focus();
      }, 0);
    } else {
      // On close, move the wrapper back before it gets unmounted
      // so other editors on the page don’t lose their reference
      const ckPopupsWrapper = document.querySelector('.ck-body-wrapper');

      if (ckPopupsWrapper) {
        document.body.appendChild(ckPopupsWrapper);
      }
    }

    setIsExpandedMode(open);
  };

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
        <Content id="ck-editor-modal">
          <Flex
            height="90dvh"
            width="90dvw"
            maxWidth="100%"
            direction="column"
            alignItems="flex-start"
            background="neutral100"
          >
            <EditorWrapper
              $presetStyles={preset?.styles}
              $isExpanded={isExpandedMode}
              $hasError={Boolean(error)}
              className="ck-editor__expanded"
            >
              {children}

              <CollapseButton
                tabIndex="-1"
                label="Collapse"
                onClick={() => handleToggleExpand(false)}
              >
                <Collapse />
              </CollapseButton>
            </EditorWrapper>
          </Flex>
        </Content>
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
      <ExpandButton label="Expand" onClick={() => handleToggleExpand(true)}>
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

const Content = styled(Modal.Content)`
  max-width: var(--ck-editor-full-screen-box-max-width);
  width: unset;
  overflow: visible;
`;
