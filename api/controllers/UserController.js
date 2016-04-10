/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  showHomePage: function (req, res) {

    // If not logged in, show the public view.
    if (!req.session.me) {
      return res.view('login');
    }

    // Otherwise, look up the logged-in user and show the logged-in view,
    // bootstrapping basic user data in the HTML sent from the server
    User.findOne(req.session.me, function (err, user){
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      return res.view('dashboard', {
        me: {
          id: user.id,
          name: user.name,
          role: user.role
        }
      });

    });
  },


  /**
   * Check the provided email address and password, and if they
   * match a real user in the database, sign in to Activity Overlord.
   */
  login: function (req, res) {

    // Try to look up user using the provided email address
    User.findOne({
      name: req.param('userName')
    }, function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.forbidden();

      var password = req.param('password');

      if(password === user.password) {
        req.session.me = user.id;
        return res.ok();
      } else {
        return res.forbidden();
      }

      // Compare password attempt from the form params to the encrypted password
      // from the database (`user.password`)
      // require('machinepack-passwords').checkPassword({
      //   passwordAttempt: req.param('password'),
      //   encryptedPassword: req.param('password')
      // }).exec({
      //
      //   error: function (err) {
      //     return res.negotiate(err);
      //   },
      //
      //   // If the password from the form params doesn't checkout w/ the encrypted
      //   // password from the database...
      //   incorrect: function () {
      //     return res.forbidden();
      //   },
      //
      //   success: function () {
      //
      //     // Store user id in the user session
      //     req.session.me = user.id;
      //
      //     // All done- let the client know that everything worked.
      //     return res.ok();
      //   }
      // });
    });
  },

  /**
   * Log out of Activity Overlord.
   * (wipes `me` from the sesion)
   */
  logout: function (req, res) {

    if(!req.session.me) {
      return res.redirect('/');
    }
    // Look up the user record from the database which is
    // referenced by the id in the user session (req.session.me)
    User.findOne(req.session.me, function foundUser(err, user) {
      if (err) return res.negotiate(err);

      // If session refers to a user who no longer exists, still allow logout.
      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists.');
        return res.redirect('/');
      }

      // Wipe out the session (log out)
      req.session.me = null;

      return res.redirect('/');

    });
  }
};

