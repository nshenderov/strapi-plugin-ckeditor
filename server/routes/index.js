module.exports = [
  {
    method: 'GET',
    path: '/config/:configKey',
    handler: 'config.getConfig',
    config: { policies: [] },
  }
];
