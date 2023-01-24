import React from "react";
import * as yup from "yup";

import baseConfigs from "./components/Input/CKEditor/configs";
import getEditorConfig from "./utils/getEditorConfig";
import CKEditorIcon from "./components/CKEditorIcon";
import pluginId from "./utils/pluginId";

export default {
  async register(app) {

    const {
      configs: userConfigs = baseConfigs,
      configsOverwrite: overwrite
    } = await getEditorConfig() || {};

    const setOptions = () => {

      let configs = {};

      if (overwrite) {
        configs = userConfigs;
      } else {
        configs = baseConfigs;
        if (userConfigs) {
          Object.keys(userConfigs).map(cfgName=>{
            if(baseConfigs.hasOwnProperty(cfgName))
              configs[cfgName].field = { ...baseConfigs[cfgName].field, ...userConfigs[cfgName].field };
            else configs[cfgName] = userConfigs[cfgName];
          })
        }
      }

      const options = [...Object.keys(configs).map(configName=>configs[configName].field)];

      return options;
    }
 
     app.customFields.register({
       name: "CKEditor",
       type: "richtext",
       pluginId: pluginId,
       icon: CKEditorIcon,
       intlLabel: {
         id: pluginId + ".label",
         defaultMessage: "CKEditor 5",
       },
       intlDescription: {
         id: pluginId + ".description",
         defaultMessage: "The rich text editor for every use case",
       },
       components: {
         Input: async () => import("./components/Input"),
       },
       options: {
         base: [
           {
             intlLabel: {
               id: pluginId + ".preset.label",
               defaultMessage: "Choose editor version",
             },
             description: {
               id: pluginId + ".preset.description",
               defaultMessage: " ",
             },
             name: "options.preset",
             type: "select",
             options: setOptions(),
           },
         ],
         advanced: [
           {
             sectionTitle: null,
             items: [
               {
                 name: "required",
                 type: "checkbox",
                 intlLabel: {
                   id: pluginId + ".required.label",
                   defaultMessage: "Required field",
                 },
                 description: {
                   id: pluginId + "required.description",
                   defaultMessage:
                     "You won't be able to create an entry if this field is empty",
                 },
               },
               {
                 name: "options.maxLengthCharacters",
                 type: "checkbox-with-number-field",
                 intlLabel: {
                   id: pluginId + ".maxLength.label",
                   defaultMessage: "Maximum length (characters)",
                 },
               }
 
             ],
           },
         ],
         validator: (args) => ({
           preset: yup.string().required({
             id: pluginId + ".preset.error.required",
             defaultMessage: "Editor preset is required",
           }),
         }),
       },
     });
   }
 };
 