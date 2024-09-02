export default {
  config: {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/config/upload',
        handler: 'config.getUploadConfig',
        config: {
            auth: false
        },
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
