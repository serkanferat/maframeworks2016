(function(){
  "use strict";
  
  angular
    .module('CMS', [])
    .controller('userController', userController);
  
  function userController($scope, userService){
	  
    var modelUsers = function(data){
      $scope.Users = data;
    }
    var modelPosts = function(data){
      $scope.Posts = data;
    }
	
    var modelUser = function(data){
      $scope.User = data;
    }
    var modelPost = function(data){
      $scope.Post = data;
    }
	
    $scope.getUsers = function(){
    	userService.getUsers()
			.then(modelUsers);
    }
	$scope.getPosts = function(){
    	userService.getPosts()
			.then(modelPosts);
    }
	      
	$scope.getUser = function(userid){
    	userService.getUser(userid)
			.then(modelUser);
    }
	$scope.getPost = function(postid){
    	userService.getPost(postid)
			.then(modelPost);
    }
	
	$scope.createUser = function(user){
    	userService.createUser(user);
		userService.getUsers()
    		.then(modelUsers);
    }
		
	$scope.updateUser = function(user){
		console.log(user);
    	userService.updateUser(user);
		userService.getUser(user.userid)
    		.then(modelUser);
    }
	$scope.updatePost = function(post){
		console.log(post);
    	userService.updatePost(post);
		userService.getPost(post.postid)
    		.then(modelPost);
    }
	$scope.deleteUser = function(userid){
    	userService.deleteUser(userid);
		userService.getUsers()
    		.then(modelUsers);
    }
	$scope.deletePost = function(postid){
    	userService.deletePost(postid);
		userService.getPosts()
    		.then(modelPosts);
    }
    
  }
  
})();