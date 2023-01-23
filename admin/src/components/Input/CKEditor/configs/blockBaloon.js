import { blockBaloonEditorConfig } from "./base";

export const blockBaloonEditor = {
  blockBaloon: {
    styles: `
          .ck-content{
            border-radius:4px !important;
          }
          .ck-sticky-panel{
            display:none !important;
          }
        `,
    field: {
      key: "blockBaloon",
      value: "blockBaloon",
      metadatas: {
        intlLabel: {
          id: "ckeditor.preset.blockBaloon.label",
          defaultMessage: "Block baloon version",
        },
      },
    },
    editorConfig: blockBaloonEditorConfig,
  },
};
