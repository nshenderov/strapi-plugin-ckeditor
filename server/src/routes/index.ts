export default {
  config: {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/config/upload',
        handler: 'config.getUploadConfig',
      },
      {
        method: 'GET',
        path: '/config/ckeditor',
        handler: 'config.getCKEditorConfig',
        config: {
          auth: false,
        },
      },
    ],
  },
};
