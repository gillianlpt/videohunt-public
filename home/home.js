
// angular.module('Videohunt', ['ui.router'])
//
// .config([ '$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
//
//     $stateProvider
//     .state('home', {
//       url: '/home',
//       templateUrl: '/home.html',
//       controller: 'MainCtrl',
//       resolve: {
//         postPromise: ['posts', function(topics){
//           return posts.getAll();
//         }]
//       }
//     })
//   }
// ])
//
// .controller('HomeController', [$scope, function($scope, Auth) {
//   $scope.posts = posts;
//   $scope.auth = Auth;
//
//   $scope.twitterLogin = function() {
//     console.log('fuck');
//     Auth.twitterLogin();
//   };
// });
