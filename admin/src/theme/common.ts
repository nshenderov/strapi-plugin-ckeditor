import { css } from 'styled-components';

const reset = css`
  ${({ theme }) => css`
    .ck {
      --ck-color-image-caption-background: hsl(0, 0%, 97%);
      --ck-color-image-caption-text: hsl(0, 0%, 20%);
      --ck-color-mention-background: hsla(341, 100%, 30%, 0.1);
      --ck-color-mention-text: hsl(341, 100%, 30%);
      --ck-color-table-caption-background: hsl(0, 0%, 97%);
      --ck-color-table-caption-text: hsl(0, 0%, 20%);
      --ck-highlight-marker-blue: hsl(201, 97%, 72%);
      --ck-highlight-marker-green: hsl(120, 93%, 68%);
      --ck-highlight-marker-pink: hsl(345, 96%, 73%);
      --ck-highlight-marker-yellow: hsl(60, 97%, 73%);
      --ck-highlight-pen-green: hsl(112, 100%, 27%);
      --ck-highlight-pen-red: hsl(0, 85%, 49%);
      --ck-image-style-spacing: 1.5em;
      --ck-inline-image-style-spacing: calc(var(--ck-image-style-spacing) / 2);
      --ck-todo-list-checkmark-size: 16px;
      --ck-border-radius: ${theme.borderRadius};

      font-size: ${theme.fontSizes[2]};
    }

    .ck.ck-reset.ck-dropdown__panel.ck-dropdown__panel_sw.ck-dropdown__panel-visible {
      border-radius: var(--ck-border-radius);
    }

    .ck-editor__main {
      --ck-font-face: 'Source Sans Pro', system-ui, Roboto, 'Helvetica Neue', 'Helvetica', Arial,
        sans-serif;

      color: var(--ck-color-editor-base-text);
      font-family: var(--ck-font-face);

      * {
        font: revert;
        margin: revert;
      }

      h1 {
        font-size: 2.3em;
      }

      h2 {
        font-size: 1.84em;
      }

      h3 {
        font-size: 1.48em;
      }

      h4 {
        font-size: 1.22em;
      }

      h5 {
        font-size: 1.06em;
      }

      h6 {
        font-size: 1em;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        line-height: 1.2em;
        padding-top: 0.8em;
        margin-bottom: 0.4em;
      }

      blockquote,
      ol,
      p,
      ul {
        font-size: 1em;
        line-height: 1.6em;
        padding-top: 0.2em;
        margin-bottom: var(--ck-spacing-large);
      }

      figcaption {
        background-color: var(--ck-color-image-caption-background);
        caption-side: bottom;
        color: var(--ck-color-image-caption-text);
        display: table-caption;
        font-size: 0.75em;
        outline-offset: -1px;
        padding: 0.6em;
        word-break: break-word;
      }

      a {
        text-decoration: none;
        color: #1b3af2;
      }

      a:hover {
        text-decoration: underline;
      }

      .table {
        margin: 0;
      }

      ul.todo-list {
        list-style: none;
        margin: revert;
        color: revert;
        font-family: revert;
        margin-left: 2rem;
      }

      ul,
      ol {
        list-style: initial;
        margin-left: 2rem;
      }

      ol {
        list-style: decimal;
      }

      sub {
        vertical-align: sub;
      }

      sup {
        vertical-align: super;
      }
    }
  `}
`;

const plugin = css`
  ${({ theme }) => css`
    .ck {
      scrollbar-width: thin;
      scrollbar-color: ${`${theme.colors.neutral300} ${theme.colors.neutral150}`};

      @-moz-document url-prefix() {
        scrollbar-width: auto;
      }
    }

    .ck.ck-content.ck-editor__editable {
      line-height: initial;
      height: auto;
      min-height: var(--ck-editor-min-height);
      border: none !important;
      max-width: var(--ck-editor-max-width) !important;
      margin: 0 auto;
      &.ck-focused:not(.ck-editor__nested-editable) {
        box-shadow: none;
      }
    }

    .ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content {
      border: none !important;
    }

    .ck.ck-editor__main {
      min-height: var(--ck-editor-min-height) !important;
      max-height: var(--ck-editor-max-height) !important;
      overflow-y: auto;
      overflow-x: hidden;
      border-top: 1px solid var(--ck-color-base-border);
      border-bottom-left-radius: var(--ck-border-radius);
      border-bottom-right-radius: var(--ck-border-radius);
    }

    .ck .ck-source-editing-area,
    .ck .ck-source-editing-area textarea {
      color: var(--ck-color-text);
      background-color: var(--ck-color-base-background);
      border: none !important;
      box-shadow: none !important;
      min-height: var(--ck-editor-min-height);
      max-width: var(--ck-editor-max-width);
      margin: 0 auto;
    }

    .ck .ck-block-toolbar-button {
      min-width: 0 !important;
      min-height: 0 !important;
      width: 20px !important;
      height: 25px !important;
      margin-left: -2px !important ;

      & svg {
        color: var(--ck-color-text) !important;
        position: absolute;
        width: 20px;
        height: 20px;
      }
    }

    .ck-word-count {
      display: flex;
      position: absolute;
      justify-content: end;
      gap: 0.3rem;
      font-size: 1rem;
      font-weight: 500;
      text-transform: lowercase;
      z-index: 2;
      bottom: -2rem;
      right: 0;
    }

    .ck[dir='rtl'] {
      .ck-block-toolbar-button {
        margin-left: 2px !important ;
      }
      & + div {
        justify-content: flex-start;
        & > .ck-word-count {
          & > div:first-child {
            order: 2;
          }
          & > div:last-child {
            order: 1;
          }
        }
      }
    }

    .ck.ck-editor__editable > .ck-placeholder::before {
      color: var(--ck-color-editor-base-text);
      opacity: 0.65;
    }

    .ck.ck-powered-by > a > svg > path:first-child {
      fill: ${theme.colors.neutral800};
    }
  `}
`;

const expanded = css`
  .ck-editor__expanded {
    max-width: var(--ck-editor-full-screen-box-max-width);

    .ck.ck-content.ck-editor__editable,
    .ck-source-editing-area {
      min-height: 100% !important;
      height: auto !important;
      max-height: none !important;
      border-radius: var(--ck-border-radius) !important;
      border: 1px solid var(--ck-color-base-border) !important;
      overflow: auto !important;
      box-sizing: border-box;
    }

    .ck.ck-editor__top {
      box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.2);
      z-index: var(--ck-z-panel);
    }

    .ck.ck-editor {
      display: flex;
      flex-direction: column;
    }

    .ck.ck-editor,
    .ck.ck-content,
    .ck.ck-editor__main {
      height: calc(100% - 0px) !important;
    }

    .ck.ck-editor__main {
      min-height: none !important;
      max-height: none !important;
      overflow-y: scroll !important;
      padding: calc(2 * var(--ck-spacing-large));
    }

    .ck-word-count {
      bottom: 0.3rem;
      right: 1.2rem;
    }
  }

  .ck-body-wrapper {
    pointer-events: all;
  }
`;

export const common = css`
  ${reset}
  ${plugin}
  ${expanded}
`;
