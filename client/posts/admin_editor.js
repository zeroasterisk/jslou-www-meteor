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
});
Template.posts_admin_editor.events({
  'submit form': function(e) {
    var id = $(e.target).data('id');
    e.preventDefault();
    var id = $(e.target).data('id');
    var data = {};
    $.each($(e.target).serializeArray(), function() {
      data[this.name] = this.value;
    });
    if (id.length) {
      console.log('submit:update', id, data);
      Posts.update(id, data, Template.posts_admin_editor.saveCallback);
    } else {
      console.log('submit:insert', id, data);
      Posts.insert(data, Template.posts_admin_editor.saveCallback);
    }
    return false;
  }
});
Template.posts_admin_editor.saveCallback = function(error, results) {
  if (error) {
    return Notify.callback(error, results);
  }
  Notify.success('Saved');
  Router.go('/admin/posts/' + results);
}

