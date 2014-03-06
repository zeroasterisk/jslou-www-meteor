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
});
Template.events_admin_editor.events({
  'change input[name="type"]': function(e) {
    Session.set('type', $(e.target).val());
  },
  'change input[name="slug"]': function(e) {
    $(e.target).addClass('custom');
  },
  'keyup input[name="name"], change input[name="name"]': function(e) {
    if ($('#slug').hasClass('custom')) {
      return;
    }
    var slug = $(e.target).val();
    slug = slug.toLowerCase();
    slug = slug.replace(/[^a-z0-9]/g, '-');
    slug = slug.replace(/\-\-+/g, '-');
    slug = slug.replace(/(^\-|\-$)/g, '');
    $('#slug').val(slug);
  },
  'submit form': function(e) {
    e.preventDefault();
    var id = $(e.target).data('id');
    var data = {};
    $.each($(e.target).serializeArray(), function() {
      data[this.name] = this.value;
    });
    if (data.type == 'allday') {
      data.date = moment.utc(data.date).toDate();
      data.epoch = moment.utc(data.date).unix();
    } else {
      data.date = moment.utc(data.start).toDate();
      data.start = moment.utc(data.start).toDate();
      data.stop = moment.utc(data.stop).toDate();
      data.epoch = moment.utc(data.date).unix();
    }
    if (id.length) {
      console.log('submit:update', id, data);
      Events.update(id, data, Template.events_admin_editor.saveCallback);
    } else {
      console.log('submit:insert', id, data);
      Events.insert(data, Template.events_admin_editor.saveCallback);
    }
    return false;
  }
});
Template.events_admin_editor.saveCallback = function(error, results) {
  if (error) {
    return Notify.callback(error, results);
  }
  Notify.success('Saved');
  Router.go('/admin/events/' + results);
}

