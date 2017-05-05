const User = require('../../models/user');
const _ = require('lodash');

module.exports = (router) => {
  // POST /api/join
  router.post('/join', (req, res, next) => {
    const user = new User();
    user.username = 'micmia';
    user.email = 'micmia128@gmail.com';
    user.password = 'P@ssw0rd';

    user.save(err => {
      if (err) {
        return next(err);
      }

      res.json(user);
    });
  });
};
