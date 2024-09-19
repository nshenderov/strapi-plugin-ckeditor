module.exports = {
  config: {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/config/ckeditor',
        handler: 'config.getConfig',
        config: {
          auth: false,
        },
      },
    ],
  },
};
