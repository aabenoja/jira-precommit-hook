/* eslint no-process-exit:0 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getIssueReference = getIssueReference;
exports.getCommitMsg = getCommitMsg;
exports.precommit = precommit;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _issueHandler = require('./issue-handler');

var issueHandler = _interopRequireWildcard(_issueHandler);

var _jiraOperations = require('./jira-operations');

var _jiraConnection = require('./jira-connection');

var _fsUtils = require('./fs-utils');

var fsUtils = _interopRequireWildcard(_fsUtils);

require('colors');

function getIssueReference(msgToParse, prjKey) {
  var pattern = RegExp('' + prjKey + '-\\d+', 'g');
  var commentPattern = RegExp('^#.*$', 'gm');

  msgToParse = msgToParse.replace(commentPattern, '');
  var references = msgToParse.match(pattern);

  return _lodash2['default'].unique(references);
}

function getCommitMsg(path) {
  var jiraAPI = undefined,
      jiraConfigPath = undefined;

  try {
    jiraConfigPath = fsUtils.getFilePath(process.cwd(), '.jirarc');
  } catch (err) {
    return Promise.reject(new Error('.jirarc file is not found. Please refer to the readme for details about the .jirarc file'));
  }

  return Promise.all([(0, _jiraConnection.getJiraAPI)(jiraConfigPath).then(function (api) {
    return jiraAPI = api;
  }).then(function () {
    return (0, _jiraOperations.findProjectKey)(jiraAPI);
  }), _fsPromise2['default'].readFile(path, { encoding: 'utf8' })]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var projectKey = _ref2[0];
    var fileContents = _ref2[1];

    var issues = getIssueReference(fileContents, projectKey);
    return issueHandler.issueStrategizer(issues, jiraAPI);
  });
}

function precommit(path) {
  return getCommitMsg(path).then(function () {
    return 0;
  })['catch'](function (err) {
    if (typeof err === 'string') {
      console.error(err.red);
    } else if (process.env.NODE_ENV === 'development') {
      console.error(err.stack.red);
    } else {
      console.error(err.toString().red);
    }
    return 1;
  });
}