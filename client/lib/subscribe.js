
Meteor.subscribe('settings', function() {
});
Meteor.subscribe('public', function() {
});

// dynamic subscriptions
Deps.autorun(function () {
  Meteor.subscribe('member', function() {
  });
  Meteor.subscribe('moderator', function() {
  });
});
