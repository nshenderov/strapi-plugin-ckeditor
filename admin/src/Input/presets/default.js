import sanitizeHtml from 'sanitize-html';
import { materialColors } from './colors';

const defaultEditorConfig = {
  plugins: [
    SH_CKE.Alignment,
    SH_CKE.Autoformat,
    SH_CKE.AutoImage,
    SH_CKE.BalloonToolbar,
    SH_CKE.BlockQuote,
    SH_CKE.Bold,
    SH_CKE.Code,
    SH_CKE.CodeBlock,
    SH_CKE.Essentials,
    SH_CKE.FontBackgroundColor,
    SH_CKE.FontColor,
    SH_CKE.FontFamily,
    SH_CKE.FontSize,
    SH_CKE.GeneralHtmlSupport,
    SH_CKE.Heading,
    SH_CKE.HorizontalLine,
    SH_CKE.HtmlEmbed,
    SH_CKE.Image,
    SH_CKE.ImageCaption,
    SH_CKE.ImageInsert,
    SH_CKE.ImageResize,
    SH_CKE.ImageStyle,
    SH_CKE.ImageToolbar,
    SH_CKE.ImageUpload,
    SH_CKE.Indent,
    SH_CKE.IndentBlock,
    SH_CKE.Italic,
    SH_CKE.List,
    SH_CKE.ListProperties,
    SH_CKE.Link,
    SH_CKE.LinkImage,
    SH_CKE.LinkImage,
    SH_CKE.MediaEmbed,
    SH_CKE.PageBreak,
    SH_CKE.Paragraph,
    SH_CKE.PasteFromOffice,
    SH_CKE.PictureEditing,
    SH_CKE.RemoveFormat,
    SH_CKE.SourceEditing,
    SH_CKE.SpecialCharacters,
    SH_CKE.SpecialCharactersArrows,
    SH_CKE.SpecialCharactersCurrency,
    SH_CKE.SpecialCharactersLatin,
    SH_CKE.SpecialCharactersMathematical,
    SH_CKE.SpecialCharactersText,
    SH_CKE.StrapiMediaLib,
    SH_CKE.StrapiUploadAdapter,
    SH_CKE.Strikethrough,
    SH_CKE.Style,
    SH_CKE.Subscript,
    SH_CKE.Superscript,
    SH_CKE.ShowBlocks,
    SH_CKE.Table,
    SH_CKE.TableCaption,
    SH_CKE.TableCellProperties,
    SH_CKE.TableColumnResize,
    SH_CKE.TableProperties,
    SH_CKE.TableToolbar,
    SH_CKE.Underline,
    SH_CKE.WordCount,
  ],
  toolbar: [
    {
      label: ' ',
      tooltip: null,
      icon: 'paragraph',
      items: ['heading', 'style'],
    },
    {
      label: ' ',
      tooltip: null,
      icon: 'text',
      items: ['fontSize', 'fontFamily'],
    },
    '|',
    'alignment',
    {
      label: ' ',
      tooltip: null,
      icon: SH_CKE.icons.indent,
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
      tooltip: null,
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
    sanitizeHtml: (inputHtml) => {
      const outputHtml = sanitizeHtml(inputHtml);
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
      openInNewTab: {
        mode: 'manual',
        label: 'Open in a new tab',
        defaultValue: true,
        attributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      },
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
      side: 'right',
      label: '',
    },
  },
};

export const defaultEditor = {
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
