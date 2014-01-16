/**
 * This is the editing interface for Posts
 *   In addition to the name, date, etc
 *     the body should be edited as markdown and a live preview would be nice
 *
 * TODO: switch editor to this
 *   https://github.com/timsayshey/Ghost-Markdown-Editor
 *   http://epiceditor.com/ (this is a far second choice)
 */
Template.posts_admin_editor.helpers({
  preview: function() {
    return Session.get('MEbody');
  }
});
Template.posts_admin_editor.events({
  'submit form': function(e) {
    var id = $(e.target).data('id');
    console.log('submit', id, $(e.target).serialize());
    Posts.update(id, $(e.target).serialize());
    return false;
  },
  'keyup #MEbody': function(e) {
    Session.set('MEbody', $(e.target).val());
  }
});
Template.posts_admin_editor.rendered = function() {
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

