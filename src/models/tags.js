var mongoose = require('mongoose');

var PostsSchema = {
    name: String
};

var Tags = mongoose.model("Tags", PostsSchema, "tags");

Tags.remove({}, function(err, data) {
    Tags.create(
        {
            name: 'Automotive'
        }
    )
    Tags.create(
        {
            name: 'Tech'
        }
    )
})

module.exports = Tags;
