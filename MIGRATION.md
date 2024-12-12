<h1 align="center">Migration guides</h1>

### Navigation

- [From v4 to v5](#4to5)
- [From v3 to v4](#3to4)
- [From v2 to v3](#2to3)
- [From v1 to v2](#1to2)

## <a id="4to5"></a>From v4 to v5

Version 5 introduces several major breaking changes that will affect all users:

⚠️ A new configuration method has been introduced.

⚠️ The `default` preset has been renamed to `defaultHtml`.

To facilitate a smooth transition, guidance is provided for the following scenarios:

- [No custom configuration](#no-custom-configuration)
- [Custom configuration](#custom-configuration)
- [Locally modified fork of the plugin](#locally-modified-fork)

#### <a id="no-custom-configuration"></a>No custom configuration:

If you don't have custom plugin configuration, you only need to update the existing fields to use
the new default HTML preset to avoid missing preset error. There are two options how to solve it:

- **Option1 (Preferable)**: Update the fields in the Content-Type Builder or modify your shemas
  manually to use `defaultHtml` preset instead of `default`:

```js
// api/type_name/content-types/type_name/schema.json

"name_of_field": {
  "type": "customField",
  "options": {
    "preset": "default", // -> "defaultHtml"
  },
  "customField": "plugin::ckeditor5.CKEditor"
},
```

- **Option2**: Apply custom plugin configuration. Set the name in the `defaultHtmlPreset` to
  `default` and add it to the `presets` array:

```ts
// src/admin/app.[js|tsx]

import { setPluginConfig, defaultHtmlPreset } from '@_sh/strapi-plugin-ckeditor';

export default {
  register() {
    defaultHtmlPreset.name = 'default';
    setPluginConfig({ presets: [defaultHtmlPreset] });
  },
};
```

#### <a id="custom-configuration">Custom configuration:

In addition to the steps mentioned in the previous section:

⚠️ The `presets` property is now an array of objects of type `Preset` instead of an object.

⚠️ The `field` property in a `Preset` has been replaced by `name` and `description`.

⚠️ The plugin no longer exposes any CKEditor packages to the global object, you must import them
directly.

⚠️ The provided `theme` and `presets` are no longer merged with the defaults, instead, overwrite them.

⚠️ The style plugin and material color palette have been removed from the default preset.

⚠️ The plugin's theme has been updated to use Strapi's theme variables.

To transition to the new configuration method, copy and paste your configuration from the existing
configuration file into `/src/admin/app.js|tsx`:

(Alternatively you can move you configuration file to `/src/admin/`, export the configuration,
and then import it in `admin.js|tsx`)

**Before (v4):**

```ts
// config/ckedtior.js

const CKEConfig = () => ({
  dontMergePresets: true,
  presets: {
    default: {
      editorConfig: {
        toolbar: ['heading', '|', 'bold', 'italic', '|', 'strapiMediaLib', '|', 'undo', 'redo'],
      },
    },
    myCustomPreset: {
      field: {
        key: 'myCustomPreset',
        value: 'myCustomPreset',
        metadatas: {
          intlLabel: {
            id: 'ckeditor5.preset.myCustomPreset.label',
            defaultMessage: 'My custom preset',
          },
        },
      },
      editorConfig: {
        plugins: [
          globalThis.SH_CKE.Autoformat,
          globalThis.SH_CKE.Bold,
          globalThis.SH_CKE.Italic,
          globalThis.SH_CKE.Essentials,
          globalThis.SH_CKE.Heading,
          globalThis.SH_CKE.StrapiMediaLib,
          globalThis.SH_CKE.StrapiUploadAdapter,
          //...
        ],
        toolbar: ['heading', '|', 'bold', 'italic', '|', 'strapiMediaLib', '|', 'undo', 'redo'],
        //...
      },
    },
  },
  // theme: {},
});
```

**Now (v5):**

<details>
  <summary>app.js</summary>

```ts
// src/admin/app.js

import { Autoformat, Bold, Italic, Essentials, Heading } from 'ckeditor5';

import {
  setPluginConfig,
  defaultHtmlPreset,
  StrapiMediaLib,
  StrapiUploadAdapter,
} from '@_sh/strapi-plugin-ckeditor';

const CKEConfig = () => ({
  presets: [
    {
      ...defaultHtmlPreset,

      /**
       * If you use default preset and haven't updated your schemas to replace
       * the `default` preset with `defaultHtml`, you can change `name`
       * in defaultHtmlPreset to 'default' to avoid missing preset error.
       */
      // name: 'default',

      editorConfig: {
        ...defaultHtmlPreset.editorConfig,
        toolbar: ['heading', '|', 'bold', 'italic', '|', 'strapiMediaLib', '|', 'undo', 'redo'],
      },
    },
    {
      name: 'myCustomPreset',
      description: 'My custom preset',
      editorConfig: {
        licenseKey: 'GPL',
        plugins: [
          Autoformat,
          Bold,
          Italic,
          Essentials,
          Heading,
          StrapiMediaLib,
          StrapiUploadAdapter,
          //...
        ],
        toolbar: ['heading', '|', 'bold', 'italic', '|', 'strapiMediaLib', '|', 'undo', 'redo'],
        //...
      },
    },
  ],
  // theme: {},
});

export default {
  register() {
    const myConfig = CKEConfig();
    setPluginConfig(myConfig);
  },
};
```

</details>

<details>
  <summary>app.tsx</summary>

```ts
// src/admin/app.tsx

import { Autoformat, Bold, Italic, Essentials, Heading } from 'ckeditor5';

import {
  type PluginConfig,
  setPluginConfig,
  defaultHtmlPreset,
  StrapiMediaLib,
  StrapiUploadAdapter,
} from '@_sh/strapi-plugin-ckeditor';

const CKEConfig = (): PluginConfig => ({
  presets: [
    {
      ...defaultHtmlPreset,

      /**
       * If you use default preset and haven't updated your schemas to replace
       * the `default` preset with `defaultHtml`, you can change `name`
       * in defaultHtmlPreset to 'default' to avoid missing preset error.
       */
      // name: 'default',

      editorConfig: {
        ...defaultHtmlPreset.editorConfig,
        toolbar: ['heading', '|', 'bold', 'italic', '|', 'strapiMediaLib', '|', 'undo', 'redo'],
      },
    },
    {
      name: 'myCustomPreset',
      description: 'My custom preset',
      editorConfig: {
        licenseKey: 'GPL',
        plugins: [
          Autoformat,
          Bold,
          Italic,
          Essentials,
          Heading,
          StrapiMediaLib,
          StrapiUploadAdapter,
          //...
        ],
        toolbar: ['heading', '|', 'bold', 'italic', '|', 'strapiMediaLib', '|', 'undo', 'redo'],
        //...
      },
    },
  ],
  // theme: {},
});

export default {
  register() {
    const myConfig = CKEConfig();
    setPluginConfig(myConfig);
  },
};
```

</details>

#### <a id="locally-modified-fork">Locally modified fork of the plugin:

The guidance provided in the previous two sections likely applies to your case as well.

Additionally:

⚠️ The plugin has been migrated to TypeScript.

⚠️ The codebase has been significantly refactored.

⚠️ Several new features have been introduced, such as fullscreen option.

These changes will likely impact your setup. Please review the updated codebase.

## <a id="3to4"></a>From v3 to v4

- The new version introduces support for Strapi v5 and is incompatible with Strapi v4. You will need to update your Strapi project to version 5 before upgrading.

- The plugin development process has changed. Please refer to the updated contribution guide for more information.

## <a id="2to3"></a>From v2 to v3

- The default editor configurations (toolbar, toolbarBalloon, blockBalloon) have been removed and now there is only one preset by default. You will need to update your fields in the Content-Type Builder.

- Config file extension has changed from `.txt` to `.js` or `.ts`
- Configuration object properties have been renamed:
  - `configsOverwrite` -> `dontMergePresets`
  - `themeOverwrite` -> `dontMergeTheme`
  - `configs` -> `presets`
- From v3 instead of globalThis.CKEditorConfig = {..}, the config file must define a function called CKEConfig that returns the configuration object.

Example of the new configuration file:

<details>
   <summary><b>ckeditor.js</b></summary>

```js
const CKEConfig = () => ({
  presets: {
    myCustomPreset: {
      field: {
        key: 'myCustomPreset',
        value: 'myCustomPreset',
        metadatas: {
          intlLabel: {
            id: 'ckeditor5.preset.myCustomPreset.label',
            defaultMessage: 'My custom preset',
          },
        },
      },
      editorConfig: {
        plugins: [
          globalThis.SH_CKE.Autoformat,
          globalThis.SH_CKE.Bold,
          globalThis.SH_CKE.Italic,
          globalThis.SH_CKE.Essentials,
          globalThis.SH_CKE.Heading,
          globalThis.SH_CKE.Image,
          globalThis.SH_CKE.ImageCaption,
          globalThis.SH_CKE.ImageStyle,
          globalThis.SH_CKE.ImageToolbar,
          globalThis.SH_CKE.ImageUpload,
          globalThis.SH_CKE.Indent,
          globalThis.SH_CKE.Link,
          globalThis.SH_CKE.List,
          globalThis.SH_CKE.Paragraph,
          globalThis.SH_CKE.PasteFromOffice,
          globalThis.SH_CKE.Table,
          globalThis.SH_CKE.TableToolbar,
          globalThis.SH_CKE.TableColumnResize,
          globalThis.SH_CKE.TableCaption,
          globalThis.SH_CKE.StrapiMediaLib,
          globalThis.SH_CKE.StrapiUploadAdapter,
        ],
        toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'strapiMediaLib',
          'insertTable',
          '|',
          'undo',
          'redo',
        ],
        heading: {
          options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
          ],
        },
        image: {
          toolbar: [
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            '|',
            'toggleImageCaption',
            'imageTextAlternative',
          ],
        },
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', '|', 'toggleTableCaption'],
        },
      },
    },
  },
});
```

</details>

## <a id="1to2"></a>From v1 to v2

- You will need to update Strapi to version v4.4.x for plugin v2.0.x, or to v4.13.0+ for v2.1.x.

- Starting with v2, the plugin uses the Custom Field API, so you'll need to manually update your schema.

- The plugin configuration should be defined in /config/ckeditor.txt from v2 onward. [Please refer to the v2 configuration guide for details.](https://github.com/nshenderov/strapi-plugin-ckeditor/blob/e782475f54b8a50a04f55275c89ef5bf61a15745/README.md?plain=1#L54)
