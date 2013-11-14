/**
 * Server specific config *can* go here
 *
 * WARNING: this is a public repo, post no secure information here
 *
 * (security through obfuscation = not security)
 *
 */


Meteor.startup(function () {
  BrowserPolicy.content.allowInlineScripts();
  BrowserPolicy.content.allowOriginForAll('netdna.bootstrapcdn.com');
});


