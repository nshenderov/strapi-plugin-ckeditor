# CKEditor 5 for Strapi 

<img src="./assets/ckeditor1.jpg"/>
  
<br/>
  
Replaces the default Strapi WYSIWYG editor with a customized build of CKEditor 5 html editor packed with useful plugins. 
  
This plugin works on custom build of CKEditor 5 html editor packed with useful plugins.
  
<br/>

## Included plugins
  
<br/>
  
- <b>Lots of default plugins:</b>
  
    For styling text, images, tables and so on.

- <b>Font color picker:</b>
  
    Gives you ability to choose colors for font styling that's not defined in config from the color palette.
 
- <b>Upload adapter for Strapi:</b>
  
    For upload images to your library when you drop an image into the editor.

- <b>Fullscreen mode button</b>
 
- <b>Strapi media library button</b>

- <b>Also supports strapi theme swithing</b>

- <b>Supports responsive images:</b>
 
    Plugin adds srcset attribute to images based on their "formats" if responsive enable in strapi settings</b>

<br/>
<img src="./assets/ckeditor-toolbar.jpg" width="900"/>
<br/>
<img src="./assets/ckeditor-tables.jpg" width="900"/>
  
<img src="./assets/ckeditor-d-2.jpg" width="900"/>


<table>
  <tr>
    <td><img src="./assets/ckeditor-fontcolor1.jpg" width=200></td>
    <td><img src="./assets/ckeditor-fontcolor3.jpg" width=200></td>
  </tr>
 </table>

## How to install
Install the dependency via npm
```
npm install @_sh/strapi-plugin-ckeditor
```
or yarn
```
yarn add @_sh/strapi-plugin-ckeditor
```
In ./config/plugins.js file add
```
ckeditor: true
```
If you do not yet have this file, then create and add:
```
module.exports = ({ env }) => {
    return {
        ckeditor: true
    }
}
```
Then run build
```
npm run build
```
or
```
yarn build
```

## How to customize  
  
Via config in plugins.js

  Ckeditor settings should be defined in <b>config.editor</b> field
    
  Read more about configuration https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/configuration.html
    

<details>
  <summary><b>Default config</b></summary>
  
  
  ```javascript

  ckeditor: {
      enabled: true,
      config:{
        plugin:{
       // styles applies to editor container
          styles:``
        },
       // editor default config 
        editor:{
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
          language: 'en',
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
              { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
              { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
              {
                  model: 'h1b',
                  view: {name: 'h1', classes: 'ck-heading_h1_b'}, title: 'H1 (border)', class: 'ck-heading_heading1', converterPriority: 'high'
              },
              {
                model: 'h2b',
                view: {name: 'h2', classes: 'ck-heading_h2_b'}, title: 'H2 (border)', class: 'ck-heading_heading2', converterPriority: 'high'
              },
              {
              model: 'h3b',
              view: {name: 'h3', classes: 'ck-heading_h3_b'}, title: 'H3 (border)', class: 'ck-heading_heading3', converterPriority: 'high'
              },
              {
                model: 'h4b',
                view: {name: 'h4', classes: 'ck-heading_h4_b'}, title: 'H4 (border)', class: 'ck-heading_heading4', converterPriority: 'high'
              },
              {
                model: 'h5b',
                view: {name: 'h5', classes: 'ck-heading_h5_b'}, title: 'H5 (border)', class: 'ck-heading_heading5', converterPriority: 'high'
              },
              {
                model: 'h6b',
                view: {name: 'h6', classes: 'ck-heading_h6_b'}, title: 'H6 (border)', class: 'ck-heading_heading6', converterPriority: 'high'
              }
            ]
          }
        }
      }
    }
  ```
  
</details>
<br/>

If you want to customize editor styles you should define styles in <b>config.plugin.styles</b> field it will replace default styles applied to the editor
 
Since Strapi resets css styles, it needs some styles to revert back, those styles defined below also check https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/content-styles.html
 
Also for theme colors switching this plugin uses css variables depending on html data-theme attribute, e.g. html[data-theme='light'] or html[data-theme='dark']
  
More info about theming https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/ui/theme-customization.html

<details>
  <summary><b>Example of customizing</b></summary>  
  
  ```javascript
# plugins.js

const defStyles = require('./styles.js')

  ckeditor: {
      enabled: true,
      config:{
        plugin:{
       // styles aplyies to editor container
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

# styles.js

    const defStyles = () =>`
        ### all default styles from link below ###
    `
    module.exports = defStyles;

  ```
  
</details>
 
 <br/>

<b>[Default colour variables for the editor](admin/src/components/CKEditor/theme-colors.css)</b>
 
<b>[Default styles](admin/src/components/CKEditor/styles.js)</b>

 
<br/>   

## Requirements
Strapi v4
  
Tested on v4.18 - 4.19


## This build includes some useful plugins based on those repos so thanks to them:  
https://github.com/Roslovets-Inc/strapi-plugin-ckeditor5  
https://github.com/leknoppix/ckeditor5-fullscreen  
https://github.com/gtomato/ckeditor5-strapi-upload-plugin  
https://github.com/pshurygin/ckeditor5-font-color  
  