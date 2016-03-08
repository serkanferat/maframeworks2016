(function(){

    var tagService = function($http){

        var getTags = function(){
            return $http.get("/api/tags/")
                .then(function(response){
                    return response.data;
                })
        };


        var getTag = function(tagid){
            return $http.get("/api/tags/" + tagid)
                .then(function(response){
                    return response.data;
                })
        };

        var createTag = function(tag){
            return $http.post("/api/tags", tag)
                .then(function(response){
                    return response.data;
                })
        };


        var deleteTag = function(tagid){
            return $http.delete("/api/tags/" + tagid)
                .then(function(response){
                    return response.data;
                })
        };


        var updateTag = function(tag){
            return $http.put("/api/tags/" + tag._id, {name: tag.name})
                .then(function(response){
                    return response.data;
                })
        };

        return {
            getTags: getTags,
            getTag: getTag,
            createTag: createTag,
            updateTag: updateTag,
            deleteTag: deleteTag,
        }

    }
    angular
        .module("CMS")
        .factory("tagService", tagService);

}());
