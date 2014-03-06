Template.editor.helpers({
  previewShort: function() {
    return Session.get('short');
  },
  previewBody: function() {
    return Session.get('body');
  }
});
Template.editor.events({
  'keyup #body': function(e) {
    Session.set('body', $(e.target).val());
  },
  'keyup #short': function(e) {
    Session.set('short', $(e.target).val());
  }
});
Template.editor.rendered = function() {
    if ($('#body').val() == '') {
      $('#body').val( Session.get('body') );
    }
  // Marked options
  marked.setOptions({
    langPrefix: '',
    breaks: true,
    gfm: true,
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
  });
};

