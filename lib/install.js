'use strict';

var _fsUtilsJs = require('./fs-utils.js');

var currentPath = process.env.pwd;

try {
  (0, _fsUtilsJs.copyHookFiles)((0, _fsUtilsJs.findParentFolder)(currentPath, '.git'));
} catch (error) {
  console.log(error.message);
}