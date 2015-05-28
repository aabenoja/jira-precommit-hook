'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.apply = apply;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _jiraOperationsJs = require('../jira-operations.js');

var jiraOperations = _interopRequireWildcard(_jiraOperationsJs);

function areParentsValid(baseIssueKey, parentIssue, jiraClientAPI) {
  return parentIssue.then(function (content) {
    if (content === null || content.fields.status.statusCategory.colorName !== 'yellow') {
      return Promise.reject(new Error('Cannot commit issue ' + baseIssueKey + ' because parent issue ' + content.key + ' is not available to commit against.'));
    } else if (content.fields.issuetype.name === 'Initiative') {
      return Promise.resolve(true);
    }
    return areParentsValid(baseIssueKey, jiraOperations.findParent(content, jiraClientAPI), jiraClientAPI);
  });
}

function apply(issue, jiraClientAPI) {
  if (issue === null || issue.fields.status.statusCategory.colorName !== 'yellow') {
    return Promise.reject(new Error('Issue ' + issue.key + ' is not open to commit against'));
  }

  return areParentsValid(issue.key, jiraOperations.findParent(issue, jiraClientAPI), jiraClientAPI);
}