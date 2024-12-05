export default {
  config: {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/config/is-responsive-dimensions',
        handler: 'configController.isResponsiveDimensions',
        config: {
          auth: false,
        },
      },
    ],
  },
};
