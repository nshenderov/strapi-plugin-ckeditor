import { Command } from 'ckeditor5';

class ElementAddFootnotesCommand extends Command {
    refresh() {
        const element = this.editor.model.document.selection.anchor.parent;
        this.isEnabled = true;
    }

    execute(options) {

        const model = this.editor.model;
        const element = this.editor.model.document.selection.anchor.parent;

        const selection = model.document.selection;

        model.change(writer => {
            for (const range of selection.getRanges()) {
                writer.setAttribute('customFootnote', options, range);
            }
        });
    }
}

export default ElementAddFootnotesCommand;
