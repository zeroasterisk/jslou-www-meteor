Template.memberships.events({
'click .makeMember': function(E) {
  Meteor.call('makeMember', this._id, Notify.callback);
return false;
}
});
Template.memberships.helpers({
  users: function() {
    var sort = Session.get('sort');
    if (!_.isObject(sort)) {
      sort = { 'profile.created': 1, 'profile.name': 1 };
    }
    return Meteor.users.find({

    }, { sort: sort });
  }
});
