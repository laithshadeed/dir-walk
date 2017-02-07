var test = require('ava'),
  m = require('./');

/* eslint one-var: 0 */
var output = {
  dirnames: [
    'fixtures/ok-dir',
    'fixtures/ok-dir/valid-dir'
  ],
  filenames: [
    'fixtures/normal-file',
    'fixtures/ok-dir/im-link-to-valid-dir',
    'fixtures/ok-dir/valid-dir/im-borken-link',
    'fixtures/ok-dir/valid-dir/im-circular-link',
    'fixtures/ok-dir/valid-dir/im-outsider-dir-link',
    'fixtures/ok-dir/valid-dir/im-outsider-file-link'
  ],
  errors: []
};

test.cb('callback-impl', function(t) {
  m('fixtures', function(result) {
    result.dirnames.sort();
    result.filenames.sort();
    t.deepEqual(result, output);
    t.end();
  });
});

test('sync-impl-dfs', function(t) {
  t.deepEqual(m.sync('fixtures', {dfs: true}), output);
});

test('sync-impl-bfs', function(t) {
  t.deepEqual(m.sync('fixtures'), output);
});

