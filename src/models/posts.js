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
	  categories: Array,

//  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' }],
//	categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories' }]

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
    	tags:["Automotive"],
    	categories:["Umbraco CMS System"],
        }
      )
      });
    }
);

})


module.exports = Posts;
