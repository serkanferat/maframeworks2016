(function(){

	var postService = function($http){

		var tagsSelected = [];
		var categoriesSelected = [];

		var anyMatchInArray = function (target, toMatch) {
		    "use strict";

		    var foundedValue, targetMap, i, j, cur;

		    var found = false;
		    targetMap = {};

		    // Put all values in the `target` array into a map, where
		    //  the keys are the values from the array
		    for (i = 0, j = target.length; i < j; i++) {
		        cur = target[i];
		        targetMap[cur] = true;
		    }

		    // Loop over all items in the `toMatch` array and see if any of
		    //  their values are in the map from before
		    for (i = 0, j = toMatch.length; !found && (i < j); i++) {
		        cur = toMatch[i];
		        found = !!targetMap[cur];
		        // If found, `targetMap[cur]` will return true, otherwise it
		        //  will return `undefined`...that's what the `!!` is for
		    }

		    return found;
		};

		var getPosts = function(){
			return $http.get("/api/posts/")
						.then(function(response){
							return response.data;
						})
		};

		var getPost = function(postid){
			return $http.get("/api/posts/" + postid)
						.then(function(response){
							return response.data;
						})
		};


		var createPost = function(post){
			return $http.post("/api/posts/", post)
						.then(function(response){
							return response.data;
						})
		};


		var deletePost = function(postid){
			return $http.delete("/api/posts/" + postid)
						.then(function(response){
							return response.data;
						})
		};


		var updatePost = function(post){
			return $http.put("/api/posts/" + post._id, {title: post.title, content: post.content})
						.then(function(response){
							return response.data;
						})
		};

		//tags
		var getTags = function(){
				return $http.get("/api/tags/")
						.then(function(response){
								return response.data;
						})
		};



		var getSelectedTags = function(){
      		return tagsSelected;
    };


		var tagsChange = function(tag) {
			var i = tagsSelected.indexOf(tag);
			if (i > -1) {
				tagsSelected.splice(i, 1);
			}
			else {
				tagsSelected.push(tag);
			}
		}

		var tagFilter = function(post){
        if (tagsSelected.length > 0) {
            if (anyMatchInArray(tagsSelected, post.tags) != true){
								return;

            }

        }
        return post;
  	}


		//categories
		var getCategories = function(){
				return $http.get("/api/categories/")
						.then(function(response){
								return response.data;
						})
		};

		var getSelectedCategories = function(){
      		return categoriesSelected;
    };

		var categoriesChange = function(category) {
			var i = categoriesSelected.indexOf(category);
			if (i > -1) {
				categoriesSelected.splice(i, 1);
			}
			else {
				categoriesSelected.push(category);
			}
		}

		var categoryFilter = function(post){
        if (categoriesSelected.length > 0) {
            if (anyMatchInArray(categoriesSelected, post.categories) != true){
								return;
								console.log("post's categories"+ post.categories);
            }
        }
        return post;
  	}


		return {
			getPosts: getPosts,
			getPost: getPost,
			getTags: getTags,
			getCategories: getCategories,

			createPost: createPost,
			updatePost: updatePost,
			deletePost: deletePost,

			tagFilter: tagFilter,
			tagsChange: tagsChange,
			getSelectedTags: getSelectedTags,

			categoryFilter: categoryFilter,
			categoriesChange: categoriesChange,
			getSelectedCategories: getSelectedCategories
		}

	}
	angular
		.module("CMS")
		.factory("postService", postService);

}());
