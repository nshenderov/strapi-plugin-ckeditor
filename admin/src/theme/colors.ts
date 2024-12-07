import { css } from 'styled-components';

export const colors = css`
  ${({ theme }) => css`
    :root {
      /* -- Generic colors ---------------------------------------------------------------------- */

      --ck-color-focus-outer-shadow: ${theme.colors.primary600}1F !important;
      --ck-color-focus-disabled-shadow: ${theme.colors.primary200} !important;
      --ck-focus-ring: 1px solid ${theme.colors.primary600}9F !important;
      --ck-color-button-default-hover-background: ${theme.colors.primary100} !important;
    }

    .ck {
      /* -- Generic colors ---------------------------------------------------------------------- */

      --ck-color-base-focus: ${theme.colors.primary200};
      --ck-color-base-active: ${theme.colors.primary500}8F;
      --ck-color-base-active-focus: ${theme.colors.primary600};
      --ck-color-editor-base-text: ${theme.colors.neutral800};
      --ck-color-base-border: ${theme.colors.neutral200};
      --ck-color-base-background: ${theme.colors.neutral0};
      --ck-custom-foreground: ${theme.colors.neutral200};
      --ck-color-base-foreground: var(--ck-color-base-background);
      --ck-color-focus-border: ${theme.colors.primary500};
      --ck-color-text: ${theme.colors.neutral800};
      --ck-custom-white: hsl(0, 0%, 100%);

      /* -- Buttons ----------------------------------------------------------------------------- */

      --ck-color-button-default-background: var(--ck-color-base-background);
      --ck-color-button-default-hover-background: ${theme.colors.primary100};
      --ck-color-button-default-active-background: ${theme.colors.primary100};
      --ck-color-button-default-active-shadow: ${theme.colors.primary100};
      --ck-color-button-default-disabled-background: var(--ck-color-base-background);

      --ck-color-button-on-color: ${theme.colors.primary600};
      --ck-color-button-on-background: ${theme.colors.primary100};
      --ck-color-button-on-hover-background: ${theme.colors.primary200};
      --ck-color-button-on-active-background: ${theme.colors.primary100};
      --ck-color-button-on-disabled-background: var(--ck-custom-foreground);
      --ck-color-button-on-active-shadow: ${theme.colors.primary200};

      --ck-color-button-action-background: ${theme.colors.success500}E5;
      --ck-color-button-action-hover-background: ${theme.colors.success500}F5;
      --ck-color-button-action-active-background: ${theme.colors.success500};
      --ck-color-button-action-disabled-background: ${theme.colors.success500}99;
      --ck-color-button-action-text: var(--ck-custom-white);

      --ck-color-switch-button-off-background: ${theme.colors.neutral400};
      --ck-color-switch-button-off-hover-background: ${theme.colors.neutral500};
      --ck-color-switch-button-on-background: var(--ck-color-button-action-background);
      --ck-color-switch-button-on-hover-background: var(--ck-color-button-action-hover-background);

      --ck-color-button-save: ${theme.colors.success500};
      --ck-color-button-cancel: ${theme.colors.danger500};

      --ck-color-split-button-hover-background: var(--ck-color-button-default-hover-background);
      --ck-color-split-button-hover-border: var(--ck-custom-foreground);

      /* -- Dropdown ---------------------------------------------------------------------------- */

      --ck-color-dropdown-panel-background: var(--ck-color-base-background);
      --ck-color-dropdown-panel-border: var(--ck-custom-foreground);

      /* -- Input ------------------------------------------------------------------------------- */

      --ck-color-input-background: var(--ck-color-base-background);
      --ck-color-input-border: var(--ck-color-base-border);
      --ck-color-input-text: var(--ck-color-editor-base-text);

      --ck-color-input-disabled-background: ${theme.colors.neutral100};
      --ck-color-input-disabled-border: ${theme.colors.neutral150};
      --ck-color-input-disabled-text: ${theme.colors.neutral400};

      --ck-color-labeled-field-label-background: var(--ck-color-base-background);

      /* -- List -------------------------------------------------------------------------------- */

      --ck-color-list-background: var(--ck-color-base-background);
      --ck-color-list-button-hover-background: ${theme.colors.primary100};
      --ck-color-list-button-on-background: var(--ck-color-base-active);
      --ck-color-list-button-on-background-focus: var(--ck-color-base-active-focus);

      /* -- Panel ------------------------------------------------------------------------------- */

      --ck-color-panel-background: var(--ck-color-base-background);
      --ck-color-panel-border: var(--ck-color-base-border);

      --ck-style-panel-button-label-background: ${theme.colors.neutral100};
      --ck-style-panel-button-hover-label-background: ${theme.colors.neutral150};
      --ck-style-panel-button-hover-border-color: var(--ck-color-base-border);

      /* -- Toolbar ----------------------------------------------------------------------------- */

      --ck-color-toolbar-background: var(--ck-color-base-background);
      --ck-color-toolbar-border: var(--ck-color-base-border);

      /* -- Tooltip ----------------------------------------------------------------------------- */

      --ck-color-tooltip-background: ${theme.colors.neutral800};
      --ck-color-tooltip-text: ${theme.colors.neutral100};

      /* -- Image ------------------------------------------------------------------------------- */

      --ck-color-image-caption-background: ${theme.colors.neutral100};
      --ck-color-image-caption-text: ${theme.colors.neutral800};

      /* -- Widget ------------------------------------------------------------------------------ */

      --ck-color-widget-blurred-border: ${theme.colors.neutral400};
      --ck-color-widget-hover-border: ${theme.colors.neutral300};
      --ck-color-widget-editable-focus-background: ${theme.colors.neutral150};
      --ck-color-widget-type-around-button-active: var(--ck-color-focus-border);
      --ck-color-widget-type-around-button-hover: ${theme.colors.neutral300};

      /* -- Link -------------------------------------------------------------------------------- */

      --ck-color-link-fake-selection: ${theme.colors.primary200};
      --ck-color-link-selected-background: ${theme.colors.primary200};

      /* -- Dialog ------------------------------------------------------------------------------ */

      --ck-color-dialog-background: var(--ck-color-base-background);
      --ck-color-dialog-form-header-border: var(--ck-color-base-border);

      /* -- PoweredBy --------------------------------------------------------------------------- */

      --ck-powered-by-background: transparrent;
    }
  `}
`;
