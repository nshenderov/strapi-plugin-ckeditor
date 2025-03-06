import { Plugin } from 'ckeditor5';

import ElementAddFootnotesCommand from './add-attribute-to-element-command';

class ElementAddFootnotesEditing extends Plugin {
    static get pluginName() {
        return 'ElementAddFootnotesEditing';
    }

    init() {
        const editor = this.editor;
        const data = editor.data;
        const editing = editor.editing;

        const schema = this.editor.model.schema;
        const conversion = this.editor.conversion;

        editor.model.schema.extend('$text', { allowAttributes: ['customFootnote', 'linkHref', 'customName'] });

        conversion.for('upcast').elementToAttribute({
            view: {
                name: 'a',
                attributes: {
                    name: 'footnote',
                    name: true,
                    href: true
                }
            },
            model: {
                key: 'customFootnote',
                value: viewElement => {
                    return {
                        '_name': viewElement.getAttribute('name'),
                        '_url': viewElement.getAttribute('href'),
                    }
                }
            },
            converterPriority: 'highest'
        });

        editor.conversion.for('downcast').attributeToElement({
            model: {
                key: 'customFootnote',
                name: '$text'
            },
            view: (value, { writer }) => {
                return writer.createAttributeElement('a', {'href': value?._url, 'name': value?._name});
            },
            converterPriority: 'highest'
        });

        this.editor.commands.add('ElementAddFootnotes', new ElementAddFootnotesCommand(this.editor));
    }
}

export default ElementAddFootnotesEditing;
