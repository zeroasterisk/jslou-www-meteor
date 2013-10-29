Template.footer.events({
  'click .devUserUpgrade': function() {
    Meteor.call('devUserUpgrade', Meteor.userId(), Notify.callback);
  }
});
