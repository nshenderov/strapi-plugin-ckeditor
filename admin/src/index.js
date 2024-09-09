import React from 'react';
import * as yup from 'yup';

import './utils/exportToGlobal';
import { getPresetsOptions } from './utils/getPresetsOptions';
import pluginId from './pluginId';
import CKEditorIcon from './CKEditorIcon';

export default {
  async register(app) {
    app.customFields.register({
      name: 'CKEditor',
      type: 'richtext',
      pluginId: pluginId,
      icon: CKEditorIcon,
      intlLabel: {
        id: pluginId + '.label',
        defaultMessage: 'CKEditor 5',
      },
      intlDescription: {
        id: pluginId + '.description',
        defaultMessage: 'The rich text editor for every use case',
      },
      components: {
        Input: async () => import('./Input'),
      },
      options: {
        base: [
          {
            intlLabel: {
              id: pluginId + '.preset.label',
              defaultMessage: 'Preset',
            },
            description: {
              id: pluginId + '.preset.description',
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
                  id: pluginId + '.required.label',
                  defaultMessage: 'Required field',
                },
                description: {
                  id: pluginId + 'required.description',
                  defaultMessage:
                    "You won't be able to create an entry if this field is empty",
                },
              },
              {
                name: 'options.maxLengthCharacters',
                type: 'checkbox-with-number-field',
                intlLabel: {
                  id: pluginId + '.maxLength.label',
                  defaultMessage: 'Maximum length (characters)',
                },
              },
            ],
          },
        ],
        validator: (args) => ({
          preset: yup.string().required({
            id: pluginId + '.preset.error.required',
            defaultMessage: 'Editor preset is required',
          }),
        }),
      },
    });
  },
};
