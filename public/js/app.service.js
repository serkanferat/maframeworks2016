(function(){

	var userService = function($http){

		var getUsers = function(){
			return $http.get("/users")
						.then(function(response){
							return response.data;
						})
		};
		var getPosts = function(){
			return $http.get("/posts")
						.then(function(response){
							return response.data;
						})
		};
		
		var getUser = function(userid){
			return $http.get("/users/" + userid)
						.then(function(response){
							return response.data;
						})
		};
		var getPost = function(postid){
			return $http.get("/posts/" + postid)
						.then(function(response){
							return response.data;
						})
		};
		var createUser = function(user){
			return $http.post("/users", user)
						.then(function(response){
							return response.data;
						})
		};
		
		var deleteUser = function(userid){
			return $http.delete("/users/" + userid)
						.then(function(response){
							return response.data;
						})
		};
		var deletePost = function(postid){
			return $http.delete("/posts/" + postid)
						.then(function(response){
							return response.data;
						})
		};
		
		var updateUser = function(user){
			return $http.put("/users/" + user._id, {username: user.username, password: user.password})
						.then(function(response){
							return response.data;
						})
		};
		var updatePost = function(post){
			return $http.put("/posts/" + post._id, {title: post.title, content: post.content})
						.then(function(response){
							return response.data;
						})
		};
		return {
			getUsers: getUsers,
			getPosts: getPosts,
			getUser: getUser,
			getPost: getPost,
			createUser: createUser,
			updateUser: updateUser,
			updatePost: updatePost,
			deleteUser: deleteUser,
			deletePost: deletePost
		}

	}
	angular
		.module("CMS")
		.factory("userService", userService); 

}());
