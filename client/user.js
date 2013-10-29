// TODO: implement a data-binding/2-way form handler
Template.user.events({
  'submit form': function(E) {
    var data = $(E.target).serialize();
    Meteor.call('userSave', data, Notify.callback);
    return false;
  }
})
