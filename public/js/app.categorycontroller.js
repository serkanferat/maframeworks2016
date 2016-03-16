(function(){
    "use strict";

    angular
        .module('CMS')
        .controller('categoryController', categoryController);

    function categoryController($scope, categoryService){

        var modelCategories = function(data){
            $scope.Categories = data;
        }


        var modelCategory = function(data){
            $scope.Category = data;
            console.log($scope.Category);
        }


        $scope.getCategories = function(){
            categoryService.getCategories()
                .then(modelCategories);
        }

        $scope.getCategory = function(categoryid){
            categoryService.getCategory(categoryid)
                .then(modelCategory);
        }


        $scope.createCategory = function(category){
            categoryService.createCategory(category);
            categoryService.getCategories()
                .then(modelCategories);

        }


        $scope.updateCategory = function(category){
            console.log(category);
            categoryService.updateCategory(category);
            categoryService.getCategory(category.categoryid)
                .then(modelCategory);
        }

        $scope.deleteCategory = function(categoryid){
            categoryService.deleteCategory(categoryid);
            categoryService.getCategories()
                .then(modelCategories);
        }


    }

})();