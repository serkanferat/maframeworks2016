var express = require('express');
var tagRouter = express.Router();
var Tags = require('../../src/models/tags');
var mongoose = require('mongoose');


var async = require('async');


/* GET tags listing. */
tagRouter.get('/', function(req, res, next) {
    Tags.find({}).exec(function (err, results) {
        res.send(results);
    });
});

/* Create tag */
tagRouter.route('/').post(function (req, res) {

   // mongoose.createConnection('localhost', 'CMS');
    var tag = {
        name: req.body.name
    };
   

    if (typeof req.body.name === "undefined")
    {
        res.json({message:"Error"});
    }else
    {
        var newTag = new Tags(tag);
        
        newTag.save(function (err, post) {
            if (err) res.json({message:"Error"});
            res.json(tag);
        });
    }

});

/* Get tag */
tagRouter.get('/:tagid', function(req, res, next) {
    var tagid = req.params.tagid;
    console.log(tagid);
    Tags.findOne({_id:tagid},function (err, results){res.json(results);});

});

/* Update tag */
tagRouter.put('/:tagid', function(req, res, next) {
    var tagid = req.params.tagid;

    Tags.findById(tagid, function (err, tag) {
        if (err) res.json({message:"Error"});

        tag.name = req.body.name;

        tag.save(function (err) {
            if (err) res.json({message:"Error"});
            res.send(tag);
        });
    });

});

/* Delete tag */
tagRouter.delete('/:tagid', function(req, res, next) {
    var tagid = req.params.tagid;
    Tags.remove({ _id:tagid }, function (err)
        {
            if (err) res.json({message:"Error"});
            res.json({message:"Succes"});
        }
    );
});


module.exports = tagRouter;
