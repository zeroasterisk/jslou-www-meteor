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
  //BrowserPolicy.content.allowOriginForAll('code.jquery.com');
  BrowserPolicy.content.allowOriginForAll('*.google.com');
  BrowserPolicy.content.allowOriginForAll('*.googleusercontent.com');
  BrowserPolicy.content.allowOriginForAll('*.amazonaws.com');
  BrowserPolicy.content.allowOriginForAll('*.filepicker.io');
  BrowserPolicy.content.allowOriginForAll('*.filepicker.com');
  BrowserPolicy.content.allowOriginForAll('http://api.filepicker.io');
});


