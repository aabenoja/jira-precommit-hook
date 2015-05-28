'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.findParentFolder = findParentFolder;
exports.copyHookFiles = copyHookFiles;
exports.getFilePath = getFilePath;
exports.readJSON = readJSON;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function findParentFolder(startDir, parentDirName) {
  var currentDir = startDir;

  while (_fs2['default'].existsSync(currentDir)) {
    if (_fs2['default'].existsSync(_path2['default'].join(currentDir, parentDirName))) {
      currentDir = _path2['default'].join(currentDir, parentDirName);
      break;
    } else {
      var tempPath = currentDir;
      currentDir = _path2['default'].normalize(_path2['default'].join(currentDir, '/..'));

      if (currentDir === tempPath) {
        throw new Error('Cannot find ' + parentDirName);
      }
    }
  }

  return currentDir;
}

function copyHookFiles(gitDirectory) {
  console.log('copying hooks to: ' + gitDirectory);
  return new Promise(function (fulfill, reject) {
    _fs2['default'].createReadStream(_path2['default'].resolve(_path2['default'].join(__dirname, '../hooks/commit-msg'))).pipe(_fs2['default'].createWriteStream(_path2['default'].join(gitDirectory, '/hooks/commit-msg'))).on('close', function (error, result) {
      if (error) {
        reject(error);
      } else {
        fulfill(result);
      }
    });
  });
}

function getFilePath(startDir, desiredFileName) {
  var currentDir = startDir;

  while (_fs2['default'].existsSync(currentDir)) {
    if (_fs2['default'].existsSync(_path2['default'].join(currentDir, desiredFileName))) {
      currentDir = _path2['default'].join(currentDir, desiredFileName);
      break;
    } else {
      var tempPath = currentDir;
      currentDir = _path2['default'].normalize(_path2['default'].join(currentDir, '/..'));

      if (currentDir === tempPath) {
        throw new Error('Cannot find ' + desiredFileName);
      }
    }
  }

  return currentDir;
}

function readJSON(filePath) {
  return _fsPromise2['default'].readFile(filePath).then(function (content) {
    return JSON.parse(content);
  });
}
