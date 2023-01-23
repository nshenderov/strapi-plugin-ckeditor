'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'CKEditor',
    plugin: 'ckeditor',
    type: 'richtext'
  })
};
