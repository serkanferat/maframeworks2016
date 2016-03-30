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

    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' }],
	categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories' }]
};

var Posts = mongoose.model("Posts", PostsSchema, "posts");
//var Tags = mongoose.model("Tags", TagsSchema, "tags");
//var Categories = mongoose.model("Categories", CategoriesSchema, "categories");

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
	tags:[],
	categories:[],
    }
  )
    });
  }
);

})


module.exports = Posts;
