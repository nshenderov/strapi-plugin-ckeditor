<p align="center">
  <img src="https://raw.githubusercontent.com/nshenderov/strapi-plugin-ckeditor/master/assets/ckeditor5.png" alt="CKEditor5-Strapi" width="700" />
</p>

<h1 align="center">CKEditor 5 for Strapi</h1>

<p align="center">Replaces the default Strapi WYSIWYG editor with a customized build of CKEditor 5 packed with useful plugins.</p>

## 👋 Get Started

* [Features](#features)
* [Installation](#installation)
* [Configuration](#configuration)
* [Theme customization](#themecustomization)
* [Requirements](#requirements)
* [Thanks](#thanks)

## <a id="features"></a>✨ Features

* **Lots of default plugins:** for styling text, images, tables and so on.
* **Font color picker:** choose color for font styling that's not defined in default palette.
* **Upload adapter for Strapi:** for upload images to your library when you drop an image into the editor.
* **Fullscreen mode button.**
* **Strapi media library button.**
* **Supports strapi theme swithing.**
* **Supports responsive images:** plugin adds srcset attribute to images based on their `formats` if responsive enable in strapi settings.
* **Language support:** you can set the preferred language for the UI or the content in the configuration, by default it will use the language defined in the user profile if that language is supported.

## <a id="installation"></a>🔧 Installation

Inside your Strapi app, add the package:

With `npm`:
```bash
npm install @_sh/strapi-plugin-ckeditor
```
With `yarn`:
```bash
yarn add @_sh/strapi-plugin-ckeditor
```

In `config/plugins.js` file add:
```js
ckeditor: true
```

If you do not yet have this file, then create and add:
```js
module.exports = () => {
    return {
        ckeditor: true
    }
}
```

Then run build:
```bash
npm run build
```

or
```bash
yarn build
```

## <a id="configuration"></a>⚙️ Configuration
CKEditor config should be defined in `config.editor` field.

Learn more about configuration from [official documentation](https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/configuration.html).

<details>
  <summary>(spoiler) <b>Built in plugins:</b> </summary>

```js
plugins: [
StrapiUploadAdapter,
Alignment,
Autoformat,
AutoImage,
AutoLink,
Autosave,
BlockQuote,
Bold,
CloudServices,
Code,
CodeBlock,
DataFilter,
DataSchema,
Essentials,
FindAndReplace,
FontBackgroundColor,
FontColor,
FontFamily,
FontSize,
GeneralHtmlSupport,
Heading,
HeadingButtonsUI,
ParagraphButtonUI,
Highlight,
HorizontalLine,
HtmlComment,
HtmlEmbed,
Image,
ImageCaption,
ImageInsert,
ImageResize,
ImageStyle,
ImageToolbar,
ImageUpload,
Indent,
IndentBlock,
Italic,
Link,
LinkImage,
List,
ListProperties,
MediaEmbed,
MediaEmbedToolbar,
Mention,
PageBreak,
Paragraph,
PasteFromOffice,
RemoveFormat,
SourceEditing,
SpecialCharacters,
SpecialCharactersArrows,
SpecialCharactersCurrency,
SpecialCharactersEssentials,
SpecialCharactersLatin,
SpecialCharactersMathematical,
SpecialCharactersText,
StandardEditingMode,
Strikethrough,
Subscript,
Superscript,
Table,
TableCaption,
TableCellProperties,
TableProperties,
TableToolbar,
TextPartLanguage,
TextTransformation,
TodoList,
Underline,
WordCount,
Markdown,
StrapiMediaLib,
FullScreen
] 

```

</details>

**Default configuration:**
```js
// plugins.js
module.exports = () => {
   return {
    ckeditor: {
     enabled: true,
     config:{
        plugin:{
          styles:` // styles applied to editor container `
        },
        editor:{ // editor default config
          // https://ckeditor.com/docs/ckeditor5/latest/features/markdown.html
          // if you need markdown support and output set it to removePlugins: [''],
          // default is removePlugins: ['Markdown'],
          // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html
          toolbar: {
            items: [
              'paragraph',
              'heading1',
              'heading2',
              '|',
              'bold',
              'italic',
              'fontColor',
              'fontBackgroundColor',
              'fontFamily',
              'underline',
              'fontSize',
              'removeFormat',
              '|',
              'bulletedList',
              'todoList',
              'numberedList',
              '|',
              'alignment',
              'outdent',
              'indent',
              'horizontalLine',
              '|',
              'StrapiMediaLib',
              'insertTable',
              'blockQuote',
              'mediaEmbed',
              'link',
              'highlight',
              '|',
              'htmlEmbed',
              'sourceEditing',
              'code',
              'codeBlock',
              '|',
              'subscript',
              'superscript',
              'strikethrough',
              'specialCharacters',
              '|',
              'heading',
              "fullScreen",
              'undo',
              'redo'
            ]
          },
          // https://ckeditor.com/docs/ckeditor5/latest/features/font.html
          fontSize: {
            options: [
                9,
                11,
                13,
                'default',
                17,
                19,
                21,
                27,
                35,
                "tiny",
                "small",
                "big",
                "huge"
            ],
            supportAllValues: false
          },
          fontFamily: {
            options: [
              'default',
              'Arial, Helvetica Neue, Helvetica, Source Sans Pro, sans-serif',
              'Courier New, Courier, monospace',
              'Georgia, serif',
              'Lucida Sans Unicode, Lucida Grande, sans-serif',
              'Tahoma, Geneva, sans-serif',
              'Times New Roman, Times, serif',
              'Trebuchet MS, Helvetica, sans-serif',
              'Verdana, Geneva, sans-serif',
              'Roboto, Roboto Black, Roboto Medium, Roboto Light, sans-serif',
            ],
            supportAllValues: true
          },
          fontColor: {
            columns: 5,
            documentColors: 10,
          },
          fontBackgroundColor: {
            columns: 5,
            documentColors: 10,
          },
          // https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
          language: 'en',
          // https://ckeditor.com/docs/ckeditor5/latest/features/images/images-overview.html
          image: {
            resizeUnit: "%",
            resizeOptions: [ {
              name: 'resizeImage:original',
              value: null,
              icon: 'original'
            },
            {
              name: 'resizeImage:25',
              value: '25',
              icon: 'small'
            },
            {
              name: 'resizeImage:50',
              value: '50',
              icon: 'medium'
            },
            {
              name: 'resizeImage:75',
              value: '75',
              icon: 'large'
            } ],
            toolbar: [
              'toggleImageCaption',
              'imageTextAlternative',
              'imageStyle:inline',
              'imageStyle:block',
              'imageStyle:side',
              'linkImage',
              'resizeImage:25', 'resizeImage:50', 'resizeImage:75', 'resizeImage:original'
            ]
          },
          // https://ckeditor.com/docs/ckeditor5/latest/features/table.html
          table: {
            contentToolbar: [
              'tableColumn',
              'tableRow',
              'mergeTableCells',
              'tableCellProperties',
              'tableProperties',
              'toggleTableCaption'
            ]
          },
          // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html
          heading: {
            options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
              { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
              { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
              { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
              { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
              {
              model: 'h1b',
              view: {name: 'h1', classes: 'ck-heading_h1_b'},
              title: 'H1 (border)',
              class: 'ck-heading_heading1',
              converterPriority: 'high'
              },
              {
              model: 'h2b',
              view: {name: 'h2', classes: 'ck-heading_h2_b'},
              title: 'H2 (border)',
              class: 'ck-heading_heading2',
              converterPriority: 'high'
              },
              {
              model: 'h3b',
              view: {name: 'h3', classes: 'ck-heading_h3_b'},
              title: 'H3 (border)',
              class: 'ck-heading_heading3',
              converterPriority: 'high'
              },
              { model: 'custom',
              view: {name: 'custom', classes: 'Heading 1'},
              title: 'custom',
              class: 'ck-heading_heading3',
              converterPriority: 'high'
              }
            ]
          },
          // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html
          // if you need more tags
          // htmlSupport: {
          //     allow: [
          //         // Enables plain <div> elements.
          //         {
          //             name: 'div'
          //         },
          
          //         // Enables plain <div>, <section> and <article> elements.
          //         {
          //             name: /^(div|section|article)$/
          //         },
          
          //         // Enables <div>s with all inline styles (but no other attributes).
          //         {
          //             name: 'div',
          //             styles: true
          //         },
          
          //         // Enables <div>s with foo and bar classes.
          //         {
          //             name: 'div',
          //             classes: [ 'foo', 'bar' ]
          //         },
          
          //         // Adds support for `foo` and `bar` classes to the already supported
          //         // <p> elements (those are enabled by the dedicated paragraph feature).
          //         {
          //             name: 'p',
          //             classes: [ 'foo', 'bar' ]
          //         },
          
          //         // Enables <div>s with foo="true" attribute and bar attribute that
          //         // can accept any value (boolean `true` value works as an asterisk).
          //         {
          //             name: 'div',
          //             attributes: {
          //                 foo: 'true',
          //                 bar: true
          //             }
          //         },
          
          //         // Adds support for style="color: *" to the already supported
          //         // <p> and <h2-h4> elements.
          //         {
          //             name: `/^(p|h[2-4])$/'`,
          //             styles: { 'color': true }
          //         },
          //     ]
          // },
        }
      }
    }
    }
}
```
## <a id="themecustomization"></a>💅 Theme customization
If you want to customize editor styles you should define styles in `config.plugin.styles` field it will replace default styles applied to the editor.

Since Strapi resets css styles, it needs some styles to revert back, these styles defined below, also check [official documentation](https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/content-styles.html).

For theme colors switching this plugin uses css variables depending on html data-theme attribute, e.g. `html[data-theme='light']` or `html[data-theme='dark']`

[More info about theming](https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/ui/theme-customization.html)

[**👔 Default styles**](https://github.com/nshenderov/strapi-plugin-ckeditor/blob/master/admin/src/components/CKEditor/styles.js#L3-L517)

[**🎨 Default colour variables**](https://github.com/nshenderov/strapi-plugin-ckeditor/blob/master/assets/theme-colors.css#L105-L333)

**Example of customization:**
```js
// plugins.js
const defStyles = require('./styles.js')

module.exports = () => {
    return {
        ckeditor: {
          enabled: true,
          config:{
             plugin:{
                // styles applied to editor container
                styles:`
                ${defStyles()}
                --ck-color-editor-base-text:red;
                `
             },
             // editor default config
             editor:{
                 //...
             }
         }
     }
   }
}

// styles.js
const defStyles = () =>`

        ### All default styles ###
    `
module.exports = defStyles;
```

## <a id="requirements"></a>⚠️ Requirements
Strapi **v4**

Tested on **v4.18 - 4.19**

## <a id="thanks"></a>👍 This build includes some useful plugins based on these repos so thanks to them:
https://github.com/Roslovets-Inc/strapi-plugin-ckeditor5

https://github.com/leknoppix/ckeditor5-fullscreen

https://github.com/gtomato/ckeditor5-strapi-upload-plugin

https://github.com/pshurygin/ckeditor5-font-color
