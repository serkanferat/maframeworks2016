var mongoose = require('mongoose');

var TagsSchema = {
    name: String
};

var Tags = mongoose.model("Tags", TagsSchema, "tags");

//Tags.remove({}, function(err, data) {
//    Tags.create(
//        {
//            name: 'Automotive'
//        }
//    )
//    Tags.create(
//        {
//            name: 'Tech'
//        }
//    )
//})

module.exports = Tags;
