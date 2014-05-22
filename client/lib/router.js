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
  this.route('home', {
    path: '/',
    data: {
      isHome: true
    }
  });
  this.route('about');
  this.route('contact');
  // Member moderation
  // Member administration
  this.route('users_index', {
    // TODO: implement security here
    path: '/admin/users',
    data: function() {
      return {
        users: Meteor.users.find()
      };
    }
  });
  this.route('membership', {
    path: '/membership/:id',
    data: function() {
      return {
        user: Meteor.users.findOne( this.params.id )
      };
    }
  });
  this.route('user', {
    path: '/user/:id',
    data: function() {
      return {
        user: Meteor.users.findOne( this.params.id )
      };
    }
  });
  // ------------------
  // -- POSTS
  // ------------------
  this.route('posts', {
    path: '/posts/',
    waitOn: function () {
        return Meteor.subscribe('public');
    },
    data: function() {
      return {
        posts: Posts.find()
      };
    }
  });
  this.route('post', {
    path: '/posts/:id/:slug',
    waitOn: function () {
        return Meteor.subscribe('post', this.params.id);
    },
    data: function() {
      return {
        post: Posts.findOne( this.params.id )
      }
    }
  });
  this.route('posts_admin_editor', {
    path: '/admin/posts/:id',
    waitOn: function () {
        return Meteor.subscribe('post', this.params.id);
    },
    data: function() {
      if (this.params.id == 'new') {
        return {
          post: {
          }
        };
      }
      return {
        post: Posts.findOne( this.params.id )
      }
    },
    action: function() {
      var hash = this.params.hash;
      var isFirstRun = this.isFirstRun;
      if (hash == 'delete' && this.params.id) {
        window.location.hash = '';
        if (confirm("Are you sure you want to delete this Post?")) {
          Posts.remove(this.params.id, function(error, results) {
            if (error) {
              return Notify.callback(error, results);
            }
            Notify.success('Deleted');
            Router.go('/admin/posts/');
          });
        }
      }
      this.render();
    }
  });
  this.route('posts_admin_index', {
    path: '/admin/posts',
    waitOn: function () {
        return Meteor.subscribe('posts');
    },
    data: function() {
      return {
        posts: Posts.find( )
      };
    }
  });
  // ------------------
  // -- Events
  // ------------------
  this.route('events', {
    path: '/events/',
    waitOn: function () {
        return Meteor.subscribe('events');
    },
    data: function() {
      return {
        calevents: Events.find( )
      };
    }
  });
  this.route('event', {
    path: '/events/:id/:slug',
    waitOn: function () {
        return Meteor.subscribe('event', this.params.id);
    },
    data: function() {
      return {
        calevent: Events.findOne( this.params.id )
      }
    }
  });
  this.route('events_admin_editor', {
    path: '/admin/events/:id',
    waitOn: function () {
        return Meteor.subscribe('event', this.params.id);
    },
    data: function() {
      if (this.params.id == 'new') {
        return {
          calevent: {
            name: 'JsLou Event ...',
            type: 'range',
            start: moment().add('days', 7).hour(18).minute(00).seconds(00).format('YYYY-MM-DD HH:mm'),
            stop: moment().add('days', 7).hour(20).minute(00).seconds(00).format('YYYY-MM-DD HH:mm')
          }
        };
      }
      return { calevent: Events.findOne(this.params.id) }
    },
    action: function() {
      var hash = this.params.hash;
      var isFirstRun = this.isFirstRun;
      if (hash == 'delete' && this.params.id) {
        window.location.hash = '';
        if (confirm("Are you sure you want to delete this Event?")) {
          Events.remove(this.params.id, function(error, results) {
            if (error) {
              return Notify.callback(error, results);
            }
            Notify.success('Deleted');
            Router.go('/admin/events/');
          });
        }
      }
      this.render();
    }
  });
  this.route('events_admin_index', {
    path: '/admin/events',
    waitOn: function () {
        return Meteor.subscribe('events');
    },
    data: function() {
      return {
        calevents: Events.find( )
      };
    }
  });
});
