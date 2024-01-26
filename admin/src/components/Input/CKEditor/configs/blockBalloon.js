import { blockBalloonEditorConfig } from "./base";

export const blockBalloonEditor = {
  blockBalloon: {
    styles: `
          .ck-content{
            border-radius:4px !important;
          }
          .ck-sticky-panel{
            display:none !important;
          }
        `,
    field: {
      key: "blockBalloon",
      value: "blockBalloon",
      metadatas: {
        intlLabel: {
          id: "ckeditor.preset.blockBalloon.label",
          defaultMessage: "Block balloon version",
        },
      },
    },
    editorConfig: blockBalloonEditorConfig,
  },
};
