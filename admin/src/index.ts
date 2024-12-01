import * as yup from 'yup';

import { PLUGIN_ID } from './utils';
import { getPresetsFields, getPluginConfig, exportToGlobal } from './config';
import { CKEditorIcon } from './components/CKEditorIcon';

// eslint-disable-next-line import/no-default-export
export default {
  async register(app: any) {
    exportToGlobal();
    const pluginConfig = await getPluginConfig();
    const optionsPreset = getPresetsFields(pluginConfig);

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
        defaultMessage: 'The rich text editor for every use case',
      },
      components: {
        Input: async () =>
          import('./components/Field').then(module => ({
            default: module.Field,
          })),
      },
      options: {
        base: [
          {
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
            options: optionsPreset,
          },
        ],
        advanced: [
          {
            sectionTitle: null,
            items: [
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
                name: 'options.maxLengthWords',
                type: 'checkbox-with-number-field',
                intlLabel: {
                  id: `${PLUGIN_ID}.maxLengthWords.label`,
                  defaultMessage: 'Maximum words',
                },
              },
              {
                name: 'options.maxLengthCharacters',
                type: 'checkbox-with-number-field',
                intlLabel: {
                  id: `${PLUGIN_ID}.maxLengthCharacters.label`,
                  defaultMessage: 'Maximum characters',
                },
              },
            ],
          },
        ],
        validator: () => ({
          preset: yup.string().required({
            id: `${PLUGIN_ID}.preset.error.required`,
            defaultMessage: 'Editor preset is required',
          }),
        }),
      },
    });
  },
};
