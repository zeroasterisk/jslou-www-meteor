/**
 * This is the editing interface for Events
 *   In addition to the name, date, etc
 *     the body should be edited as markdown and a live preview would be nice
 *
 * TODO: switch editor to this
 *   https://github.com/timsayshey/Ghost-Markdown-Editor
 *   http://epiceditor.com/ (this is a far second choice)
 */
Template.events_admin_editor.helpers({
  preview: function() {
    return Session.get('MEbody');
  }
});
Template.events_admin_editor.events({
  'submit form': function(e) {
    var id = $(e.target).data('id');
    console.log('submit', id, $(e.target).serialize());
    Events.update(id, $(e.target).serialize());
    return false;
  },
  'keyup #MEbody': function(e) {
    Session.set('MEbody', $(e.target).val());
  }
});
Template.events_admin_editor.rendered = function() {
    if ($('#MEbody').val() == '') {
      $('#MEbody').val( Session.get('MEbody') );
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

