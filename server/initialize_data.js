 Meteor.startup(function () {
    if (Posts.find().count() === 0) {
      Posts.insert({
        _id: "post001",
        name: "Meteor is Awesome",
        date: '2013-02-04',
        isPublic: true,
        slug: "initial-post-1",
        short: "JSLou is playing with Meteor, and we think it's cool.",
        body: "<p>Hello World.</p><p>This is some example content.  it is defined in server/initialize_data.js - but you should delete it production... it only creates this record if there are no other records in Posts."
      });
      Posts.insert({
        _id: "post002",
        name: "JavaScript is now cool",
        date: moment().format('YYYY-MM-DD'),
        isPublic: true,
        slug: "initial-post-2",
        short: "JavaScript may have some issues and a sorid history to boot... but it's pretty awesome.",
        body: '<p>As communicated best by this <strong>excellent</strong> 4 minute video:' +
          '<p><a href="https://www.destroyallsoftware.com/talks/wat">WAT</a> <em>A lightning talk by Gary Bernhardt from CodeMash 2012</em>' +
          '<p>JavaScript certainly has had a few issues.  Moreso on older browsers.  But in the age of NodeJS and HTML5 and modern browsers, it\'s a brave new world.'
      });
    }
  });
