import { toolbarEditorConfig } from "./base";

export const toolbarEditor = {
  toolbar: {
    field: {
      key: "toolbar",
      value: "toolbar",
      metadatas: {
        intlLabel: {
          id: "ckeditor.preset.toolbar.label",
          defaultMessage: "Toolbar version",
        },
      },
    },
    editorConfig: toolbarEditorConfig,
  },
};
