import React from 'react';
import * as yup from 'yup';

import './utils/exportToGlobal';
import { getPresetsOptions } from './utils/getPresetsOptions';
import { PLUGIN_ID } from './utils/pluginId';
import { CKEditorIcon } from './CKEditorIcon';

export default {
  async register(app) {
    app.customFields.register({
      name: 'CKEditor',
      type: 'richtext',
      pluginId: PLUGIN_ID,
      icon: CKEditorIcon,
      intlLabel: {
        id: PLUGIN_ID + '.label',
        defaultMessage: 'CKEditor 5',
      },
      intlDescription: {
        id: PLUGIN_ID + '.description',
        defaultMessage: 'The rich text editor for every use case',
      },
      components: {
        Input: async () => import('./components/Input'),
      },
      options: {
        base: [
          {
            intlLabel: {
              id: PLUGIN_ID + '.preset.label',
              defaultMessage: 'Preset',
            },
            description: {
              id: PLUGIN_ID + '.preset.description',
              defaultMessage: ' ',
            },
            name: 'options.preset',
            type: 'select',
            options: await getPresetsOptions(),
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
                  id: PLUGIN_ID + '.required.label',
                  defaultMessage: 'Required field',
                },
                description: {
                  id: PLUGIN_ID + 'required.description',
                  defaultMessage:
                    "You won't be able to create an entry if this field is empty",
                },
              },
              {
                name: 'options.maxLengthCharacters',
                type: 'checkbox-with-number-field',
                intlLabel: {
                  id: PLUGIN_ID + '.maxLength.label',
                  defaultMessage: 'Maximum length (characters)',
                },
              },
            ],
          },
        ],
        validator: (args) => ({
          preset: yup.string().required({
            id: PLUGIN_ID + '.preset.error.required',
            defaultMessage: 'Editor preset is required',
          }),
        }),
      },
    });
  },
};
