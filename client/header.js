Template.header.events({
  'click a': function(e) {
    $('#nav-0 .active').removeClass('active');
    $(e.currentTarget).closest('li').addClass('active');
  }
});
