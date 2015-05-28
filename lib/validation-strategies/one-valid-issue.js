'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = apply;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _issueStrategiesIndexJs = require('../issue-strategies/index.js');

var _issueStrategiesIndexJs2 = _interopRequireDefault(_issueStrategiesIndexJs);

var _promiseUtilsJs = require('../promise-utils.js');

var promiseUtils = _interopRequireWildcard(_promiseUtilsJs);

function validateStrategies(issueKey, jiraClientAPI) {
  return jiraClientAPI.findIssue(issueKey).then(function (content) {
    return _issueStrategiesIndexJs2['default'][content.fields.issuetype.name].apply(content, jiraClientAPI);
  });
}

function apply(issues, jiraClientAPI) {
  return promiseUtils.anyPromise(issues.map(function (i) {
    return validateStrategies(i, jiraClientAPI);
  }));
}

module.exports = exports['default'];