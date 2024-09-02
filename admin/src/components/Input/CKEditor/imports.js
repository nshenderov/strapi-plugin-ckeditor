export const importLang = async (config, language) => {
  if (!language) return;

  const { plugins: configPlugins = [] } = config;

  const configPluginNames = [...configPlugins.map((p) => p.pluginName)];

  const plugins = [
    { name: 'DocumentList', module: 'ckeditor5-list' },
    { name: 'TextPartLanguage', module: 'ckeditor5-language' },
    { name: 'Alignment', module: 'ckeditor5-alignment' },
    { name: 'Autosave', module: 'ckeditor5-autosave' },
    { name: 'BlockQuote', module: 'ckeditor5-block-quote' },
    { name: 'CodeBlock', module: 'ckeditor5-code-block' },
    { name: 'Heading', module: 'ckeditor5-heading' },
    { name: 'HtmlEmbed', module: 'ckeditor5-html-embed' },
    { name: 'GeneralHtmlSupport', module: 'ckeditor5-html-support' },
    { name: 'HorizontalLine', module: 'ckeditor5-horizontal-line' },
    { name: 'MediaEmbed', module: 'ckeditor5-media-embed' },
    { name: 'Image', module: 'ckeditor5-image' },
    { name: 'Indent', module: 'ckeditor5-indent' },
    { name: 'Link', module: 'ckeditor5-link' },
    { name: 'RemoveFormat', module: 'ckeditor5-remove-format' },
    { name: 'Table', module: 'ckeditor5-table' },
    { name: 'WordCount', module: 'ckeditor5-word-count' },
    { name: 'FindAndReplace', module: 'ckeditor5-find-and-replace' },
    { name: 'SpecialCharacters', module: 'ckeditor5-special-characters' },
    { name: 'PageBreak', module: 'ckeditor5-page-break' },
    { name: 'SourceEditing', module: 'ckeditor5-source-editing' },
    { name: 'Highlight', module: 'ckeditor5-highlight' },
    { name: 'Style', module: 'ckeditor5-style' },
    { name: 'ShowBlocks', module: 'ckeditor5-show-blocks' },
  ];

  const basicStylesPlugin = [
    'Bold',
    'Code',
    'Italic',
    'Strikethrough',
    'Subscript',
    'Superscript',
    'Underline',
  ];

  const fontPlugin = ['FontBackgroundColor', 'FontColor', 'FontFamily', 'FontSize'];

  const listPlugin = ['List', 'DocumentList'];

  const importModules = import.meta.glob('./node_modules/@ckeditor/*/build/translations/*.js', {
    eager: true,
  });

  await Promise.all(
    plugins
      .filter(({ name }) => configPluginNames.includes(name))
      .map(({ module }) => {
        const importPath = `./node_modules/@ckeditor/${module}/build/translations/${language}.js`;
        return importModules[importPath] ? importModules[importPath]() : Promise.resolve(null);
      })
  );

  if (configPluginNames.some((p) => basicStylesPlugin.includes(p))) {
    const importPath = `./node_modules/@ckeditor/ckeditor5-basic-styles/build/translations/${language}.js`;
    if (importModules[importPath]) await importModules[importPath]();
  }

  if (configPluginNames.some((p) => listPlugin.includes(p))) {
    const importPath = `./node_modules/@ckeditor/ckeditor5-list/build/translations/${language}.js`;
    if (importModules[importPath]) await importModules[importPath]();
  }

  if (configPluginNames.some((p) => fontPlugin.includes(p))) {
    const importPath = `./node_modules/@ckeditor/ckeditor5-font/build/translations/${language}.js`;
    if (importModules[importPath]) await importModules[importPath]();
  }
};
