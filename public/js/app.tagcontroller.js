(function(){
    "use strict";

    angular
        .module('CMS')
        .controller('tagController', tagController);

    function tagController($scope, tagService){


        var modelTags = function(data){
            $scope.Tags = data;
        }


        var modelTag = function(data){
            $scope.Tag = data;
            console.log($scope.Tag);
        }


        $scope.getTags = function(){
            tagService.getTags()
                .then(modelTags);
        }

        $scope.getTag = function(tagid){
            tagService.getTag(tagid)
                .then(modelTag);
        }


        $scope.createTag = function(tag){
            tagService.createTag(tag);
            tagService.getTags()
                .then(modelTags);

        }


        $scope.updateTag = function(tag){
            console.log(tag);
            tagService.updateTag(tag);
            tagService.getTag(tag.tagid)
                .then(modelTag);
        }

        $scope.deleteTag = function(tagid){
            tagService.deleteTag(tagid);
            tagService.getTags()
                .then(modelTags);
        }


    }

})();