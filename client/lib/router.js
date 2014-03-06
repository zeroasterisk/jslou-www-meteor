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
    before: [
      function () {
        this.subscribe('post', this.params._id).wait();
      },
      Router.BeforeWait
    ],
    data: function() {
      return {
        posts: Posts.find()
      };
    }
  });
  this.route('post', {
    path: '/posts/:id/:slug',
    before: [
      function () {
        this.subscribe('post', this.params._id).wait();
        this.subscribe('posts'); // don't wait
      },
      Router.BeforeWait
    ],
    data: function() {
      return {
        post: Posts.findOne( this.params.id )
      }
    }
  });
  this.route('posts_admin_editor', {
    path: '/admin/posts/:id',
    before: [
      function () {
        this.subscribe('post', this.params._id).wait();
        this.subscribe('posts'); // don't wait
      },
      Router.BeforeWait
    ],
    data: function() {
      if (this.params.id == 'new') {
        return {
          post: {}
        };
      }
      return {
        post: Posts.findOne( this.params.id )
      }
      /*
    },
    action: function() {
      var params = this.params;
      var hash = this.params.hash;
      var isFirstRun = this.isFirstRun;
      */
    }
  });
  this.route('posts_admin_index', {
    path: '/admin/posts',
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
    before: [
      function () {
        this.subscribe('event', this.params._id).wait();
      },
      Router.BeforeWait
    ],
    data: function() {
      return {
        calevents: Events.find( )
      };
    }
  });
  this.route('event', {
    path: '/events/:id/:slug',
    before: [
      function () {
        this.subscribe('event', this.params._id).wait();
        this.subscribe('events'); // don't wait
      },
      Router.BeforeWait
    ],
    data: function() {
      return {
        calevent: Events.findOne( this.params.id )
      }
    }
  });
  this.route('events_admin_editor', {
    path: '/admin/events/:id',
    before: [
      function () {
        this.subscribe('event', this.params._id).wait();
        this.subscribe('events'); // don't wait
      },
      Router.BeforeWait
    ],
    data: function() {
      console.log('router: events_admin_editor', this.params);
      if (this.params.id == 'new') {
        return {
          calevent: { id: 'new' }
        };
      }
      return {
        calevent: Events.find({ _id: this.params.id })
      }
      /*
    },
    action: function() {
      var params = this.params;
      var hash = this.params.hash;
      var isFirstRun = this.isFirstRun;
      */
    }
  });
  this.route('events_admin_index', {
    path: '/admin/events',
    data: function() {
      return {
        calevents: Events.find( )
      };
    }
  });
});
// we're done waiting on all subs
Router.BeforeWait = function() {
  if (this.ready()) {
    NProgress.done();
  } else {
    NProgress.start();
    this.stop(); // stop downstream funcs from running
  }
};
