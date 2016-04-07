var mongoose = require('mongoose');

var Schema = {
  username: String,
  password: String,
  group: String,
  email : String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
};


var Users = mongoose.model("Users", Schema, "users");




//Users.remove({}, function(err, data) {
//  Users.create(
//    {
//      username: 'admin',
//      password: 'admin',
//      group: 'admin',
//      email: 'nikolay.stanchev.kolev@gmail.com'
//    }
//  )
//Users.create(
//    {
//      username: 'author',
//      password: 'author',
//      group: 'author',
//      email: 'kaval@abv.bg'
//    }
//  )
//})

module.exports = Users;