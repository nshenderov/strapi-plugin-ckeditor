import './styled';
import * as exports from './exports';

import { PLUGIN_ID } from './utils';
import { getPluginConfig, type Option } from './config';
import { CKEditorIcon } from './components/CKEditorIcon';

export * from './exports';

const AVAILABLE_OPTIONS: Option[] = [];

// Options are registered before the plugin config is final, so both the list and the
// default value are filled in on bootstrap through the very same object references.
const PRESET_OPTION = {
  intlLabel: {
    id: `${PLUGIN_ID}.preset.label`,
    defaultMessage: 'Preset',
  },
  description: {
    id: `${PLUGIN_ID}.preset.description`,
    defaultMessage: ' ',
  },
  name: 'options.preset',
  type: 'select',
  options: AVAILABLE_OPTIONS,
  defaultValue: '' as Option['value'],
};

function fillAvailableOptions(): void {
  const { presets } = getPluginConfig();

  Object.values(presets).forEach(({ name, description }) => {
    const option: Option = {
      key: name,
      value: name,
      metadatas: {
        intlLabel: {
          id: `${PLUGIN_ID}.preset.${name}.label`,
          defaultMessage: description,
        },
      },
    };

    AVAILABLE_OPTIONS.push(option);
  });

  PRESET_OPTION.defaultValue = AVAILABLE_OPTIONS[0]?.value ?? '';
}

// eslint-disable-next-line import/no-default-export
export default {
  bootstrap() {
    fillAvailableOptions();
  },
  async register(app: any): Promise<void> {
    app.registerPlugin({
      id: PLUGIN_ID,
      isReady: true,
      name: 'CKEditor',
      apis: exports,
    });

    app.customFields.register({
      name: 'CKEditor',
      type: 'richtext',
      pluginId: PLUGIN_ID,
      icon: CKEditorIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.label`,
        defaultMessage: 'CKEditor 5',
      },
      intlDescription: {
        id: `${PLUGIN_ID}.description`,
        defaultMessage: 'The advanced rich text editor. (Community Edition)',
      },
      components: {
        Input: async () =>
          import('./components/Field').then(module => ({
            default: module.Field,
          })),
      },
      options: {
        base: [PRESET_OPTION],
        advanced: [
          {
            name: 'required',
            type: 'checkbox',
            intlLabel: {
              id: `${PLUGIN_ID}.required.label`,
              defaultMessage: 'Required field',
            },
            description: {
              id: `${PLUGIN_ID}.required.description`,
              defaultMessage: "You won't be able to create an entry if this field is empty",
            },
          },
          {
            sectionTitle: {
              id: `${PLUGIN_ID}.options.advanced.limiters`,
              defaultMessage: 'Input limiters',
            },
            items: [
              {
                name: 'options.maxLengthWords',
                type: 'checkbox-with-number-field',
                intlLabel: {
                  id: `${PLUGIN_ID}.maxLengthWords.label`,
                  defaultMessage: 'Words limit',
                },
              },
              {
                name: 'options.maxLengthCharacters',
                type: 'checkbox-with-number-field',
                intlLabel: {
                  id: `${PLUGIN_ID}.maxLengthCharacters.label`,
                  defaultMessage: 'Characters limit',
                },
              },
            ],
          },
        ],
      },
    });
  },
};
