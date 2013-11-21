/**
 * URL Routing
 *   Handled by Iron Router
 *   https://github.com/EventedMind/iron-router
 *
 */
Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
  renderTemplates: {
    /* render the templated named footer to the 'footer' yield */
    'footer': { to: 'footer' },
    /* render the template named sidebar to the 'sidebar' yield */
    'sidebar': { to: 'sidebar' }
  }
});
Router.map(function() {
  this.route('home', {path: '/'});
  this.route('about');
  this.route('contact');
  // Member moderation
  // Member administration
  this.route('users_index', {
    // TODO: implement security here
    path: '/admin/users',
    data: function() { return Meteor.users.find( ); }
  });
  this.route('membership', {
    path: '/membership/:id',
    data: function() { return Meteor.users.findOne( this.params.id ); }
  });
  this.route('user', {
    path: '/user/:id',
    data: function() { return Meteor.users.findOne( this.params.id ); }
  });
  this.route('posts_admin_editor', {
    path: '/admin/posts/:id',
    data: function() { return Posts.findOne( this.params.id ); }
  });
  this.route('posts_admin_editor', {
    path: '/admin/posts/new'
  });
  this.route('posts_admin_index', {
    path: '/admin/posts',
    data: function() { return Posts.find( ); }
  });
});
