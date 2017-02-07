'use strict';
var fs = require('fs'),
  path = require('path');

/**
 * This function will make it possible to looper over async items and aggreagte the results
 * It is not generic functions, it assumes the format of {filenames: [], dirnames: [], errors: []}
 * @param {array} list - async items to iterate over
 * @param {function} iteratee - the async function needs to be called for each item in the list
 * @param {function} end - this function  will be called after all items has been processed
 */
function forEachEntry(list, iteratee, end) {
  var max = list.length, count = 0, i,
    contents = {filenames: [], dirnames: [], errors: []};

  /**
   * This function needs to be called to signal to forEachEntry that I'm processing the current item
   * @param {object} item - Format: {filenames: [], dirnames: [], errors: []}
   */
  function next(item) {
    count += 1;
    for (var k in contents) {
      if (contents.hasOwnProperty(k)) {
        contents[k] = item[k].concat(contents[k]);
      }
    }
    if (count === max) end(contents);
  }

  for (i = 0; i < max; i += 1) iteratee(list[i], next);
}

/**
 * The public API. It walks a directory recursively & asynchronously
 * @param {string} currentDir - The directory you want to traverse
 * @param {function} end - The callback function that gives you the result
 */
function walk(currentDir, end) {
  var currentDirContents = {filenames: [], dirnames: [], errors: []};
  fs.readdir(currentDir, function(err, entries) {
    if (err) {
      currentDirContents.errors.push(err);
      return end(currentDirContents);
    }

    var max = entries.length - 1;
    if (max <= 0) return end(currentDirContents);

    forEachEntry(entries, function(entry, next) {
      var myPath = path.join(currentDir, entry);
      fs.lstat(myPath, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(myPath, function(contents) {
            contents.dirnames.push(myPath);
            next(contents);
          });
        } else {
          var contents = {filenames: [], dirnames: [], errors: []};
          if (err) {
            contents.errors.push(err);
          } else {
            contents.filenames.push(myPath);
          }
          next(contents);
        }
      });
    }, function(nestedDirsContents) {
      for (var k in nestedDirsContents) {
        if (currentDirContents.hasOwnProperty(k)) {
          currentDirContents[k] = nestedDirsContents[k].concat(currentDirContents[k]);
        }
      }
      end(currentDirContents);
    });
  });
}
module.exports = walk;
