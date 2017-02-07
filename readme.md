# dir-walk

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]

 Walk a directory tree recursively with different implementations:
 - Sync Breadth-First Traversal
 - Sync Depth-First Traversal
 - Async using callbacks (Node v4)
 - Async using generators (Node v5)
 - Async using promises (Node v6)
 - Async using async/await (Node v8)


## Install

```
$ yarn add dir-walk
```

## Tests

```
$ yarn test
```

## Examples

```js
const walk = require('dir-walk');

// contents will like {filenames: [list], dirnames: [list], errors: [list]}

walk('/my-dir', function(contents) {
  console.log(contents);
});

// By default sync use Breadth-first Traversal
let contents = walk.sync('/my-dir');

// To use Sync Depth-first Traversal
let contents = walk.sync('/my-dir', {dfs: true});
```

## TODO
  - Add other implementations
   - Promises (Node v4.7.2)
   - Generators (Node v5.11.0)
   - Async/await (Node v8.0.0)
  - Provide option for recursive & non-recursive version
  - Provide option to follow links
  - Check memory for callback-impl for large nested directories due to
    the merging logic.
  - Put a limit for max recursion to avoid stackoverflow.
  - Ensure the asyncs impls do not exceed max file descriptor limit on
    Linux.
  - Put a max cap on memory because the results stored in objects.
  - Provide option to skip non regular files like socket, device file,
    named pipe
  - Check what invalid inode look like
  - Avoid traversing the full file system, like dir = '/' or C://
  - Check different file systems (HFS+, ReFS, NTFS, etc..) handling for
    - Case senstivity & preservation
    - Unicode preservation
    - Hidden files and directories
  - Check support for external drive, USB or network drive
  - Check support of multiple filesystem mounted in the same working tree

## License

MIT © [Laith Shadeed](https://l3.io)
