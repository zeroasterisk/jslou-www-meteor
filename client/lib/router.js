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
  this.route('aboutUs');
  // Member moderation
  // Member moderation
  this.route('memberships', {path: '/memberships'});
  this.route('membership', {
    path: '/membership/:id',
    data: function() { return Members.findOne( this.params.id ); }
  });
  this.route('user', {
    path: '/user/:id',
    data: function() { return Meteor.users.findOne( this.params.id ); }
  });
});
