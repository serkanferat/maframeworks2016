(function(){
  "use strict";
  
  angular
    .module('CMS')
    .controller('postController', postController);
  function postController($scope, postService){
	  
   
    var modelPosts = function(data){
      $scope.Posts = data;
    }
	
   
    var modelPost = function(data){
      $scope.Post = data;

    }
	
   
	$scope.getPosts = function(){
    
    	postService.getPosts()
			.then(modelPosts);
    }
	
	
	$scope.getPost = function(postid){

    	postService.getPost(postid)
			.then(modelPost);
      
    }
	
	
	$scope.createPost = function(post){
    	postService.createPost(post);
		postService.getPosts()
    		.then(modelPosts);
    }
		
	
	$scope.updatePost = function(post){
    	postService.updatePost(post);
		postService.getPost(post.postid)
    		.then(modelPost);
    }

	$scope.deletePost = function(postid){
    	postService.deletePost(postid);
		postService.getPosts()
    		.then(modelPosts);
    }
    
  }
  
})();