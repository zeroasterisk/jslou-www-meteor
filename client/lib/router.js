/**
 * URL Routing
 *   Handled by Iron Router
 *   https://github.com/EventedMind/iron-router
 *
 */
Router.configure({
  layout: 'layout',
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
});
