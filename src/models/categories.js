var mongoose = require('mongoose');

var CategoriesSchema = {
    name: String
};

var Categories = mongoose.model("Categories", CategoriesSchema, "categories");

Categories.remove({}, function(err, data) {
    Categories.create(
        {
            name: 'Development environment'
        }
    )
    Categories.create(
        {
            name: 'Umbraco CMS system'
        }
    )
})

module.exports = Categories;
