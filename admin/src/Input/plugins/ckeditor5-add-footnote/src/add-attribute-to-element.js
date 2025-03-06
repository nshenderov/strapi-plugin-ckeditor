import ElementAddFootnotesEditing from './add-attribute-to-element-editing';
import ElementAddFootnotesFormView from './ui/add-attribute-to-element-view';

import { Plugin, ButtonView, Command, clickOutsideHandler, BalloonPanelView, toMap, icons } from 'ckeditor5';

export default class ElementAddFootnotes extends Plugin {
    

    static get requires() {
        return [ElementAddFootnotesEditing];
    }

    static get pluginName() {
        return 'elementAddFootnotes'
    }

    init() {
        this._createButton();
        this._createForm();
    }

    destroy() {
        super.destroy();
        this._form.destroy();
    }

    _createButton() {
        const editor = this.editor;
        const t = editor.t;

        const model = this.editor.model;
        const selection = model.document.selection;

        editor.ui.componentFactory.add('ElementAddFootnotes', locale => {
            const command = editor.commands.get('ElementAddFootnotes');
            const view = new ButtonView(locale);

            view.set({
                label: t('Footnote'),
                icon: icons.pencil,
                tooltip: true,
                withText: true,
                class: 'element-add-attributes-btn'
            });

            const enabled = editor.config.get('ElementAddFootnotes.enabled') || true;

            if (!enabled) {
                view.isEnabled = false;
            } else {
                view.bind('isEnabled').to(command, 'isEnabled');
            }

            this.listenTo(view, 'execute', () => {
                const attributes = toMap(selection.getAttributes());

                this._showForm(attributes.get('customFootnote'));
            });

            return view;
        });
    }

    _createForm() {
        const editor = this.editor;
        const view = editor.editing.view;
        const viewDocument = view.document;

        this._balloon = this.editor.plugins.get('ContextualBalloon');

        this._form = new ElementAddFootnotesFormView(editor.locale);
        // Render the form so its #element is available for clickOutsideHandler.

        console.log("_createForm : this._form :: ", this._form)

        this._form.render();

        this.listenTo(this._form, 'save', () => {
            editor.execute('ElementAddFootnotes', {
                _name: this._form.labeledInput.fieldView.element.value,
                _url: this._form.labeledInputHref.fieldView.element.value,
            });

            this._hideForm(true);
        });

        this.listenTo(this._form, 'cancel', () => {
            this._hideForm(true);
        });

        // Close the form on Esc key press.
        this._form.keystrokes.set('Esc', (data, cancel) => {
            this._hideForm(true);
            cancel();
        });

        // Reposition the balloon or hide the form if an image widget is no longer selected.
        this.listenTo(editor.ui, 'update', () => {
            if (!viewDocument.selection) {
                this._hideForm(true);
            }
        });

        // Close on click outside of balloon panel element.
        clickOutsideHandler({
            emitter: this._form,
            activator: () => this._isVisible,
            contextElements: [this._balloon.view.element],
            callback: () => this._hideForm()
        });
    }

    _showForm(footnoteValue = {}) {
        if (this._isVisible) {
            return;
        }

        const editor = this.editor;
        const command = editor.commands.get('elementAddFootnotes');
        const labeledInput = this._form.labeledInput;
        const labeledInputHref = this._form.labeledInputHref;

        if (!this._isInBalloon) {
            const defaultPositions = BalloonPanelView.defaultPositions;
            const target = document.querySelector('.element-add-attributes-btn');


            this._balloon.add({
                view: this._form,
                position: {
                    target,
                    positions: [
                        defaultPositions.northArrowSouth,
                        defaultPositions.northArrowSouthWest,
                        defaultPositions.northArrowSouthEast,
                        defaultPositions.southArrowNorth,
                        defaultPositions.southArrowNorthWest,
                        defaultPositions.southArrowNorthEast
                    ]
                }
            });
        }

        // Make sure that each time the panel shows up, the field remains in sync with the value of
        // the command. If the user typed in the input, then canceled the balloon (`labeledInput#value`
        // stays unaltered) and re-opened it without changing the value of the command, they would see the
        // old value instead of the actual value of the command.
        // https://github.com/ckeditor/ckeditor5-image/issues/114
        labeledInput.fieldView.value = labeledInput.fieldView.element.value = footnoteValue?._name || '';
        labeledInputHref.fieldView.value = labeledInputHref.fieldView.element.value = footnoteValue?._url || '';
        this._form.labeledInput.fieldView.select();
    }

    _hideForm(focusEditable) {
        if (!this._isInBalloon) {
            return;
        }

        // Blur the input element before removing it from DOM to prevent issues in some browsers.
        // See https://github.com/ckeditor/ckeditor5/issues/1501.
        if (this._form.focusTracker.isFocused) {
            this._form.saveButtonView.focus();
        }

        this._balloon.remove(this._form);

        if (focusEditable) {
            this.editor.editing.view.focus();
        }
    }

    get _isVisible() {
        return this._balloon.visibleView === this._form;
    }

    get _isInBalloon() {
        return this._balloon.hasView(this._form);
    }
}