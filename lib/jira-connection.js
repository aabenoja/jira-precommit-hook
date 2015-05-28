'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getJiraAPI = getJiraAPI;

var _jiraConfigurationJs = require('./jira-configuration.js');

var _jira = require('jira');

function promisify(func) {
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Promise(function (fulfill, reject) {
      args.push(function (error, result) {
        if (error) {
          return reject(error);
        } else {
          fulfill(result);
        }
      });

      func.apply(_this, args);
    });
  };
}

Object.keys(_jira.JiraApi.prototype).forEach(function (key) {
  var currentProperty = _jira.JiraApi.prototype[key];

  if (typeof currentProperty === 'function') {
    _jira.JiraApi.prototype[key] = promisify(currentProperty);
  }
});

//Grabs data from files and returns a JIRA connection object wrapped in promise

function getJiraAPI(configPath) {
  return (0, _jiraConfigurationJs.getAPIConfig)(configPath).then(function (_ref) {
    var projectName = _ref.projectName;
    var protocol = _ref.protocol;
    var host = _ref.host;
    var port = _ref.port;
    var version = _ref.version;
    var verbose = _ref.verbose;
    var strictSSL = _ref.strictSSL;

    var jiraClient = new _jira.JiraApi(protocol, host, port, '', '', version, verbose, strictSSL);

    //Temporary hack until resolved: https://github.com/steves/node-jira/pull/107
    jiraClient.doRequest = function (options, callback) {
      jiraClient.request(options, callback);
    };

    jiraClient.projectName = projectName;

    return jiraClient;
  });
}