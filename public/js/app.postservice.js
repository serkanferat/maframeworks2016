(function(){

	var postService = function($http){

		
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
		return {
		
			getPosts: getPosts,
			getPost: getPost,
			createPost: createPost,
			updatePost: updatePost,
			deletePost: deletePost
		}

	}
	angular
		.module("CMS")
		.factory("postService", postService); 

}());
