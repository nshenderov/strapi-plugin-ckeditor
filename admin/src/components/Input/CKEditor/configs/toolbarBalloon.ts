import { toolbarBalloonEditorConfig } from "./base";

export const toolbarBalloonEditor = {
  toolbarBalloon: {
    field: {
      key: "toolbarBalloon",
      value: "toolbarBalloon",
      metadatas: {
        intlLabel: {
          id: "ckeditor.preset.toolbarBalloon.label",
          defaultMessage: "Toolbar balloon version",
        },
      },
    },
    editorConfig: toolbarBalloonEditorConfig,
  },
};
