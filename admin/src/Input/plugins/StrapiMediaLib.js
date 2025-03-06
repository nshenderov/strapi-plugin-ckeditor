import { Plugin, ButtonView } from 'ckeditor5';

const mediaLibIcon =
  '<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<path fill-rule="evenodd" clip-rule="evenodd" d="M4.3.6a.9.9 0 100 1.8h15.311a.9.9 0 100-1.8H4.301zm17.1 3.7A1.6 1.6' +
  ' 0 0123 5.9v15.5a1.6 1.6 0 01-1.6 1.6H2.6A1.601 1.601 0 011 21.4V8 5.915C1 5.03 1.716 4.3 2.6' +
  ' 4.3h18.8zM5.032 19.18h14.336l-3.136-3.205-1.792 1.831-4.032-4.12-5.376 5.494zm13.44-8.697c0 ' +
  '1.282-.985 2.289-2.24 2.289-1.254 0-2.24-1.007-2.24-2.29 0-1.281.986-2.288 2.24-2.288 1.255 0 2.24 1.007 2.24 2.289z">' +
  '</path></svg>';

export default class StrapiMediaLib extends Plugin {
  /**
   * Strapi function used to show media library modal.
   * Should be provided via connect method before using toggle method.
   *
   * @type {function|null}
   */
  strapiToggle = null;

  static get pluginName() {
    return 'StrapiMediaLib';
  }

  init() {
    const editor = this.editor;
    const config = editor.config.get('strapiMediaLib');
    editor.ui.componentFactory.add('strapiMediaLib', () => {
      const button = new ButtonView();

      button.set({
        label: 'Media Library 001',
        icon: mediaLibIcon,
        tooltip: true,
      });

      button.on('execute', config.toggle.bind(this));

      return button;
    });
  }
}
