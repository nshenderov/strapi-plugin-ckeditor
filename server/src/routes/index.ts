export default {
  config: {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/config/ckeditor',
        handler: 'configController.getConfig',
        config: {
          auth: false,
        },
      },
    ],
  },
};
