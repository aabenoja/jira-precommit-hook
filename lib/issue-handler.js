'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.issueStrategizer = issueStrategizer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _validationStrategiesIndex = require('./validation-strategies/index');

var _validationStrategiesIndex2 = _interopRequireDefault(_validationStrategiesIndex);

function issueStrategizer(issues, jiraClientAPI) {
  return Promise.all(_validationStrategiesIndex2['default'].map(function (s) {
    return s(issues, jiraClientAPI);
  })).then(function () {
    return true;
  });
}