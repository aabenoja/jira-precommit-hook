'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateAPIConfig = validateAPIConfig;
exports.validateAuthentication = validateAuthentication;
exports.getAPIConfig = getAPIConfig;
exports.getAuthentication = getAuthentication;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fsUtilsJs = require('./fs-utils.js');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function validateAPIConfig(config) {
  // validate that this is a proper .jirarc file
  if (!config.host) {
    throw new Error('.jirarc missing host url. Please check the README for details');
  }
  if (!config.projectName) {
    throw new Error('.jirarc missing project name. Please check the README for details');
  }
  var defaults = {
    protocol: 'http',
    port: 80,
    version: 2,
    verbose: false,
    strictSSL: true
  };
  config = _lodash2['default'].defaults(config, defaults);
  return config;
}

function validateAuthentication(authConfig) {
  // validate that there are proper credentials
  if (!authConfig.username) {
    throw new Error('.userconfig missing username');
  }
  if (!authConfig.password) {
    throw new Error('.userconfig missing password');
  }
  return authConfig;
}

function getAPIConfig(filePath) {
  return (0, _fsUtilsJs.readJSON)(filePath).then(function (config) {
    return validateAPIConfig(config);
  });
}

function getAuthentication(filePath) {
  return (0, _fsUtilsJs.readJSON)(filePath).then(function (config) {
    return validateAuthentication(config);
  });
}