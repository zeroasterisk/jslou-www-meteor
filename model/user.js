/**
 * Users are built into Meteor
 * We use 'meteor-roles' to control permissions on our Users
 * @link https://github.com/alanning/meteor-roles
 *
 * This is a convenience wrapper
 *
 * These are some extra tools we can use to determine User access,
 * And to get extra stuff from our Users.role
 */
User = {};

/**
 * Is a user a member?
 *
 * @param object user
 * @return boolean
 */
User.isMember = function(user) {
  return Roles.userIsInRole( User.user(user), ['admin', 'member']);
}

/**
 * Is a user a Moderator?
 *
 * @param object user
 * @return boolean
 */
User.isModerator = function(user) {
  return Roles.userIsInRole( User.user(user), ['admin', 'moderator']);
}

/**
 * Is a user an Admin?
 *
 * @param object user
 * @return boolean
 */
User.isAdmin = function(user) {
	console.log('User.isAdmin', User.user(user).fetch(), Roles.userIsInRole( User.user(user), ['admin']));
  return Roles.userIsInRole( User.user(user), ['admin']);
}

/**
 * internal helper method, simplifying getting a user object back
 *   if on client, and empty/null/undefined was passed in,
 *   we get from the current logged in user
 *
 * @param mixed user or null
 * @return string userId or null
 */
User.userId = function(user) {
  if (Meteor.isServer) {
    // if we are on the server, we don't know who we are logged in as
    //   so we only use what was passed in, it should be a 'user'
    if (_.isObject(user)) {
      return user._id;
    }
    if (_.isString(user)) {
      return user;
    }
    // are we initiated via DDP (with access to Auth, Meteor.call)
    var currentInvocation = DDP._CurrentInvocation.get();
    if (currentInvocation) {
      // return logged in user as passsed through
      return Meteor.userId();
    }
    return null;
  }
  if (_.isNull(user) || _.isUndefined(user)) {
    user = Meteor.user();
  }
  if (_.isObject(user)) {
    return user._id;
  }
  if (_.isString(user)) {
    return user;
  }
  return null;
};

/**
 * convenience wrapper for Meteor.users
 */
User.user = function(userId) {
  return Meteor.users.find({ userId: User.userId(userId) });
}
