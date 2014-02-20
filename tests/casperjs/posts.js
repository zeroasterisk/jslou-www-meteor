/**
 * Testing Login & Posts Interface
 *
 * Run with casperjs test tests/admin.js
 *  or just casperjs test tests
 */

// load in basic utils (useful for dumping objects)
var utils = require('utils');
// load in some global init lib + config
var init = require('init');
var cfg = init.cfg();
casper.options = utils.mergeObjects(casper.options, cfg.casperOptions);
casper.test.options = utils.mergeObjects(casper.test.options, cfg.testerOptions);



/**
 * Dump/Debug console.log() JS from the scripted browser
casper.on('remote.message', function(msg) { utils.dump(msg); });
*/


/**
 * Test Suite
 */
casper.test.begin('CasperJS:Posts', 5, function suite(test) {
  // test fail setup
  test.on('fail', function(failure) {
    init.snapshot(this);
    casper.echo('FAIL(custom)');
    utils.dump(failure);
    casper.capture('../casperjs/fail.png');
  });

  casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');
  /* -login:load:fill:submit- */
  //casper.start(cfg.url, function() {
  casper.start('http://localhost:3000/', function() {
    // wait .1 sec, because we can
    this.wait(100);
    // take a screenshot: <timestamp>-<counter>-<title>.png (see init.js)
    init.snapshot(this);
    // Regular Expression Matching on URL
    //   or simple string matching == indexOf()
    this.test.assertUrlMatch(/^https?:\/\/[^\/]+\/$/, 'url is root URL');
    // simple string matching
    test.assertTitle('JS Lou', 'title is good');
  });
  /**
   * we need to wait for it to startup...
   *   we could use evaluate() to ensure that Meteror
   *   waitFor this.evaluate() to return TRUE, then go to then()
   *     there is a timeout() if it doesn't
   */
  casper.waitFor(function check() {
    // casper.evaluate()
    //   runs a function on the browser and returns the response
    return this.evaluate(function() {
      // Meteror.status() returns an object { connected: (boolean) }
      //   http://docs.meteor.com/#meteor_status
      return Meteor.status().connected;
    });
  }, function then() {
    init.snapshot(this);
    test.assertExists('#login-sign-in-link', "login link is found");
  }, function timeout() {
    this.capture('../casperjs/timeout.png');
    this.echo('TIMEOUT loading init');
    var status = this.evaluate(function() {
      return Meteor.status().status;
    });
    this.echo('Meteor status is' + status);
    this.exit();
  });
  /* -sign up- */
  casper.thenClick('#login-sign-in-link', function() {
    init.snapshot(this);
    test.assertExists('#login-email', 'login-email input is found');
    test.assertExists('#login-password', 'login-password input is found');
    test.assertExists('#login-buttons-password', 'login-buttons-password is found');
    test.assertExists('#signup-link', 'signup-link is found');
  });
  casper.thenClick('#signup-link', function() {
    init.snapshot(this);
    // form changes a bit, but DOM elements are the same

    /* -- if we had a form... :/ --
    this.fillSelectors('form[action="/users/login"]', {
      '#login-email': 'demoADAdmin@AlliedHealthMedia.com',
      '#login-password': 'billrocks'
    }, true);
    */
    var now = new Date();
    this.sendKeys('#login-email', 'CasperTest' + now.getTime() + '@example.com');
    this.sendKeys('#login-password', 'CasperTest');
    init.snapshot(this);
    // can also click from inside the form
    this.click('#login-buttons-password');
    init.snapshot(this);
  });
  /**
   * pretend we need to wait for AJAX
   *   waitFor this.evaluate() to return TRUE, then go to then()
   *     there is a timeout() if it doesn't
   */
  casper.waitFor(function check() {
    return this.evaluate(function() {
      return document.querySelectorAll('#login-name-link').length > 0;
    });
  }, function then() {
    init.snapshot(this);
    test.assertExists('#login-name-link', 'logged-in-link is found');
    init.snapshot(this);
  }, function timeout() {
    this.capture('../casperjs/timeout.png');
    this.echo('TIMEOUT loading add user form');
    this.exit();
  });

  /**
   * Now lets just poke around the Posts inteface
   */
  casper.then(function() {
    test.assertExists('a[href="/posts"]', 'posts link is found');
  });
  casper.thenClick('a[href="/posts"]', function() {
    init.snapshot(this);
    test.assertExists('.content.container .post h3', 'found a post');
  });

  /* -- */
  casper.run(function() {
    //this.echo("running");
    //test.done(1)
    this.exit();
  });
});
