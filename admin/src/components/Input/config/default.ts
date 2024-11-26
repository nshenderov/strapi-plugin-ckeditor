import * as sanitizeHtml from 'sanitize-html';
import type { EditorConfig } from 'ckeditor5';
import type { CKEditorPreset } from '../../../types';

import { materialColors } from './colors';

const defaultEditorConfig: EditorConfig = {
  plugins: [
    globalThis.SH_CKE.Alignment,
    globalThis.SH_CKE.Autoformat,
    globalThis.SH_CKE.AutoImage,
    globalThis.SH_CKE.BalloonToolbar,
    globalThis.SH_CKE.BlockQuote,
    globalThis.SH_CKE.Bold,
    globalThis.SH_CKE.Code,
    globalThis.SH_CKE.CodeBlock,
    globalThis.SH_CKE.Essentials,
    globalThis.SH_CKE.FontBackgroundColor,
    globalThis.SH_CKE.FontColor,
    globalThis.SH_CKE.FontFamily,
    globalThis.SH_CKE.FontSize,
    globalThis.SH_CKE.GeneralHtmlSupport,
    globalThis.SH_CKE.Heading,
    globalThis.SH_CKE.HorizontalLine,
    globalThis.SH_CKE.HtmlEmbed,
    globalThis.SH_CKE.Image,
    globalThis.SH_CKE.ImageCaption,
    globalThis.SH_CKE.ImageInsert,
    globalThis.SH_CKE.ImageResize,
    globalThis.SH_CKE.ImageStyle,
    globalThis.SH_CKE.ImageToolbar,
    globalThis.SH_CKE.ImageUpload,
    globalThis.SH_CKE.Indent,
    globalThis.SH_CKE.IndentBlock,
    globalThis.SH_CKE.Italic,
    globalThis.SH_CKE.List,
    globalThis.SH_CKE.ListProperties,
    globalThis.SH_CKE.Link,
    globalThis.SH_CKE.LinkImage,
    globalThis.SH_CKE.LinkImage,
    globalThis.SH_CKE.MediaEmbed,
    globalThis.SH_CKE.PageBreak,
    globalThis.SH_CKE.Paragraph,
    globalThis.SH_CKE.PasteFromOffice,
    globalThis.SH_CKE.PictureEditing,
    globalThis.SH_CKE.RemoveFormat,
    globalThis.SH_CKE.SourceEditing,
    globalThis.SH_CKE.SpecialCharacters,
    globalThis.SH_CKE.SpecialCharactersArrows,
    globalThis.SH_CKE.SpecialCharactersCurrency,
    globalThis.SH_CKE.SpecialCharactersLatin,
    globalThis.SH_CKE.SpecialCharactersMathematical,
    globalThis.SH_CKE.SpecialCharactersText,
    globalThis.SH_CKE.StrapiMediaLib,
    globalThis.SH_CKE.StrapiUploadAdapter,
    globalThis.SH_CKE.Strikethrough,
    globalThis.SH_CKE.Style,
    globalThis.SH_CKE.Subscript,
    globalThis.SH_CKE.Superscript,
    globalThis.SH_CKE.ShowBlocks,
    globalThis.SH_CKE.Table,
    globalThis.SH_CKE.TableCaption,
    globalThis.SH_CKE.TableCellProperties,
    globalThis.SH_CKE.TableColumnResize,
    globalThis.SH_CKE.TableProperties,
    globalThis.SH_CKE.TableToolbar,
    globalThis.SH_CKE.Underline,
    globalThis.SH_CKE.WordCount,
  ],
  toolbar: [
    {
      label: ' ',
      icon: 'paragraph',
      items: ['heading', 'style'],
    },
    {
      label: ' ',
      icon: 'text',
      items: ['fontSize', 'fontFamily'],
    },
    '|',
    'alignment',
    {
      label: ' ',
      icon: globalThis.SH_CKE.icons.indent,
      items: ['outdent', 'indent'],
    },
    '|',
    'bulletedList',
    'numberedList',
    '|',
    'insertImage',
    'mediaEmbed',
    'strapiMediaLib',
    'link',
    'blockquote',
    'insertTable',
    'specialCharacters',
    'htmlEmbed',
    'codeBlock',
    '|',
    'horizontalLine',
    'pageBreak',
    '|',
    'SourceEditing',
    '|',
    'showBlocks',
    '|',
    'undo',
    'redo',
    '|',
  ],
  balloonToolbar: [
    'bold',
    'italic',
    'fontColor',
    'fontBackgroundColor',
    {
      label: ' ',
      icon: `
      <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" fill="none" width="24" height="24"/>
      <g>
      <path d="M14.348 12H21v2h-4.613c.24.515.368 1.094.368 1.748 0 1.317-.474 2.355-1.423 3.114-.947.76-2.266 1.138-3.956 1.138-1.557 0-2.934-.293-4.132-.878v-2.874c.985.44 1.818.75 2.5.928.682.18 1.306.27 1.872.27.68 0 1.2-.13 1.562-.39.363-.26.545-.644.545-1.158 0-.285-.08-.54-.24-.763-.16-.222-.394-.437-.704-.643-.18-.12-.483-.287-.88-.49H3v-2H14.347zm-3.528-2c-.073-.077-.143-.155-.193-.235-.126-.202-.19-.44-.19-.713 0-.44.157-.795.47-1.068.313-.273.762-.41 1.348-.41.492 0 .993.064 1.502.19.51.127 1.153.35 1.93.67l1-2.405c-.753-.327-1.473-.58-2.16-.76-.69-.18-1.414-.27-2.173-.27-1.544 0-2.753.37-3.628 1.108-.874.738-1.312 1.753-1.312 3.044 0 .302.036.58.088.848h3.318z"/>
      </g>
      </svg>`,
      items: ['underline', 'strikethrough', 'superscript', 'subscript'],
    },
    '|',
    'removeFormat',
  ],
  fontFamily: {
    supportAllValues: true,
  },
  fontSize: {
    options: [10, 12, 14, 'default', 18, 20, 22],
    supportAllValues: true,
  },
  fontColor: {
    columns: 12,
    documentColors: 12,
    colors: materialColors,
  },
  fontBackgroundColor: {
    columns: 12,
    documentColors: 12,
    colors: materialColors,
  },
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      {
        model: 'heading1',
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1',
      },
      {
        model: 'heading2',
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2',
      },
      {
        model: 'heading3',
        view: 'h3',
        title: 'Heading 3',
        class: 'ck-heading_heading3',
      },
      {
        model: 'heading4',
        view: 'h4',
        title: 'Heading 4',
        class: 'ck-heading_heading4',
      },
      {
        model: 'heading5',
        view: 'h5',
        title: 'Heading 5',
        class: 'ck-heading_heading5',
      },
      {
        model: 'heading6',
        view: 'h6',
        title: 'Heading 6',
        class: 'ck-heading_heading6',
      },
    ],
  },
  htmlSupport: {
    allow: [
      {
        name: /.*/,
        attributes: true,
        classes: true,
        styles: true,
      },
    ],
    disallow: [
      {
        attributes: [
          { key: /^on(.*)/i, value: true },
          {
            key: /.*/,
            value: /(\b)(on\S+)(\s*)=|javascript:|(<\s*)(\/*)script/i,
          },
          { key: /.*/, value: /data:(?!image\/(png|jpeg|gif|webp))/i },
        ],
      },
      { name: 'script' },
    ],
  },
  htmlEmbed: {
    showPreviews: true,
    sanitizeHtml: inputHtml => {
      const outputHtml = sanitizeHtml.default(inputHtml);
      return {
        html: outputHtml,
        hasChanged: true,
      };
    },
  },
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true,
    },
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableProperties',
      'tableCellProperties',
      'toggleTableCaption',
    ],
  },
  image: {
    styles: {
      options: [
        'inline',
        'alignLeft',
        'alignRight',
        'alignCenter',
        'alignBlockLeft',
        'alignBlockRight',
        'block',
        'side',
      ],
    },
    resizeOptions: [
      {
        name: 'resizeImage:original',
        label: 'Default image width',
        value: null,
      },
      {
        name: 'resizeImage:50',
        label: '50% page width',
        value: '50',
      },
      {
        name: 'resizeImage:75',
        label: '75% page width',
        value: '75',
      },
    ],
    toolbar: [
      'imageTextAlternative',
      'toggleImageCaption',
      'linkImage',
      '|',
      'imageStyle:inline',
      'imageStyle:wrapText',
      'imageStyle:breakText',
      'imageStyle:side',
      '|',
      'resizeImage',
    ],
  },
  link: {
    decorators: {
      toggleDownloadable: {
        mode: 'manual',
        label: 'Downloadable',
        attributes: {
          download: 'file',
        },
      },
    },
    addTargetToExternalLinks: true,
    defaultProtocol: 'https://',
  },
  style: {
    definitions: [
      {
        name: 'Title',
        element: 'h1',
        classes: ['document-title'],
      },
      {
        name: 'Subtitle',
        element: 'h2',
        classes: ['document-subtitle'],
      },
      {
        name: 'Callout',
        element: 'p',
        classes: ['callout'],
      },
      {
        name: 'Side quote',
        element: 'blockquote',
        classes: ['side-quote'],
      },
      {
        name: 'Needs clarification',
        element: 'span',
        classes: ['needs-clarification'],
      },
      {
        name: 'Wide spacing',
        element: 'span',
        classes: ['wide-spacing'],
      },
      {
        name: 'Small caps',
        element: 'span',
        classes: ['small-caps'],
      },
      {
        name: 'Code (dark)',
        element: 'pre',
        classes: ['stylish-code', 'stylish-code-dark'],
      },
      {
        name: 'Code (bright)',
        element: 'pre',
        classes: ['stylish-code', 'stylish-code-bright'],
      },
    ],
  },
  ui: {
    poweredBy: {
      position: 'inside',
      side: 'left',
      label: '',
      verticalOffset: 0,
      horizontalOffset: 0,
    },
  },
};

const defaultEditor: Record<string, CKEditorPreset> = {
  default: {
    field: {
      key: 'default',
      value: 'default',
      metadatas: {
        intlLabel: {
          id: 'ckeditor.preset.default.label',
          defaultMessage: 'default',
        },
      },
    },
    editorConfig: defaultEditorConfig,
  },
};

export default defaultEditor;
