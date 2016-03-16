var express = require('express');
var categoryRouter = express.Router();
var Categories = require('../../src/models/categories');
var mongoose = require('mongoose');


var async = require('async');


/* GET categories listing. */
categoryRouter.get('/', function(req, res, next) {
    Categories.find({}).exec(function (err, results) {
        res.send(results);
    });
});

/* Create category */
categoryRouter.route('/').post(function (req, res) {

    mongoose.createConnection('localhost', 'CMS');
    var category = {
        name: req.body.name
    };


    if (typeof req.body.name === "undefined")
    {
        res.json({message:"Error"});
    }else
    {
        var newCategory = new Categories(category);

        newCategory.save(function (err, post) {
            if (err) res.json({message:"Error"});
            res.json(category);
        });
    }

});

/* Get category */
categoryRouter.get('/:categoryid', function(req, res, next) {
    var categoryid = req.params.categoryid;
    console.log(categoryid);
    Categories.findOne({_id:categoryid},function (err, results){res.json(results);});

});

/* Update category */
categoryRouter.put('/:categoryid', function(req, res, next) {
    var categoryid = req.params.categoryid;

    Categories.findById(categoryid, function (err, category) {
        if (err) res.json({message:"Error"});

        category.name = req.body.name;

        category.save(function (err) {
            if (err) res.json({message:"Error"});
            res.send(category);
        });
    });

});

/* Delete category */
categoryRouter.delete('/:categoryid', function(req, res, next) {
    var categoryid = req.params.categoryid;
    Categories.remove({ _id:categoryid }, function (err)
        {
            if (err) res.json({message:"Error"});
            res.json({message:"Succes"});
        }
    );
});


module.exports = categoryRouter;
