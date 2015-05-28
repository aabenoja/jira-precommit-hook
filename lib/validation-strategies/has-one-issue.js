'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = apply;

function apply(issues, jiraClientAPI) {
  if (issues.length === 0) {
    return Promise.reject(new Error('Must commit against at least one issue.'));
  }
  return Promise.resolve(true);
}

module.exports = exports['default'];