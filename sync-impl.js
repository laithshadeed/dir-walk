'use strict';
var fs = require('fs'),
  path = require('path');

/**
 * It walks a directory using breadth-first algorithm
 * @param {string} dir - The directory you want to traverse
 * @return {object} contents - The format is {filenames: [], dirnames: [], errors: []}
 */
function walkSyncBFS(dir) {
  var contents = {filenames: [], dirnames: [], errors: []},
    todo = [dir], myDir, myPath, stat, entries, i;

  while ((myDir = todo.shift())) {
    try {
      entries = fs.readdirSync(myDir);
    } catch (e) {
      contents.errors.push(e);
      continue;
    }

    for (i = 0; i < entries.length; i += 1) {
      myPath = path.join(myDir, entries[i]);

      try {
        stat = fs.lstatSync(myPath);
      } catch (e) {
        contents.errors.push(e);
        continue;
      }

      if (stat.isDirectory()) {
        contents.dirnames.push(myPath);
        todo.push(myPath);
      } else {
        contents.filenames.push(myPath);
      }
    }
  }

  return contents;
}

/**
 * It walks a directory using depth-first algorithm
 * @param {string} dir - The directory you want to traverse
 * @return {object} contents - The format is {filenames: [], dirnames: [], errors: []}
 */
function walkSyncDFS(dir) {
  var contents = {filenames: [], dirnames: [], errors: []};

  /**
   * The main recursive function that will visit nested directories
   * @param {string} dir - current directory
  * @return {object} contents - The format is {filenames: [], dirnames: [], errors: []}
   */
  function visitSync(dir) {
    var entries, i, myPath, stat;

    try {
      entries = fs.readdirSync(dir);
    } catch (e) {
      contents.errors.push(e);
      return contents;
    }

    for (i = 0; i < entries.length; i += 1) {
      try {
        myPath = path.join(dir, entries[i]);
        stat = fs.lstatSync(myPath);
        if (stat.isDirectory()) {
          contents.dirnames.push(myPath);
          visitSync(myPath);
        } else {
          contents.filenames.push(myPath);
        }
      } catch (e) {
        contents.errors.push(e);
      }
    }
  }

  visitSync(dir);
  return contents;
}

/**
 * The public API. It walks a directory recursively & synchronously
 * @param {string} dir - The directory you want to traverse
 * @param {object} opts - Options to use breadth-first-search or depth-first-search {dfs: true}
 * @return {object} contents - The format is {filenames: [], dirnames: [], errors: []}
 */
function walkSync(dir, opts) {
  opts = opts || {};
  var isDFS = typeof opts.dfs === 'boolean' ? opts.dfs : false;
  return isDFS ? walkSyncDFS(dir) : walkSyncBFS(dir);
}
module.exports = walkSync;
