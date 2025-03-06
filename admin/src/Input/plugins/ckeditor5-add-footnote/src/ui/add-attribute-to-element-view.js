import {
    icons as coreIcons,
    View, 
    ViewCollection,
    InputTextView,
    createLabeledInputText,
    LabeledFieldView,
    submitHandler,
    KeystrokeHandler,
    FocusTracker,
    FocusCycler,
    ButtonView
  } from 'ckeditor5';
    
  // Icons
  const checkIcon = coreIcons.check;
  const cancelIcon = coreIcons.cancel;

const style = {
    footnoteFormInput : "margin: 15px 15px 0 15px;",
    footnoteForm : "flex-wrap: wrap; width: 265px;",
    footnoteFormButton : "flex-grow:1;",
}

class ElementAddFootnotesFormView extends View {
    /**
     * @inheritDoc
     */
    constructor(locale) {
        super(locale);

        const t = this.locale.t;

        this.focusTracker = new FocusTracker();

        this.keystrokes = new KeystrokeHandler();

        this.labeledInput = this._createLabeledInputView();

        this.labeledInputHref = this._createLabeledInputViewHref();

        this.saveButtonView = this._createButton(t('Save'), checkIcon, 'ck-button-save', 'save');
        // this.saveButtonView.type = 'submit';

        this.cancelButtonView = this._createButton(t('Cancel'), cancelIcon, 'ck-button-cancel', 'cancel');

        this._focusables = new ViewCollection();

        // this._focusCycler = new FocusCycler( {
        //     focusables: this._focusables,
        //     focusTracker: this.focusTracker,
        //     keystrokeHandler: this.keystrokes,
        //     actions: {
        //         // Navigate form fields backwards using the Shift + Tab keystroke.
        //         focusPrevious: 'shift + tab',

        //         // Navigate form fields forwards using the Tab key.
        //         focusNext: 'tab'
        //     }
        // } );

        this.setTemplate({
            tag: 'form',

            attributes: {
                class: [
                    'ck',
                    'ck-text-alternative-form',
                    'custom-form'
                ],
                style: style.footnoteForm,
                tabindex: '-1'
            },

            children: [
                this.labeledInput,
                this.labeledInputHref,
                this.saveButtonView,
                this.cancelButtonView
            ]
        });
    }

    render() {
        super.render();

        this.keystrokes.listenTo(this.element);

        submitHandler({ view: this });



        [this.labeledInput, this.labeledInputHref, this.saveButtonView, this.cancelButtonView]
            .forEach(v => {
                // Register the view as focusable.
                this._focusables.add(v);

                // Register the view in the focus tracker.
                this.focusTracker.add(v.element);
            })
    }

    _createButton(label, icon, className, eventName) {
        const button = new ButtonView(this.locale);

        button.set({
            label,
            icon,
            tooltip: true
        });

        button.extendTemplate({
            attributes: {
                class: className,
                style: style.footnoteFormButton
            }
        });

        if (eventName) {
            button.delegate('execute').to(this, eventName);
        }

        return button;
    }

    _createLabeledInputView() {
        const t = this.locale.t;
        const labeledInput = new LabeledFieldView(this.locale, createLabeledInputText);

        labeledInput.extendTemplate({
            attributes: {
                style: style.footnoteFormInput,
            }
        });

        labeledInput.label = t('Name Attribute');

        return labeledInput;
    }

    _createLabeledInputViewHref() {
        const t = this.locale.t;
        const labeledInput = new LabeledFieldView(this.locale, createLabeledInputText);

        labeledInput.extendTemplate({
            attributes: {
                style: style.footnoteFormInput,
            }
        });

        labeledInput.label = t('Link URL');

        return labeledInput;
    }
}

export default ElementAddFootnotesFormView;
