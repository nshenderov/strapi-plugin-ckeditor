<p align="center">
  <img src="https://raw.githubusercontent.com/nshenderov/strapi-plugin-ckeditor/master/assets/ckeditor5_2_0.png" width="700" />
</p>

<h1 align="center">CKEditor 5 for Strapi</h1>

<p align="center">Integrates CKEditor 5 into your Strapi project as a fully customizable custom field. (Unofficial integration)</p>

## 👋 Get Started

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [Requirements](#requirements)

## <a id="features"></a>✨ Features

- **Media library integration**
- **Responsive images support**
- **Strapi theme switching support**
- **Supports custom styles for the editor**
- **Supports i18n and different UI translations**
- **A few predefined, modifiable editor configurations**
- **Allows custom editor configrations**
- **Plugins extensibility**

<p align="right">
    <a href="https://www.buymeacoffee.com/nshenderov" target="_blank">
        <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;max-width: 217px !important;" >
    </a>
</p>

## <a id="installation"></a>🔧 Installation

Add the package to your Strapi application:

```bash
npm install @_sh/strapi-plugin-ckeditor
```

or

```bash
yarn add @_sh/strapi-plugin-ckeditor
```

Then build the app:

```bash
npm run build
```

or

```bash
yarn build
```

## <a id="usage"></a>✍️ Usage

1. Go to the Content-Type Builder -> Add another field -> switch to `custom`

<p align="center">
  <img src="https://raw.githubusercontent.com/nshenderov/strapi-plugin-ckeditor/master/assets/usage-guide1.png" width="700" />
</p>

2. Click on CKEditor 5

<p align="center">
  <img src="https://raw.githubusercontent.com/nshenderov/strapi-plugin-ckeditor/master/assets/usage-guide2.png" width="700" />
</p>

3. Choose the editor version you want

<p align="center">
  <img src="https://raw.githubusercontent.com/nshenderov/strapi-plugin-ckeditor/master/assets/usage-guide3.png" width="700" />
</p>

## Default versions:

<details>
  <summary><b>Open</b></summary>
  
<p align="center">
  <img src="https://raw.githubusercontent.com/nshenderov/strapi-plugin-ckeditor/master/assets/toolbar-version.png" width="700" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/nshenderov/strapi-plugin-ckeditor/master/assets/toolbarballon-version.png" width="700" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/nshenderov/strapi-plugin-ckeditor/master/assets/blockballon-version.png" width="700" />
</p>

</details>

## <a id="configuration"></a>⚙️ Configuration

---

The plugin is based on the [**Strapi Custom Field API**](https://docs.strapi.io/developer-docs/latest/development/custom-fields.html#registering-a-custom-field-on-the-server) and the [**CKEditor5 DLL build**](https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/dll-builds.html).

It is highly recommended to explore [**the official CKEditor5 documentation**](https://ckeditor.com/docs/ckeditor5/latest/features/index.html).

The plugin configuration should be defined in `your-app/config/ckeditor.txt`.

The plugin provides three editor configurations by default. Each configuration includes a set of plugins, settings, and styles.

You can select the configuration you need in the Content-Type Builder. Each configuration can be modified in the config file, and you can also create new ones.

Config structure looks like this:

```js
globalThis.CKEditorConfig = {
    configsOverwrite:bool,
    themeOverwrite:bool,
    configs:{
        toolbar:{...},
        toolbarBalloon:{...},
        blockBalloon:{...},
        customEditorVersion1:{...},
        customEditorVersion2:{...}
        ...
    }
    theme:{...}
}
```

Every configuration in the `configs` object contains three properties:

1. `field (object)` Registers this configuration version in the Admin panel.
2. `styles (string)` Styles applied to the editor in this version.
3. `editorConfig (object)` The CKEditor configuration.

The `theme` object is used to modify the default global theme of the plugin.
It contains four properties:

1. `common (string)` Styles applied to the editor to ensure proper appearance of the input.
2. `light (string)` Styles applied to the editor when Strapi is in light mode.
3. `dark (string)` Styles applied to the editor when Strapi is in dark mode.
4. `additional (string)` Additional styles to further enhance the editors appearance.

By default, everything defined in the user’s configuration is merged with the
default configuration object. These two properties allow you to prevent
this behavior:

1. `configsOverwrite (bool)`
2. `themeOverwrite (bool)`

Since Strapi uses i18n for translation, the `ignorei18n` property is added to the
`editorConfig.language` object. This property allows you to manually set the
content language, bypassing i18n. The language object looks like this:

```js
language: {
  ignorei18n(bool), ui(string), content(string);
}
```

The language determination follows this logic:

- Plugin UI language:
  `language.ui -> preferred language -> 'en'`

- Content language:
  `ignorei18n ? language.content : i18n -> language.ui`

**Example of adding a new editor configuration:**

<details>
   <summary><b>ckeditor.txt</b></summary>

```js
globalThis.CKEditorConfig = {
  configs: {
    myCustomVariant: {
      field: {
        key: 'myCustomVariant',
        value: 'myCustomVariant',
        metadatas: {
          intlLabel: {
            id: 'ckeditor5.preset.myCustomVariant.label',
            defaultMessage: 'My custom variant',
          },
        },
      },
      editorConfig: {
        plugins: [
          CKEditor5.autoformat.Autoformat,
          CKEditor5.basicStyles.Bold,
          CKEditor5.basicStyles.Italic,
          CKEditor5.essentials.Essentials,
          CKEditor5.heading.Heading,
          CKEditor5.image.Image,
          CKEditor5.image.ImageCaption,
          CKEditor5.image.ImageStyle,
          CKEditor5.image.ImageToolbar,
          CKEditor5.image.ImageUpload,
          CKEditor5.indent.Indent,
          CKEditor5.link.Link,
          CKEditor5.list.List,
          CKEditor5.paragraph.Paragraph,
          CKEditor5.pasteFromOffice.PasteFromOffice,
          CKEditor5.table.Table,
          CKEditor5.table.TableToolbar,
          CKEditor5.table.TableColumnResize,
          CKEditor5.table.TableCaption,
          CKEditor5.strapiPlugins.StrapiMediaLib,
          CKEditor5.strapiPlugins.StrapiUploadAdapter,
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
};
```

</details>

**Example of changing buttons, modifying the plugin list, and adding styles in the default toolbar configuration:**

<details>
   <summary><b>ckeditor.txt</b></summary>

```js
globalThis.CKEditorConfig = {
  configs: {
    toolbar: {
      styles: `
                --ck-focus-ring:3px dashed #5CB176;

                .ck.ck-content.ck-editor__editable {
                  &.ck-focused:not(.ck-editor__nested-editable) {
                    border: var(--ck-focus-ring) !important;
                  }
                }
                .ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-blurred{
                  min-height: 400px;
                  max-height: 400px;
                }
                .ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-focused{
                  min-height: 400px;
                  max-height: 1700px;
                }
            `,
      editorConfig: {
        plugins: [
          CKEditor5.basicStyles.Bold,
          CKEditor5.basicStyles.Italic,
          CKEditor5.essentials.Essentials,
          CKEditor5.heading.Heading,
          CKEditor5.image.Image,
          CKEditor5.image.ImageCaption,
          CKEditor5.image.ImageStyle,
          CKEditor5.image.ImageToolbar,
          CKEditor5.link.Link,
          CKEditor5.list.List,
          CKEditor5.paragraph.Paragraph,
          CKEditor5.strapiPlugins.StrapiMediaLib,
          CKEditor5.strapiPlugins.StrapiUploadAdapter,
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
      },
    },
  },
};
```

</details>

> 📂 Configurations availibale by default: [**admin/src/components/Input/CKEditor/configs**](https://github.com/nshenderov/strapi-plugin-ckeditor/blob/master/admin/src/components/Input/CKEditor/configs)

> 📂 Built-in plugins: [**admin/src/components/Input/CKEditor/configs/base.js**](https://github.com/nshenderov/strapi-plugin-ckeditor/blob/master/admin/src/components/Input/CKEditor/configs/base.js)

> 📂 Default editor styles: [**admin/src/components/Input/CKEditor/theme**](https://github.com/nshenderov/strapi-plugin-ckeditor/blob/master/admin/src/components/Input/CKEditor/theme)

> 💡 To display content from an external source in your admin panel, you should configure your `middlewares.js`. [**Explore the documentation for more information**](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/required/middlewares.html)

## Adding plugins

---

Exmple of adding the Markdown plugin

Add the plugin to you Strapi application:

```js
yarn add @ckeditor/ckeditor5-markdown-gfm
```

or

```js
npm install @ckeditor/ckeditor5-markdown-gfm
```

Import the plugin in `your-app/src/admin/app.js`:

```js
import ckeditor5Dll from 'ckeditor5/build/ckeditor5-dll.js';
import ckeditor5MrkdownDll from '@ckeditor/ckeditor5-markdown-gfm/build/markdown-gfm.js';

const config = {};

const bootstrap = (app) => {};

export default {
  config,
  bootstrap,
};
```

Add a new configuration option to your config file at `your-app/config/ckeditor.txt`:

**Example of a config file with the new configuration:**

<details>
  <summary><b>ckeditor.txt</b></summary>

```js
globalThis.CKEditorConfig = {
  configs: {
    markdown: {
      field: {
        key: 'markdown',
        value: 'markdown',
        metadatas: {
          intlLabel: {
            id: 'ckeditor.preset.markdown.label',
            defaultMessage: 'Markdown version',
          },
        },
      },
      editorConfig: {
        placeholder: 'Markdown editor',
        plugins: [
          CKEditor5.essentials.Essentials,
          CKEditor5.autoformat.Autoformat,
          CKEditor5.blockQuote.BlockQuote,
          CKEditor5.basicStyles.Bold,
          CKEditor5.heading.Heading,
          CKEditor5.image.Image,
          CKEditor5.image.ImageCaption,
          CKEditor5.image.ImageStyle,
          CKEditor5.image.ImageToolbar,
          CKEditor5.image.ImageUpload,
          CKEditor5.indent.Indent,
          CKEditor5.basicStyles.Italic,
          CKEditor5.link.Link,
          CKEditor5.list.List,
          CKEditor5.mediaEmbed.MediaEmbed,
          CKEditor5.paragraph.Paragraph,
          CKEditor5.table.Table,
          CKEditor5.table.TableToolbar,
          CKEditor5.sourceEditing.SourceEditing,
          CKEditor5.strapiPlugins.StrapiMediaLib,
          CKEditor5.strapiPlugins.StrapiUploadAdapter,
          CKEditor5.markdownGfm.Markdown,
          CKEditor5.basicStyles.Code,
          CKEditor5.codeBlock.CodeBlock,
          CKEditor5.list.TodoList,
          CKEditor5.basicStyles.Strikethrough,
          CKEditor5.horizontalLine.HorizontalLine,
        ],
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'strikethrough',
            'link',
            '|',
            'bulletedList',
            'numberedList',
            'todoList',
            '|',
            'code',
            'codeBlock',
            '|',
            'uploadImage',
            'strapiMediaLib',
            'blockQuote',
            'horizontalLine',
            '-',
            'sourceEditing',
            '|',
            'outdent',
            'indent',
            '|',
            'undo',
            'redo',
          ],
          shouldNotGroupWhenFull: true,
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
        codeBlock: {
          languages: [
            { language: 'css', label: 'CSS' },
            { language: 'html', label: 'HTML' },
            { language: 'javascript', label: 'JavaScript' },
            { language: 'php', label: 'PHP' },
          ],
        },
      },
    },
  },
};
```

</details>

Then rebuild the application:

```bash
npm run build
```

or

```bash
yarn build
```

## <a id="contributing"></a>🛠 Contributing

This section covers how to configure your environment if you want to contribute to this package.

To start making changes to the plugin, you first need to install the Strapi infrastructure on top of the plugin repository:

```
npx create-strapi-app --quickstart strapi
cd strapi
```

By default, Strapi does not create a `plugins` folder, so we need to create it:

```
mkdir -p src/plugins
```

Now we should clone this repository so we can work on it.

```
git clone git@github.com:nshenderov/strapi-plugin-ckeditor.git src/plugins/strapi-plugin-ckeditor
```

Add an entry inside the `./package.json` file so we won't need to use yarn inside the plugin itself:

```
"workspaces": ["./src/plugins/strapi-plugin-ckeditor"]
```

Install dependencies:

```
yarn install
```

Now we need to register the plugin so Strapi can use it. To do that, we need to create the `./config/plugins.js` file (if it doesn't already exist) and add an entry to it:

```
module.exports = ({ env }) => ({
  ckeditor5: {
    enabled: true,
    resolve: "./src/plugins/strapi-plugin-ckeditor"
  },
});
```

Rebuild the project and start the server:

```
yarn build
yarn develop
```

## <a id="requirements"></a>⚠️ Requirements

---

Strapi **v5.0.0+**

Node **>=18.0.0 <=20.x.x**
