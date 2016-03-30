var mongoose = require('mongoose');

var PostsSchema = {
    title: String,
    content: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    comments: [{
        text: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        
    }],

    tags: Array,
	categories: Array

};

var Posts = mongoose.model("Posts", PostsSchema, "posts");

Posts.remove({}, function(err, data) {

  mongoose.model('Users').find({}, function(err, users) {
    users.forEach(function(user) {
    Posts.create(
   {
    title: "Test Title",
    content: "Test Content",
    postedBy: user._id,
    comments: [{
        text: "Test Comment!",
        postedBy: user._id
      }],
	tags:['testtag1','testtag2'],
	categories:['sports','computers'],
    }
  )
    });
  }
);

})


module.exports = Posts;
