<p align="center">
  <img src="https://raw.githubusercontent.com/nshenderov/strapi-plugin-ckeditor/master/assets/ckeditor5_2_0.png" width="700" />
</p>

<h1 align="center">CKEditor 5 for Strapi</h1>

<p align="center">Integrates CKEditor 5 into your Strapi project as a fully customizable custom field. (Unofficial integration)</p>

## 👋 Get Started

* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
* [Configuration](#configuration)
* [Contributing](#contributing)
* [Migration](#migration)
* [Requirements](#requirements)

## <a id="features"></a>✨ Features

* **Media library integration**
* **Responsive images support**
* **Strapi theme switching support**
* **Supports custom styles for the editor**
* **Supports i18n and different UI translations**
* **Allows custom editor configrations**
* **Plugins extensibility**

<p align="right">
    <a href="https://www.buymeacoffee.com/nshenderov" target="_blank">
        <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;max-width: 217px !important;" >
    </a>
</p>


## <a id="installation"></a>🔧 Installation


Add the package to your Strapi application:

```bash
yarn add @_sh/strapi-plugin-ckeditor
```

For Strapi v4:
```bash
yarn add @_sh/strapi-plugin-ckeditor@strapi-v4-latest
```

Then, build the app:

```bash
yarn build
```

## <a id="usage"></a>✍️ Usage

<p align="center">
  <img src="https://raw.githubusercontent.com/nshenderov/strapi-plugin-ckeditor/master/assets/usage-guide.gif" width="700" />
</p>

<details>
  <summary><b>Default preset:</b></summary>
  
<p align="center">
  <img src="https://raw.githubusercontent.com/nshenderov/strapi-plugin-ckeditor/master/assets/default-preset.gif" width="700" />
</p>

</details>

## <a id="configuration"></a>⚙️ Configuration


> It is highly recommended to explore [**the official CKEditor5 documentation**](https://ckeditor.com/docs/ckeditor5/latest/features/index.html) and [**the Strapi Custom Field API**](https://docs.strapi.io/developer-docs/latest/development/custom-fields.html#registering-a-custom-field-on-the-server) 
>
> To display content from external sources, such as images or videos, in your admin panel, you need to configure your `middlewares.js` file. [**Check the official documentation for details.**](https://docs.strapi.io/dev-docs/configurations/middlewares#security)

The plugin configuration should be defined in `your-app/config/ckeditor.js|ts`

By default, the plugin provides one preset, which can be modified in the config file.

You can also add new presets in the config file.

The plugin exposes all CKEditor packages to the global variable SH_CKE.

The config file must define a function called CKEConfig that returns the configuration object.

The structure of the configuration object is as follows:

```js
{
    dontMergePresets:bool,
    dontMergeTheme:bool,
    presets:{
        default:{
            field:{...},
            styles:string,
            editorConfig:{...},
        },
        ...
    }
    theme:{
        common:string,
        light:string,
        dark:string,
        additional:string,
    }
}
```

Every preset in the `presets` object contains three properties:

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

1. `dontMergePresets (bool)`
2. `dontMergeTheme (bool)`

Since Strapi uses i18n for translation, the `ignorei18n` property is added to the
`editorConfig.language` object. This property allows you to manually set the
content language, bypassing i18n. The language object looks like this:

```js
language:{
    ignorei18n (bool),
    ui (string),
    content (string)
}
```
The language determination follows this logic:

- Plugin UI language:
`language.ui -> preferred language -> 'en'`

- Content language:
`ignorei18n ? language.content : i18n -> language.ui`

---

**Example of adding a new editor configuration:**

<details>
   <summary><b>ckeditor.js</b></summary>

```js
const CKEConfig = () => ({
    presets:{
        myCustomPreset:{
            field: {
                key: "myCustomPreset",
                value: "myCustomPreset",
                metadatas: {
                    intlLabel: {
                        id: "ckeditor5.preset.myCustomPreset.label",
                        defaultMessage: "My custom preset",
                    },
                },
            },
            editorConfig:{
                plugins: [
                    SH_CKE.Autoformat,
                    SH_CKE.Bold,
                    SH_CKE.Italic,
                    SH_CKE.Essentials,
                    SH_CKE.Heading,
                    SH_CKE.Image,
                    SH_CKE.ImageCaption,
                    SH_CKE.ImageStyle,
                    SH_CKE.ImageToolbar,
                    SH_CKE.ImageUpload,
                    SH_CKE.Indent,
                    SH_CKE.Link,
                    SH_CKE.List,
                    SH_CKE.Paragraph,
                    SH_CKE.PasteFromOffice,
                    SH_CKE.Table,
                    SH_CKE.TableToolbar,
                    SH_CKE.TableColumnResize,
                    SH_CKE.TableCaption,
                    SH_CKE.StrapiMediaLib,
                    SH_CKE.StrapiUploadAdapter,
                ],
                toolbar: [
                    'heading',
                    '|',
                    'bold', 'italic', 'link', 'bulletedList', 'numberedList',
                    '|',
                    'strapiMediaLib', 'insertTable',
                    '|',
                    'undo', 'redo'
                ],
                heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                    ]
                },
                image: {
                    toolbar: [
                        'imageStyle:inline',
                        'imageStyle:block',
                        'imageStyle:side',
                        '|',
                        'toggleImageCaption',
                        'imageTextAlternative'
                    ]
                },
                table: {
                    contentToolbar: [
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells',
                        '|',
                        'toggleTableCaption'
                    ]
                }
            }
        }
    }
})
```

</details>

---

**Example of changing buttons, modifying the plugin list, and adding styles in the default preset:**

<details>
   <summary><b>ckeditor.js</b></summary>

```js
const CKEConfig = () => ({
    presets:{
        default:{
            styles:`
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
            editorConfig:{
                plugins: [
                    SH_CKE.Bold,
                    SH_CKE.Italic,
                    SH_CKE.Essentials,
                    SH_CKE.Heading,
                    SH_CKE.Image,
                    SH_CKE.ImageCaption,
                    SH_CKE.ImageStyle,
                    SH_CKE.ImageToolbar,
                    SH_CKE.Link,
                    SH_CKE.List,
                    SH_CKE.Paragraph,
                    SH_CKE.StrapiMediaLib,
                    SH_CKE.StrapiUploadAdapter,
                ],
                toolbar: [
                    'heading',
                    '|',
                    'bold', 'italic', 'link', 'bulletedList', 'numberedList',
                    '|',
                    'strapiMediaLib', 'insertTable',
                    '|',
                    'undo', 'redo'
                ]
            }
        }
    }
})
```

</details>

---

> 📂 Default preset: [**admin/src/components/Input/presets/default.js**](https://github.com/nshenderov/strapi-plugin-ckeditor/blob/master/admin/src/components/Input/presets/default.js)
>
> 📂 Default theme: [**admin/src/components/Input/theme**](https://github.com/nshenderov/strapi-plugin-ckeditor/blob/master/admin/src/components/Input/theme)

### Adding plugins

Your plugin must be available in the `global`.

**Example of adding the Timestamp plugin:**

1. Create the plugin:

```js
// your-app/src/admin/timestamp.js

class Timestamp extends SH_CKE.Plugin {
    init() {
        const editor = this.editor;
        // The button must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add( 'timestamp', () => {
            // The button will be an instance of ButtonView.
            const button = new SH_CKE.ButtonView();

            button.set( {
                label: 'Timestamp',
                withText: true
            } );

            // Execute a callback function when the button is clicked.
            button.on( 'execute', () => {
                const now = new Date();

                // Change the model using the model writer.
                editor.model.change( writer => {

                    // Insert the text at the user's current position.
                    editor.model.insertContent( writer.createText( now.toString() ) );
                } );
            } );

            return button;
        } );
    }
}

globalThis.Timestamp = Timestamp;
```

2. Import the plugin:

```js
// your-app/src/admin/app.js

import './timestamp.js'

const config = {};

const bootstrap = (app) => {};

export default {
  config,
  bootstrap,
};

```

3. Add the new plugin to your preset:

<details>
  <summary><b>ckeditor.js</b></summary>

```js
// your-app/config/ckeditor.js

const CKEConfig = () => ({
    presets: {
        myCustomPreset:{
            field: {
                key: "myCustomPreset",
                value: "myCustomPreset",
                metadatas: {
                    intlLabel: {
                    id: "ckeditor5.preset.myCustomPreset.label",
                    defaultMessage: "My custom preset",
                    },
                },
            },
            editorConfig:{
                plugins: [
                    Timestamp,
                    SH_CKE.Autoformat,
                    SH_CKE.Bold,
                    SH_CKE.Italic,
                    SH_CKE.Essentials,
                    SH_CKE.Heading,
                    SH_CKE.Image,
                    SH_CKE.ImageCaption,
                    SH_CKE.ImageStyle,
                    SH_CKE.ImageToolbar,
                    SH_CKE.ImageUpload,
                    SH_CKE.Indent,
                    SH_CKE.Link,
                    SH_CKE.List,
                    SH_CKE.Paragraph,
                    SH_CKE.PasteFromOffice,
                    SH_CKE.Table,
                    SH_CKE.TableToolbar,
                    SH_CKE.TableColumnResize,
                    SH_CKE.TableCaption,
                    SH_CKE.StrapiMediaLib,
                    SH_CKE.StrapiUploadAdapter,
                ],
                toolbar: [
                    'timestamp',
                    'heading',
                    '|',
                    'bold', 'italic', 'link', 'bulletedList', 'numberedList',
                    '|',
                    'strapiMediaLib', 'insertTable',
                    '|',
                    'undo', 'redo'
                ],
                
                // ...
            }
        },
  }
})
```

</details>  


4. Then rebuild the application:
```bash
yarn build
```

**💡 Alternatively, you can define your plugin like this:**

<details>
  <summary><b>ckeditor.js</b></summary>

```js
const CKEConfig = () => {
  class Timestamp extends SH_CKE.Plugin {
    init() {
      const editor = this.editor;
      // The button must be registered among the UI components of the editor
      // to be displayed in the toolbar.
      editor.ui.componentFactory.add("timestamp", () => {
        // The button will be an instance of ButtonView.
        const button = new SH_CKE.ButtonView();

        button.set({
          label: "Timestamp",
          withText: true,
        });

        // Execute a callback function when the button is clicked.
        button.on("execute", () => {
          const now = new Date();

          // Change the model using the model writer.
          editor.model.change((writer) => {
            // Insert the text at the user's current position.
            editor.model.insertContent(writer.createText(now.toString()));
          });
        });

        return button;
      });
    }
  }

  return {
    presets: {
        myCustomPreset:{
          field: {
            key: "myCustomPreset",
            value: "myCustomPreset",
            metadatas: {
              intlLabel: {
                id: "ckeditor5.preset.myCustomPreset.label",
                defaultMessage: "My custom preset",
              },
            },
          },
            editorConfig:{
                plugins: [
                    Timestamp,
                    SH_CKE.Autoformat,
                    SH_CKE.Bold,
                    SH_CKE.Italic,
                    SH_CKE.Essentials,
                    SH_CKE.Heading,
                    SH_CKE.Image,
                    SH_CKE.ImageCaption,
                    SH_CKE.ImageStyle,
                    SH_CKE.ImageToolbar,
                    SH_CKE.ImageUpload,
                    SH_CKE.Indent,
                    SH_CKE.Link,
                    SH_CKE.List,
                    SH_CKE.Paragraph,
                    SH_CKE.PasteFromOffice,
                    SH_CKE.Table,
                    SH_CKE.TableToolbar,
                    SH_CKE.TableColumnResize,
                    SH_CKE.TableCaption,
                    SH_CKE.StrapiMediaLib,
                    SH_CKE.StrapiUploadAdapter,
                ],
                toolbar: [
                    'timestamp',
                    'heading',
                    '|',
                    'bold', 'italic', 'link', 'bulletedList', 'numberedList',
                    '|',
                    'strapiMediaLib', 'insertTable',
                    '|',
                    'undo', 'redo'
                ],
                
                ...
            }
        },
  }
}
```

</details>  



## <a id="contributing"></a>🛠 Contributing


This section explains how to set up your environment if you want to contribute to this package.

[Strapi Plugin SDK docs](https://docs.strapi.io/dev-docs/plugins/development/create-a-plugin#linking-the-plugin-to-your-project)

Clone the repository:

```bash
git clone https://github.com/nshenderov/strapi-plugin-ckeditor.git ./strapi-plugin-ckeditor
```
Navigate to the downloaded folder:

```bash
cd ./strapi-plugin-ckeditor
```

Install dependencies:

```bash
yarn install
```

Link the plugin to your project:

In the plugin directory, run:
```bash
yarn watch:link
```

Open new terminal window and in your project directory, run:
```bash
yarn dlx yalc add --link @_sh/strapi-plugin-ckeditor && yarn install
```

Rebuild the project and start the server:

```bash
yarn build
yarn develop
```


## <a id="migration"></a>✈️ Migration

### From v3 to v4

- The new version introduces support for Strapi v5 and is incompatible with Strapi v4. You will need to update your Strapi project to version 5 before upgrading.

- The plugin development process has changed. Please refer to the updated contribution guide for more information.

### From v2 to v3

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
    presets:{
        myCustomPreset:{
            field: {
                key: "myCustomPreset",
                value: "myCustomPreset",
                metadatas: {
                    intlLabel: {
                        id: "ckeditor5.preset.myCustomPreset.label",
                        defaultMessage: "My custom preset",
                    },
                },
            },
            editorConfig:{
                plugins: [
                    SH_CKE.Autoformat,
                    SH_CKE.Bold,
                    SH_CKE.Italic,
                    SH_CKE.Essentials,
                    SH_CKE.Heading,
                    SH_CKE.Image,
                    SH_CKE.ImageCaption,
                    SH_CKE.ImageStyle,
                    SH_CKE.ImageToolbar,
                    SH_CKE.ImageUpload,
                    SH_CKE.Indent,
                    SH_CKE.Link,
                    SH_CKE.List,
                    SH_CKE.Paragraph,
                    SH_CKE.PasteFromOffice,
                    SH_CKE.Table,
                    SH_CKE.TableToolbar,
                    SH_CKE.TableColumnResize,
                    SH_CKE.TableCaption,
                    SH_CKE.StrapiMediaLib,
                    SH_CKE.StrapiUploadAdapter,
                ],
                toolbar: [
                    'heading',
                    '|',
                    'bold', 'italic', 'link', 'bulletedList', 'numberedList',
                    '|',
                    'strapiMediaLib', 'insertTable',
                    '|',
                    'undo', 'redo'
                ],
                heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                    ]
                },
                image: {
                    toolbar: [
                        'imageStyle:inline',
                        'imageStyle:block',
                        'imageStyle:side',
                        '|',
                        'toggleImageCaption',
                        'imageTextAlternative'
                    ]
                },
                table: {
                    contentToolbar: [
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells',
                        '|',
                        'toggleTableCaption'
                    ]
                }
            }
        }
    }
})
```

</details>

### From v1 to v2

- You will need to update Strapi to version v4.4.x for plugin v2.0.x, or to v4.13.0+ for v2.1.x.

- Starting with v2, the plugin uses the Custom Field API, so you'll need to manually update your schema.

- The plugin configuration should be defined in /config/ckeditor.txt from v2 onward. [Please refer to the v2 configuration guide for details.](https://github.com/nshenderov/strapi-plugin-ckeditor/blob/e782475f54b8a50a04f55275c89ef5bf61a15745/README.md?plain=1#L54)

## <a id="requirements"></a>⚠️ Requirements


**v4.x.x**

Strapi **>= 5.0.0**

Node **>= 18.0.0 <= 20.x.x**

___

**v3.x.x**

Strapi **>= 4.13.0 < 5.0.0**

Node **>= 18.0.0 <= 20.x.x**