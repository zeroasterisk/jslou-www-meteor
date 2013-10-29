/**
 * Users are built into Meteor
 * This is a group of "Members" which can be linked to Users
 * This is how we grant "rights" to users, etc.
 *
 */

Members = new Meteor.Collection('members');

/**
 * Is a user a member?
 *
 * @param object user
 * @return boolean
 */
Members.is = function(user) {
  found = Members.find({ userId: Members.userId(user), isMember: true });
  return (found.count() == 1);
}

/**
 * Is a user a Moderator?
 *
 * @param object user
 * @return boolean
 */
Members.isModerator = function(user) {
  found = Members.find({ userId: Members.userId(user), isModerator: true });
  return (found.count() == 1);
}

/**
 * Is a user an Admin?
 *
 * @param object user
 * @return boolean
 */
Members.isAdmin = function(user) {
  found = Members.find({ userId: Members.userId(user), isAdmin: true });
  return (found.count() == 1);
}

/**
 * internal helper method, simplifying getting a user object back
 *   if on client, and empty/null/undefined was passed in,
 *   we get from the current logged in user
 *
 * @param mixed user or null
 * @return string userId or null
 */
Members.userId = function(user) {
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


