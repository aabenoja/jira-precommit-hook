'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _bugMaintenanceJs = require('./bug-maintenance.js');

var bugMtStrat = _interopRequireWildcard(_bugMaintenanceJs);

var _initiativeJs = require('./initiative.js');

var initStrat = _interopRequireWildcard(_initiativeJs);

var _epicJs = require('./epic.js');

var epicStrat = _interopRequireWildcard(_epicJs);

var _storyJs = require('./story.js');

var storyStrat = _interopRequireWildcard(_storyJs);

exports['default'] = {
  Initiative: initStrat,
  Epic: epicStrat,
  Story: storyStrat,
  'Sub-task': storyStrat,
  Maintenance: bugMtStrat,
  Bug: bugMtStrat
};
module.exports = exports['default'];