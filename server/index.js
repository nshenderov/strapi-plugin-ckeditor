'use strict';

const register = require('./register');
const controllers = require('./controllers');
const routes = require('./routes');
const services = require('./services');

module.exports = {
  register,
  controllers,
  routes,
  services
};
