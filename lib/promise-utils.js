'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.anyPromise = anyPromise;

function anyPromise(arrayOfPromises) {
  if (arrayOfPromises === undefined) {
    return Promise.reject(new Error('No arguments provided'));
  }

  if (!(arrayOfPromises instanceof Array) || arrayOfPromises.length === 0) {
    return Promise.reject(new Error('Argument is not a non-array'));
  }

  if (arrayOfPromises.length === 1) {
    return arrayOfPromises[0];
  }

  var resolve = undefined,
      reject = undefined;
  var result = new Promise(function (x, y) {
    resolve = x;
    reject = y;
  });

  var rejects = [];

  arrayOfPromises.forEach(function (p) {
    p.then(function (x) {
      resolve(x);
    })['catch'](function (err) {
      rejects.push(err);

      if (rejects.length === arrayOfPromises.length) {
        reject(rejects);
      }
    });
  });

  return result;
}