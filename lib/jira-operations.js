'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.findProjectKey = findProjectKey;
exports.getEpicLinkField = getEpicLinkField;
exports.findIssueLinkParentKey = findIssueLinkParentKey;
exports.findParent = findParent;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function findProjectKey(jiraClient) {
  return jiraClient.listProjects().then(function (projects) {
    return _lodash2['default'].find(projects, function (project) {
      return project.name === jiraClient.projectName;
    }).key;
  });
}

function getEpicLinkField(jiraClient) {
  return jiraClient.listFields().then(function (fields) {
    for (var i = 0; i < fields.length; i++) {
      if (fields[i].name === 'Epic Link') {
        return fields[i].id;
      }
    }

    return Promise.reject('Cannot find Epic Link Field.');
  });
}

function findIssueLinkParentKey(issue) {
  var result = null;
  issue.fields.issuelinks.forEach(function (issueLink) {
    if (issueLink.type.name !== 'Relates') {
      return;
    }

    var linkDirection = null;

    if (issueLink.inwardIssue) {
      linkDirection = 'inwardIssue';
    } else if (issueLink.outwardIssue) {
      linkDirection = 'outwardIssue';
    }

    if (linkDirection && issueLink[linkDirection].fields.issuetype.name === 'Initiative') {
      result = issueLink[linkDirection].key;
    }
  });
  return result;
}

function findParent(issue, jiraClient) {
  switch (issue.fields.issuetype.name) {
    case 'Sub-task':
      return jiraClient.findIssue(issue.fields.parent.key);

    case 'Story':
      if (issue.fields.issuelinks) {
        var _parentKey = findIssueLinkParentKey(issue);

        if (_parentKey) {
          return jiraClient.findIssue(_parentKey);
        }
      }

      return getEpicLinkField(jiraClient).then(function (linkField) {
        return jiraClient.findIssue(issue.fields[linkField]);
      });

    case 'Epic':
      var parentKey = findIssueLinkParentKey(issue);

      return parentKey ? jiraClient.findIssue(parentKey) : Promise.reject('Cannot find parent from Epic ' + issue.key);

    default:
      return Promise.reject('' + issue.fields.issuetype.name + ' should not have a parent.');
  }
}