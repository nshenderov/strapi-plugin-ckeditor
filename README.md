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
* **Language support:** you can set the preferred language for the UI or the content in the configuration, by default it will use the language defined in the user profile if that language [is supported](https://github.com/nshenderov/strapi-plugin-ckeditor/tree/master/admin/src/components/CKEditor/build/translations). i18 also supported.

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

> 💡 `sizes` and `loading` attributes for image can be set in source mode.
> If you use default upload provider and you want prefix img url with api path you need to add `baseURL` in `api.js` file `(config/api.js)`


## <a id="configuration"></a>⚙️ Configuration
CKEditor config should be defined in `config.editor` field in `plugins.js` file.

**⚠️ `plugins.js` not `plugin.js` ⚠️**

**`plugins.js` file should be placed in `config` folder.**

**💡`fullscreen mode` and `source mode` not supported with `balloon` and `block` toolbars.**

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
FullScreen,
BlockToolbar,
BalloonToolbar,
Style
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
          // disable data-theme tag setting // 
          // setAttribute:false,

          // disable strapi theme, will use default ckeditor theme //
          // strapiTheme:false,
          
          // styles applied to editor container (global scope) //
          // styles:`
          // .ck.ck-editor__main .ck-focused{
          //   max-height: 700px;
          // }
          // :root{
          //   --ck-color-focus-border:red;
          //   --ck-color-text:red;
          // }
          // `
        },
        editor:{ // editor default config

          // https://ckeditor.com/docs/ckeditor5/latest/features/markdown.html
          // if you need markdown support and output set: removePlugins: [''],
          // default is 
          // removePlugins: ['Markdown'],

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
          // default language: 'en',
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
            ]
          },
          // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html
          // Regular expressions (/.*/  /^(p|h[2-4])$/' etc) for htmlSupport does not allowed in this config
          htmlSupport: {
            allow: [
                {
                  name: 'img',
                  attributes: {
                      sizes:true,
                      loading:true,
                  }
                },
            ]
          },
        }
      }
    }
  }
}
```
**Some of configuration:**

<h3 align="center">Balloon+Block+Style</h3>

<p align="center">
  <img src="https://raw.githubusercontent.com/nshenderov/strapi-plugin-ckeditor/master/assets/balloonblockstyles.gif" alt="CKEditor5-Strapi" width="800" />
</p>

<details>
  <summary><b>Balloon+Block+Style config:</b> </summary>

```js
module.exports = () => {
  return {
    ckeditor: {
     enabled: true,
     config:{
      plugin:{
            styles:`
            .ck-content{
              border-radius:4px !important;
            }
            .ck-sticky-panel{
              display:none !important;
            }
          
            .ck.ck-content h3.category {
                font-family: 'Bebas Neue';
                font-size: 20px;
                font-weight: bold;
                color: #d1d1d1;
                letter-spacing: 10px;
                margin: 0;
                padding: 0;
            }
            
            .ck.ck-content h2.document-title {
                font-family: 'Bebas Neue';
                font-size: 50px;
                font-weight: bold;
                margin: 0;
                padding: 0;
                border: 0;
            }
            
            .ck.ck-content h3.document-subtitle {
                font-size: 20px;
                color: #e91e63;
                margin: 0 0 1em;
                font-weight: normal;
                padding: 0;
            }
            
            .ck.ck-content p.info-box {
                --background-size: 30px;
                --background-color: #e91e63;
                padding: 1.2em 2em;
                border: 1px solid var(--background-color);
                background: linear-gradient(135deg, var(--background-color) 0%, var(--background-color) var(--background-size), transparent var(--background-size)), linear-gradient(135deg, transparent calc(100% - var(--background-size)), var(--background-color) calc(100% - var(--background-size)), var(--background-color));
                border-radius: 10px;
                margin: 1.5em 2em;
                box-shadow: 5px 5px 0 #ffe6ef;
            }
            
            .ck.ck-content blockquote.side-quote {
                font-family: 'Bebas Neue';
                font-style: normal;
                float: right;
                width: 35%;
                position: relative;
                border: 0;
                overflow: visible;
                z-index: 1;
                margin-left: 1em;
            }
            
            .ck.ck-content blockquote.side-quote::before {
                content: "“";
                position: absolute;
                top: -37px;
                left: -10px;
                display: block;
                font-size: 200px;
                color: #e7e7e7;
                z-index: -1;
                line-height: 1;
            }
            
            .ck.ck-content blockquote.side-quote p {
                font-size: 2em;
                line-height: 1;
            }
            
            .ck.ck-content blockquote.side-quote p:last-child:not(:first-child) {
                font-size: 1.3em;
                text-align: right;
                color: #555;
            }
            
            .ck.ck-content span.marker {
                background: yellow;
            }
            
            .ck.ck-content span.spoiler {
                background: #000;
                color: #000;
            }
            
            .ck.ck-content span.spoiler:hover {
                background: #000;
                color: #fff;
            }
            
            .ck.ck-content pre.fancy-code {
                border: 0;
                margin-left: 2em;
                margin-right: 2em;
                border-radius: 10px;
            }
            
            .ck.ck-content pre.fancy-code::before {
                content: "";
                display: block;
                height: 13px;
                background: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NCAxMyI+CiAgPGNpcmNsZSBjeD0iNi41IiBjeT0iNi41IiByPSI2LjUiIGZpbGw9IiNGMzZCNUMiLz4KICA8Y2lyY2xlIGN4PSIyNi41IiBjeT0iNi41IiByPSI2LjUiIGZpbGw9IiNGOUJFNEQiLz4KICA8Y2lyY2xlIGN4PSI0Ny41IiBjeT0iNi41IiByPSI2LjUiIGZpbGw9IiM1NkM0NTMiLz4KPC9zdmc+Cg==);
                margin-bottom: 8px;
                background-repeat: no-repeat;
            }
            
            .ck.ck-content pre.fancy-code-dark {
                background: #272822;
                color: #fff;
                box-shadow: 5px 5px 0 #0000001f;
            }
            
            .ck.ck-content pre.fancy-code-bright {
                background: #dddfe0;
                color: #000;
                box-shadow: 5px 5px 0 #b3b3b3;
            }
            
            `
          },
        editor:{
          toolbar:[],
          // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/blocktoolbar.html
          blockToolbar: {
              items: [
              'heading','style',
              '|',
              'outdent',
              'indent',
              'horizontalLine',
              '|',
              'StrapiMediaLib',
              '-',
              'bulletedList', 'numberedList',
              '|',
              'insertTable', 'blockQuote',
              '|',
              'code'
              ],
          },
          balloonToolbar: [
            'bold',
            'italic',
            'fontColor',
            'FontBackgroundColor',
            'fontFamily',
            'fontSize',
            'alignment',
            '|',
            'removeFormat',
            'undo',
            'redo'
          ],
          // https://ckeditor.com/docs/ckeditor5/latest/features/style.html
           style: {
              definitions: [
                  {
                      name: 'Article category',
                      element: 'h3',
                      classes: [ 'category' ]
                  },
                  {
                      name: 'Title',
                      element: 'h2',
                      classes: [ 'document-title' ]
                  },
                  {
                      name: 'Subtitle',
                      element: 'h3',
                      classes: [ 'document-subtitle' ]
                  },
                  {
                      name: 'Info box',
                      element: 'p',
                      classes: [ 'info-box' ]
                  },
                  {
                      name: 'Side quote',
                      element: 'blockquote',
                      classes: [ 'side-quote' ]
                  },
                  {
                      name: 'Marker',
                      element: 'span',
                      classes: [ 'marker' ]
                  },
                  {
                      name: 'Spoiler',
                      element: 'span',
                      classes: [ 'spoiler' ]
                  },
                  {
                      name: 'Code (dark)',
                      element: 'pre',
                      classes: [ 'fancy-code', 'fancy-code-dark' ]
                  },
                  {
                      name: 'Code (bright)',
                      element: 'pre',
                      classes: [ 'fancy-code', 'fancy-code-bright' ]
                  }
              ]
          },
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
          heading: {
            options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
              { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
              { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
            ]
          },
          htmlSupport: {
            allow: [
                {
                  name: 'img',
                  attributes: {
                      sizes:true,
                      loading:true,
                  }
                },
            ]
          },
        }
      }
    }
  }
}

```
</details>

<h3 align="center">Classic+Balloon</h3>

<p align="center">
  <img src="https://raw.githubusercontent.com/nshenderov/strapi-plugin-ckeditor/master/assets/230222.jpg" alt="CKEditor5-Strapi" width="800" />
</p>

<details>
  <summary><b>Classic+Balloon config:</b> </summary>

```js
module.exports = () => {
  return {
    ckeditor: {
     enabled: true,
     config:{
        editor:{
          toolbar: {
            items: [
              'paragraph',
              'heading1',
              'heading2',
              '|',
              'bulletedList',
              'todoList',
              'numberedList',
              '|',
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
          balloonToolbar: [
            'bold',
            'italic',
            'fontColor',
            'FontBackgroundColor',
            'fontFamily',
            'fontSize',
            'alignment',
            '|',
            'removeFormat',
            'undo',
            'redo'
          ],
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
          heading: {
            options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
              { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
              { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
            ]
          },
          htmlSupport: {
            allow: [
                {
                  name: 'img',
                  attributes: {
                      sizes:true,
                      loading:true,
                  }
                },
            ]
          },
        }
      }
    }
  }
}

```
</details>

## <a id="themecustomization"></a>💅 Theme customization
If you want to customize editor styles you should define styles in `config.plugin.styles` field.

Since Strapi resets css styles, it needs some styles to revert back, these styles defined below, also check [official documentation](https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/content-styles.html).

For theme colors switching this plugin uses css variables depending on html data-theme attribute, e.g. `html[data-theme='light']` or `html[data-theme='dark']` you cand disable it by `setAttribute:false`

If you want default ckeditor theme you can set `strapiTheme:false`

More [info about ckeditor theming](https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/ui/theme-customization.html)

[**👔 Default styles**](https://github.com/nshenderov/strapi-plugin-ckeditor/blob/master/admin/src/components/CKEditor/styles.js)

[**🎨 Default theme**](https://github.com/nshenderov/strapi-plugin-ckeditor/blob/master/admin/src/components/CKEditor/theme.js)

**Example of customization:**
```js
// plugins.js
const styles = require('./styles.js')

module.exports = () => {
    return {
        ckeditor: {
          enabled: true,
          config:{
             plugin:{
                // disable data-theme tag setting // 
                // setAttribute:false,

                // disable strapi theme, will use default ckeditor theme //
                // strapiTheme:false,
          
                // styles applied to editor container, e.g:
                styles:`
                ${styles()}
                .ck-editor__styled__container{
                  background:red;
                }
                html[data-theme='light'] {
                --ck-scroll-track-background:red;
                --ck-scroll-thumb-background:red;
                --ck-scroll-thumb-border-color:red;
                --ck-scroll-thumb-hover-background:red;
                --ck-scroll-thumb-active-background:red;
                --ck-color-base-border: red;
                --ck-color-base-background:red;
                --ck-custom-background: red;
                --ck-custom-foreground: red;
                --ck-custom-border: red;
                --ck-custom-white: red;
                }
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
const styles = () =>`
  .ck.ck-editor__main .ck-blurred{
    max-height: 200px;
  }
  .ck.ck-editor__main .ck-focused{
    max-height: 500px;
  }        
`
module.exports = styles;
```

## <a id="requirements"></a>⚠️ Requirements
Strapi **v4.1.8+**

Node **14 - 16**

Tested on **v4.1.8 - 4.3.4**

## <a id="thanks"></a>👍 This build includes some useful plugins based on these repos so thanks to them:
https://github.com/Roslovets-Inc/strapi-plugin-ckeditor5

https://github.com/leknoppix/ckeditor5-fullscreen

https://github.com/gtomato/ckeditor5-strapi-upload-plugin

https://github.com/pshurygin/ckeditor5-font-color
