import {
  FormRowView,
  LabeledFieldView,
  LinkUI,
  Plugin,
  SwitchButtonView,
  createLabeledInputText,
  findAttributeRange,
} from 'ckeditor5';
import type { LinkDecoratorManualDefinition, ModelWriter } from 'ckeditor5';

/**
 * Name of the `link.decorators` entry used by {@link LinkTitle}.
 *
 * The decorator id in the model is `linkOpenInNewTab`.
 */
export const OPEN_IN_NEW_TAB_DECORATOR_NAME = 'openInNewTab';

/**
 * Manual link decorator toggled by the {@link LinkTitle} switch.
 *
 * Use it together with the {@link LinkTitle} plugin in custom presets:
 *
 * ```ts
 * link: {
 *   decorators: {
 *     [OPEN_IN_NEW_TAB_DECORATOR_NAME]: openInNewTabLinkDecorator,
 *   },
 * },
 * ```
 */
export const openInNewTabLinkDecorator: LinkDecoratorManualDefinition = {
  mode: 'manual',
  label: 'Open in a new tab',
  attributes: {
    target: '_blank',
    rel: 'noopener noreferrer',
  },
};

const OPEN_IN_NEW_TAB_DECORATOR_ID = 'linkOpenInNewTab';

// Must not start with `link`: the link automatic decorators react to every `link*` attribute
// change and would strip `target`/`rel` applied by the manual decorator.
const ANCHOR_TITLE = 'anchorTitle';

/**
 * Adds two controls to the CKEditor link form:
 *
 * - a "Link title" text input, stored in the model as `anchorTitle` and rendered as `<a title="...">`;
 * - an "Open in a new tab" switch, backed by the {@link openInNewTabLinkDecorator} manual decorator.
 *
 * The preset must include both this plugin and the decorator. The `defaultHtml` preset does.
 */
export class LinkTitle extends Plugin {
  /**
   * The switch displayed in the link form.
   */
  private _targetSwitch: SwitchButtonView | null = null;

  /**
   * The manual decorator controlled by the switch.
   */
  private _targetDecorator: any = null;

  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'LinkTitle';
  }

  /**
   * @inheritDoc
   */
  static get requires() {
    return [LinkUI];
  }

  /**
   * @inheritDoc
   */
  init() {
    this._extendConversion();
    this._extendLinkUi();
  }

  private _extendConversion() {
    const editor = this.editor;
    const model = editor.model;
    const selection = model.document.selection;

    model.schema.extend('$text', { allowAttributes: ANCHOR_TITLE });

    editor.conversion.for('upcast').elementToAttribute({
      view: {
        name: 'a',
        attributes: {
          title: true,
        },
      },
      model: {
        key: ANCHOR_TITLE,
        value: (viewElement: any) => viewElement.getAttribute('title') || null,
      },
    });

    editor.conversion.for('downcast').attributeToElement({
      model: ANCHOR_TITLE,
      view: (title: string, { writer }) => {
        if (!title) {
          return null;
        }

        const element = writer.createAttributeElement('a', { title }, { priority: 5 });
        writer.setCustomProperty('link', true, element);

        return element;
      },
    });

    // The title only makes sense on text that is actually a link.
    model.document.registerPostFixer(writer => {
      let changed = false;

      for (const change of model.document.differ.getChanges()) {
        if (
          change.type !== 'attribute' ||
          change.attributeKey !== 'linkHref' ||
          change.attributeNewValue !== null
        ) {
          continue;
        }

        for (const { item } of change.range.getWalker()) {
          if (item.hasAttribute(ANCHOR_TITLE) && !item.hasAttribute('linkHref')) {
            writer.removeAttribute(ANCHOR_TITLE, item);
            changed = true;
          }
        }
      }

      return changed;
    });

    // Keep the title off the selection when the caret leaves the link, so it is not applied
    // to the text typed after the link.
    this.listenTo(selection, 'change:attribute', () => {
      if (!selection.hasAttribute(ANCHOR_TITLE) || selection.hasAttribute('linkHref')) {
        return;
      }

      model.change(writer => writer.removeSelectionAttribute(ANCHOR_TITLE));
    });
  }

  private _extendLinkUi() {
    const editor = this.editor;
    const linkUI = editor.plugins.get(LinkUI) as any;
    const linkCommand = editor.commands.get('link') as any;

    const createFormView = linkUI._createFormView.bind(linkUI);
    linkUI._createFormView = () => {
      const formView = createFormView();
      this._decorateFormView(formView, linkCommand, linkUI);
      return formView;
    };

    const addFormView = linkUI._addFormView.bind(linkUI);
    linkUI._addFormView = () => {
      addFormView();
      this._syncFormView(linkUI, linkCommand);
    };

    const execute = linkCommand.execute.bind(linkCommand);
    linkCommand.execute = (
      href: string,
      decorators: Record<string, boolean>,
      displayedText?: string
    ) => {
      const formView = linkUI.formView;
      const isSubmittedFromForm =
        formView && formView.titleInputView && linkUI._balloon?.visibleView === formView;

      if (!isSubmittedFromForm) {
        return execute(href, decorators, displayedText);
      }

      const title = (formView.titleInputView.fieldView.element?.value || '').trim();
      let result: unknown;

      // Run the link command and the title update as a single undo step.
      editor.model.change(writer => {
        result = execute(href, decorators, displayedText);
        this._applyTitle(title, writer);
      });

      return result;
    };
  }

  private _decorateFormView(formView: any, linkCommand: any, linkUI: any) {
    const editor = this.editor;

    const titleInput = new LabeledFieldView(editor.locale, createLabeledInputText);
    titleInput.label = editor.t('Link title');
    titleInput.class = 'ck-labeled-field-view_full-width';

    const titleRow = new FormRowView(editor.locale, {
      children: [titleInput],
      class: ['ck-form__row_large-top-padding'],
    });

    // Header, "Displayed text", title, URL + submit.
    formView.children.add(titleRow, 2);
    formView.titleInputView = titleInput;

    const openInNewTabDecorator = Array.from(linkCommand.manualDecorators).find(
      (decorator: any) => decorator.id === OPEN_IN_NEW_TAB_DECORATOR_ID
    ) as any;

    if (openInNewTabDecorator) {
      const targetSwitch = new SwitchButtonView(editor.locale);
      targetSwitch.set({
        withText: true,
        label: openInNewTabDecorator.label,
        tooltip: false,
      });
      targetSwitch.bind('isOn').toMany(
        [openInNewTabDecorator, linkCommand],
        'value',
        (decoratorValue: boolean | undefined, commandValue: unknown) => {
          return commandValue === undefined && decoratorValue === undefined
            ? !!openInNewTabDecorator.defaultValue
            : !!decoratorValue;
        }
      );
      targetSwitch.on('execute', () => {
        const newValue = !targetSwitch.isOn;

        // Keep the state on the decorator itself. The link command applies it on form submit,
        // and it also keeps the switch in sync with the "Link properties" view.
        if (typeof linkUI._togglePendingManualDecorator === 'function') {
          linkUI._togglePendingManualDecorator(openInNewTabDecorator, newValue);
        } else {
          openInNewTabDecorator.value = newValue;
        }
      });

      const targetRow = new FormRowView(editor.locale, {
        children: [targetSwitch],
        class: ['ck-form__row_large-top-padding'],
      });

      formView.children.add(targetRow, 3);
      formView.targetSwitchView = targetSwitch;
      this._targetSwitch = targetSwitch;
      this._targetDecorator = openInNewTabDecorator;
    }
  }

  private _syncFormView(linkUI: any, linkCommand: any) {
    const formView = linkUI.formView;

    if (!formView?.titleInputView) {
      return;
    }

    if (!formView._linkTitleFieldsRegistered) {
      const fields = [formView.titleInputView, formView.targetSwitchView].filter(Boolean);

      for (const field of fields) {
        if (field.element) {
          formView.focusTracker.add(field.element);
          formView._focusables.add(field);
        }
      }

      formView._linkTitleFieldsRegistered = true;
    }

    const linkState = this._readActiveLinkState();
    formView.titleInputView.fieldView.value = linkState.title;

    // For an existing link the model is the source of truth, so a switch toggled in a canceled
    // form does not leak into the next edit. Pending state for new links is kept as is.
    if (linkCommand.value !== undefined && this._targetDecorator) {
      this._targetDecorator.value = linkState.target;
    }
  }

  private _applyTitle(title: string, writer: ModelWriter) {
    for (const range of this._getActiveLinkRanges()) {
      const validRanges = this.editor.model.schema.getValidRanges([range], ANCHOR_TITLE);

      for (const validRange of validRanges) {
        if (title) {
          writer.setAttribute(ANCHOR_TITLE, title, validRange);
        } else {
          writer.removeAttribute(ANCHOR_TITLE, validRange);
        }
      }
    }
  }

  private _readActiveLinkState(): { title: string; target: boolean } {
    for (const range of this._getActiveLinkRanges()) {
      for (const item of range.getItems()) {
        if (item.hasAttribute('linkHref')) {
          return {
            title: (item.getAttribute(ANCHOR_TITLE) as string) || '',
            target: !!item.getAttribute(OPEN_IN_NEW_TAB_DECORATOR_ID),
          };
        }
      }
    }

    return { title: '', target: false };
  }

  private _getActiveLinkRanges() {
    const model = this.editor.model;
    const selection = model.document.selection;

    if (!selection.isCollapsed) {
      return Array.from(model.schema.getValidRanges(selection.getRanges(), 'linkHref'));
    }

    const position = selection.getFirstPosition();

    if (!position) {
      return [];
    }

    for (const node of [position.textNode, position.nodeBefore, position.nodeAfter]) {
      const href =
        node && typeof (node as any).getAttribute === 'function'
          ? (node as any).getAttribute('linkHref')
          : null;

      if (href) {
        return [findAttributeRange(position, 'linkHref', href, model)];
      }
    }

    return [];
  }
}
