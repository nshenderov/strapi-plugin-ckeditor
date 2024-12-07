import { css } from 'styled-components';

const editorSizes = css`
  :root {
    --ck-editor-full-screen-box-max-width: 1700px;
  }

  .ck {
    --ck-editor-max-width: 1366px;
    --ck-editor-min-height: 200px;
    --ck-editor-max-height: 500px;
  }
`;

export const additional = css`
  ${editorSizes}
`;
