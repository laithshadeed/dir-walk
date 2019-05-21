var ver = process.version,
  walk;

// TOOD: do semver comparison based on when the future introduced by node as well as the its
// performance. Check out http://node.green && https://github.com/kpdecker/six-speed
// v8 official performance benchmarks: https://v8project.blogspot.nl/2017/02/v8-release-57.html
// v8 Performance plan 'ES2015 and beyond performance plan'
// https://docs.google.com/document/d/1EA9EbfnydAmmU_lM8R_uEMQ-U_v4l9zulePSBkeYWmY
if (/^v8/.test(ver)) {
  walk = require('./async-await-impl.js');
} else if (/^v6/.test(ver)) {
  walk = require('./promise-impl.js');
} else if (/^v5/.test(ver)) {
  walk = require('./generator-impl.js');
} else {
  walk = require('./callback-impl.js');
}

// TODO: Add other implementations and remove this line
walk = require('./callback-impl.js');

module.exports = walk;
module.exports.sync = require('./sync-impl.js');
