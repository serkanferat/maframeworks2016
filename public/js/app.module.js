(function(){
  "use strict";
  
  angular.module('CMS', ['ui.router'])
  .config(function($stateProvider) {
   $stateProvider
   .state('home', {url:'/'})
   .state('login', {url:'/auth/login'})
   .state('admin', {url:'/admin'})
   .state('register', {url:'/auth/register'});
})
.run(function($rootScope, PageViews) {
  $rootScope.$on('$stateChangeStart', function(e, toState) {
    PageViews.add(toState.name);
    $rootScope.stateName = toState.name;
    $rootScope.pageViews = PageViews.get(toState.name);
  });
})
.factory('PageViews', function() {
  localStorage.views = localStorage.views || '{}';
  return {
    add: function(stateName) {
    var views = JSON.parse(localStorage.views);
    console.log(views);
    views[stateName] = views[stateName] || 0;
    ++views[stateName];
    localStorage.views = JSON.stringify(views);
    },
    get: function(stateName) {
      var views = JSON.parse(localStorage.views);
      return views[stateName] || 0;
    }
  };
});
  
})();