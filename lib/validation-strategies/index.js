'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _allIssuesExistJs = require('./all-issues-exist.js');

var _allIssuesExistJs2 = _interopRequireDefault(_allIssuesExistJs);

var _hasOneIssueJs = require('./has-one-issue.js');

var _hasOneIssueJs2 = _interopRequireDefault(_hasOneIssueJs);

var _oneValidIssueJs = require('./one-valid-issue.js');

var _oneValidIssueJs2 = _interopRequireDefault(_oneValidIssueJs);

exports['default'] = [_hasOneIssueJs2['default'], _allIssuesExistJs2['default'], _oneValidIssueJs2['default']];
module.exports = exports['default'];