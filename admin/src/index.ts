import * as yup from 'yup';

import { PLUGIN_ID } from './utils';
import { getPluginConfig, type Field } from './config';
import { CKEditorIcon } from './components/CKEditorIcon';

export * from './exports';

const AVAILABLE_OPTIONS: Field[] = [];

function fillUpOptions(): void {
  const { presets } = getPluginConfig();
  Object.values(presets).forEach(({ field }) => AVAILABLE_OPTIONS.push(field));
}

async function setUpGlobal() {
  const { backendURL } = window.strapi;
  const route = 'config/is-responsive-dimensions';
  const url = backendURL !== '/' ? `${backendURL}/${PLUGIN_ID}/${route}` : `/${PLUGIN_ID}/${route}`;
  const { isResponsiveDimensions } = await fetch(url).then(res => res.json());

  window.SH_CKE = {
    IS_UPLOAD_RESPONSIVE: isResponsiveDimensions,
  };
}

// eslint-disable-next-line import/no-default-export
export default {
  bootstrap() {
    fillUpOptions();
  },
  async register(app: any): Promise<void> {
    await setUpGlobal();

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
            options: AVAILABLE_OPTIONS,
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
