
angular.module('VideoHunt.home', ['ui.router'])

.config([ '$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['posts', function(topics){
          return posts.getAll();
        }]
      }
    })
  }
])

.controller('HomeController', [$scope, function($scope) {
  $scope.posts = posts;
});
