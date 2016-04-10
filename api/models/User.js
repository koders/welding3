/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName: 'users',

  attributes: {
    // The user's full name
    // e.g. Nikola Tesla
    name: {
      type: 'string',
      columnName: 'un',
      required: true
    },

    // The encrypted password for the user
    // e.g. asdgh8a249321e9dhgaslcbqn2913051#T(@GHASDGA
    // encryptedPassword: {
    //   type: 'string',
    //   required: true
    // },

    // Unencrypted password
    password: {
      type: 'string',
      columnName: 'psw',
      required: true
    },

    // Role
    role: {
      type: 'integer',
      columnName: 't',
      defaultsTo: 0,
      required: true
    },

    // The timestamp when the the user last logged in
    // (i.e. sent a username and password to the server)
    lastLoggedIn: {
      type: 'date',
      required: true,
      defaultsTo: new Date(0)
    }
  }
};

