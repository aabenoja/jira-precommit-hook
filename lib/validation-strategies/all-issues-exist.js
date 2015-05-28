"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = apply;

function apply(issues, jiraClientAPI) {
  var issueMap = issues.map(function (issue) {
    return jiraClientAPI.findIssue(issue);
  });

  //On error, throws: "Error: Issue {key} does not exist."
  return Promise.all(issueMap).then(function () {
    return true;
  });
}

module.exports = exports["default"];