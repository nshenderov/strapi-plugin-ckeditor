module.exports = [
  {
    method: "GET",
    path: "/config/ckeditor",
    handler: "config.getConfig",
    config: {
      auth: false,
    },
  },
];
