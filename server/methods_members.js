/**
 * Server only Meteor Methods for Members/Membership/Admins
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
    if (Members.isModerator(Meteor.userId())) {
      console.log('makeMember:error:2');
      throw new Meteor.Error(500, 'You can not grant access, you are not a Moderator');
    }
    var member = Members.findOne({userId: userId});
    console.log('makeMember:member', member);
    if (!_.isObject(member)) {
      member = {
        userId: userId,
        created: moment().format(),
        isActive: true,
        isMember: true
      };
      return Members.insert(member);
    }
    Members.update(member._id, {
      $set: { isActive: true, isMember: true }
    });
    return member._id;
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
    console.log('makeModerator', userId, Meteor.userId, Meteor.userId());
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
  },

  /**
   * TEMP DEV ONLY HACK
   * forces a userId == admin
   */
  devUserUpgrade: function(userId) {
    var member = Members.findOne({userId: userId});
    if (_.isObject(member)) {
      throw new Meteor.Error(500, 'devUserUpgrade only works on a new Member record');
    }
    member = {
      userId: userId,
      created: moment().format(),
      isPublic: true,
      isActive: true,
      isMember: true,
      isModerator: true,
      isAdmin: true
    };
    return Members.insert(member);
  }

});

/**
 * Whenever we create a new user, extend details/data
 */
Accounts.onCreateUser(function(options, user) {
  // notify Admins/Moderators?
  user.created = moment().format()
  // We still want the default hook's 'profile' behavior.
  if (options.profile) {
    user.profile = options.profile;
  }
  return user;
});
