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
    var data = {};
    $.each($(e.target).serializeArray(), function() {
      data[this.name] = this.value;
    });
    if (id) {
      console.log('submit:update', id, data);
      Session.set('post_id', id);
      Posts.update(id, {$set: data}, Template.posts_admin_editor.saveCallback);
      return false;
    }
    console.log('submit:insert', data);
    Posts.insert(data, Template.posts_admin_editor.saveCallback);
    return false;
  }
});
Template.posts_admin_editor.saveCallback = function(error, results) {
  if (error) {
    return Notify.callback(error, results);
  }
  if (_.isNumber(results)) {
    Notify.success('Saved Update');
    results = Session.get('post_id');
    return Router.go('/admin/posts/' + results);
  }
  Notify.success('Saved Insert');
  return Router.go('/admin/posts/' + results);
}

