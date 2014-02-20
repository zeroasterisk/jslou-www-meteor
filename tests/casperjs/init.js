/*global CasperError, console, exports, phantom, patchRequire, require:true*/

var require = patchRequire(require);
var utils = require('utils');

/**
 * Global Config
 */
function cfg() {
  "use strict";
  // TODO: determine url automatically?
  var date = new Date();
  var urls = {
    devlocal: 'https://localhost:3000',
    dev: 'https://jslou.meteor.com',
    prod: 'https://jslou.org'
  };
  return {
    //  URL to the environment being tested (config above: urls)
    //   TODO: any way to make this dynamic based on command line switch?
    url: urls.devlocal,
    casperOptions: {
      // special injections for snapshot()
      epoch: date.getTime(),
      snapshot_int: 0,
      // Setup Casper
      verbose: false,
      logLevel: 'debug',
      viewportSize: {width: 1024, height: 768}
      //viewportSize: {width: 800, height: 600}
    },
    testerOptions: {
      concise:  false,  // concise output?
      failFast: true,  // terminates a suite as soon as a test fails?
      failText: "FAIL", // text to use for a failed test
      passText: "PASS", // text to use for a succesful test
      skipText: "SKIP", // text to use for a skipped test
      pad:      80    , // maximum number of chars for a result line
      warnText: "WARN"  // text to use for a dubious test
    }
  };
};
exports.cfg = cfg;

/**
 * Automate snapshots - with timestamp and counter
 *
 * @param object casper
 * @return unknown
 */
function snapshot(casper) {
  "use strict";
  casper.options.snapshot_int++;
  var name = casper.getTitle()
  name = name.replace(/[^a-zA-Z0-9]/g, '');
  name = String(casper.options.epoch) + '-' + String(casper.options.snapshot_int) + '-' + name + '.png';
  //casper.echo('  snapshot: tmp/casperjs/' + name)
  return casper.capture('../casperjs/' + name)
};
exports.snapshot = snapshot;


