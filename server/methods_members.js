/**
 * Server only Meteor Methods for User/Membership/Admins
 */

Meteor.methods({

  /**
   * Upgrade any existing User into a Member
   * - verify the User who is doing this, is a Moderator or Admin
   * - verify User exists
   * - create Member record for this userId and assign correct rights
   *
   * @param string userId
   * @return boolean
   */
  makeMember: function(userId) {
    console.log('makeMember', userId, Meteor.userId());
    check(userId, String);
    check(Meteor.userId(), String);
    if (Meteor.userId() == userId) {
      console.log('makeMember:error:1');
      //throw new Meteor.Error(500, 'You can not make yourself a Member');
    }
    if (!User.isModerator(Meteor.userId())) {
      console.log('makeMember:error:2');
      throw new Meteor.Error(500, 'You can not grant access, you are not a Moderator');
    }
    var user = Meteor.users.findOne({_id: userId});
    console.log('makeMember:user', user);
    if (!_.isObject(member)) {
      console.log('makeMember:error:3');
      throw new Meteor.Error(500, 'You can not grant access, user not found');
    }
    return Roles.addUsersToRoles(userId, ['member']);
  },

  /**
   * Upgrade any existing User into a Moderator
   * - verify the User who is doing this, is an Admin
   * - verify User exists
   * - create Member record for this userId and assign correct rights
   *
   * @param string userId
   * @return boolean
   */
  makeModerator: function(userId) {
    console.log('makeModerator', userId, Meteor.userId());
    check(userId, String);
    check(Meteor.userId(), String);
    if (Meteor.userId() == userId) {
      console.log('makeModerator:error:1');
      //throw new Meteor.Error(403, 'You can not make yourself a Member');
    }
    if (!User.isAdmin(Meteor.userId())) {
      console.log('makeModerator:error:2');
      throw new Meteor.Error(403, 'You can not grant access, you are not an Admin');
    }
    var user = Meteor.users.findOne({_id: userId});
    console.log('makeModerator:user', user);
    if (!_.isObject(member)) {
      console.log('makeModerator:error:3');
      throw new Meteor.Error(500, 'You can not grant access, user not found');
    }
    return Roles.addUsersToRoles(userId, ['moderator']);
  },

  /**
   * Upgrade any existing User into an Admin
   * - verify the User who is doing this, is an Admin
   * - verify User exists
   * - create Member record for this userId and assign correct rights
   *
   * @param string userId
   * @return boolean
   */
  makeAdmin: function(userId) {
    console.log('makeAdmin', userId, Meteor.userId, Meteor.userId());
    check(userId, String);
    check(Meteor.userId(), String);
    if (Meteor.userId() == userId) {
      console.log('makeAdmin:error:1');
      //throw new Meteor.Error(403, 'You can not make yourself a Member');
    }
    if (!User.isAdmin(Meteor.userId())) {
      console.log('makeAdmin:error:2');
      throw new Meteor.Error(403, 'You can not grant access, you are not an Admin');
    }
    var user = Meteor.users.findOne({_id: userId});
    console.log('makeAdmin:user', user);
    if (!_.isObject(member)) {
      console.log('makeAdmin:error:3');
      throw new Meteor.Error(500, 'You can not grant access, user not found');
    }
    return Roles.addUsersToRoles(userId, ['admin']);
  },

  /**
   * TEMP DEV ONLY HACK
   * forces a userId == admin
   */
  devUserUpgrade: function(userId) {
    console.log('devUserUpgrade', userId, Meteor.userId, Meteor.userId());
    check(userId, String);
    check(Meteor.userId(), String);
    return Roles.addUsersToRoles(userId, ['admin']);
  }

});

/**
 * Whenever we create a new user, extend details/data
 */
Accounts.onCreateUser(function(options, user) {
  // notify Admins/Moderators?
  user.created = moment().format();
  // We still want the default hook's 'profile' behavior.
  if (options.profile) {
    user.profile = options.profile;
  }
  return user;
});
