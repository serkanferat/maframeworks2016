(function(){


  angular
    .module('CMS')
    .controller('postController', postController);

    function postController($scope, postService){


        $scope.tag_selection=[];
		  // toggle selection for a given tag name
		  $scope.toggleTagSelection = function toggleTagSelection(tagName) {

		     var idx = $scope.tag_selection.indexOf(tagName);
		 
		     // is currently selected
		     if (idx > -1) {
		       $scope.tag_selection.splice(idx, 1);
		     }
		 
		     // is newly selected
		     else {
		       $scope.tag_selection.push(tagName);
		     }
		   };



      $scope.cat_selection=[];
		  // toggle selection for a given category name
		  $scope.toggleCatSelection = function toggleCatSelection(catName) {

		     var idx = $scope.cat_selection.indexOf(catName);
		 
		     // is currently selected
		     if (idx > -1) {
		       $scope.cat_selection.splice(idx, 1);
		     }
		 
		     // is newly selected
		     else {
		       $scope.cat_selection.push(catName);
		     }
		   };


      var modelPosts = function(data){
        $scope.Posts = data;
      }

      var modelPost = function(data){
        $scope.Post = data;
      }

      var modelTags = function(data){
        $scope.Tags = data;
      }

      var modelCategories = function(data){
        $scope.Categories = data;
      }

  $scope.getPosts = function(){
    	postService.getPosts()
  		.then(modelPosts);
  }


	$scope.getPost = function(postid){
    	postService.getPost(postid)
			.then(modelPost);
  }

  //tags
  $scope.getTags = function(){
      postService.getTags()
      .then(modelTags);
  }

  var updateSelectedTags = function() {
    $scope.tagsSelected = postService.getSelectedTags;
  }

  $scope.tagFilter = function(post) {
    return postService.tagFilter(post);
  }

  $scope.tagsChange = function(tag) {
    postService.tagsChange(tag);
    updateSelectedTags();
  }


  //Categories
  $scope.getCategories = function(){
      postService.getCategories()
      .then(modelCategories);
  }


  var updateSelectedCategories = function() {
    $scope.categoriesSelected = postService.getSelectedCategories;
  }



  $scope.categoryFilter = function(post) {
    return postService.categoryFilter(post);
  }


  $scope.categoriesChange = function(category) {
    postService.categoriesChange(category);
    updateSelectedCategories();
  }

  updateSelectedTags();
  updateSelectedCategories();




	$scope.createPost = function(post){
        post.tags = $scope.tag_selection;
        post.categories = $scope.cat_selection;
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


}());
