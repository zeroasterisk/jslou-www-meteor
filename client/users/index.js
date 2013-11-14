
Template.users_index.helpers({
  users: function() {
    var sort = Session.get('sort');
    if (!_.isObject(sort)) {
      sort = { 'profile.created': 1, 'profile.name': 1 };
    }
    return Meteor.users.find({

    }, { sort: sort });
  }
});
