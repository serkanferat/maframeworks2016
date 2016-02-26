var mongoose = require('mongoose');

var Schema = {
  username: String,
  password: String,
  group: String
};

var Users = mongoose.model("Users", Schema, "users");

Users.remove({}, function(err, data) {
  Users.create(
    {
      username: 'admin',
      password: 'admin',
      group: 'admin'
    }
  )
 Users.create(
    {
      username: 'user',
      password: 'user',
      group: 'user'
    }
  )
})

module.exports = Users;