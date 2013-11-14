Meteor.publish('currentUser', function() {
  return Meteor.users.find(this.userId,
    { fields: { 'roles': 1 } }
  );
});


Meteor.publish('public', function() {
  return [
    Posts.find({isPublic: true}),
    Events.find({isPublic: true})
  ];
});

Meteor.publish('member', function() {
  if (!_.isString(this.userId) || this.userId == '') {
    //console.log('publish member exit 1');
    return [];
  }
  if (!User.isMember(this.userId)) {
    //console.log('publish member exit 2');
    return [];
  }
  //console.log('publish member GOOD');
  return [
    Meteor.users.find(),
    Posts.find({userId: this.userId}),
    Events.find({userId: this.userId})
  ];
});

Meteor.publish('moderator', function() {
  if (!_.isString(this.userId) || this.userId == '') {
    return [];
  }
  if (!User.isModerator(this.userId)) {
    return [];
  }
  return [
    Meteor.users.find(),
  ];
});

Meteor.publish('admin', function() {
  if (!_.isString(this.userId) || this.userId == '') {
    return [];
  }
  if (!User.isAdmin(this.userId)) {
    return [];
  }
  return [
    Meteor.users.find(),
  ];
});

