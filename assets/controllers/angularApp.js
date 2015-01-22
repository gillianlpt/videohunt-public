
angular.module('Videohunt', ['ui.router', 'ui.bootstrap'])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      // controller: 'MainCtrl',
      resolve: {
        // postPromise: ['topics', function(topics){
        //   // return topics.getAll();
        //   return topics.getSessionAll();
        // }],
        // postPromise: ['users', function(users){
        //   // return topics.getAll();
        //   return users.getSessionAll();
        // }]
      }
    })
    .state('topics', {
      url: '/topics/{id}',
      templateUrl: '/topics.html',
      controller: 'TopicsCtrl',
      resolve: {
        post: ['$stateParams', 'topics', function($stateParams, topics) {
          return topics.get($stateParams.id);
        }]
      }
    });

  $urlRouterProvider.otherwise('home');
}])
.factory('topics', ['$http', function($http){
  var o = {
    topics: []
  };

  o.get = function(id) {
    return $http.get('/topics/' + id).then(function(res){
      return res.data;
    });
  };

  o.getAll = function() {
    return $http.get('/topics').success(function(data){
      angular.copy(data, o.topics);
    });
  };

  o.getSessionAll = function(){
    return o.topics;
  };

  o.create = function(topic) {
    return $http.post('/topics', topic).success(function(data){
      o.topics.push(data);
    });
  };

  o.update = function(topic) {
    return $http.post('/topics/update', topic).success(function(data){
      o.topics.push(data);
    });
  };

  // o.upvote = function(post) {
  //   return $http.put('/posts/' + post._id + '/upvote')
  //     .success(function(data){
  //       post.upvotes += 1;
  //     });
  // };

  // o.addComment = function(id, comment) {
  //   return $http.post('/posts/' + id + '/comments', comment);
  // };
  //
  // o.upvoteComment = function(post, comment) {
  //   return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote')
  //     .success(function(data){
  //       comment.upvotes += 1;
  //     });
  // };

  return o;
}])
// .factory('Session', ['$http', function($http){
//   var Session = {
//     data = {};
//     return Session;
//   };
// }])
.factory('users', ['$http', function($http){
  var o = {
    users: []
  };

  o.get = function(id) {
    return $http.get('/users/' + id).then(function(res){
      return res.data;
    });
  };

  o.getAll = function() {
    return $http.get('/users').success(function(data){
      angular.copy(data, o.users);
    });
  };

  o.getSessionAll = function(){
    return o.users;
  };

  o.create = function(user) {
    return $http.post('/users', user).success(function(data){
      o.users.push(data);
    });
  };

  o.update = function(user) {
    return $http.post('/users/update', user).success(function(data){
      o.users.push(data);
    });
  };

  // o.upvote = function(post) {
  //   return $http.put('/posts/' + post._id + '/upvote')
  //     .success(function(data){
  //       post.upvotes += 1;
  //     });
  // };

  // o.addComment = function(id, comment) {
  //   return $http.post('/posts/' + id + '/comments', comment);
  // };
  //
  // o.upvoteComment = function(post, comment) {
  //   return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote')
  //     .success(function(data){
  //       comment.upvotes += 1;
  //     });
  // };

  return o;
}])
.controller('MainCtrl', [
'$scope',
'$location',
'$anchorScroll',
function( $scope, $location, $anchorScroll){


}])
.directive('ngEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if(event.which === 13) {
        scope.$apply(function (){
          scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();
      }
    });
  };
})
.factory('freebaseAPIservice', function($http) {
  var freebaseAPI = {};
  freebaseAPI.getDrivers = function(){
    return $http({
      method:'JSONP',
      url:'https://www.googleapis.com/freebase/v1/search?'
    });
  }
  return freebaseAPI;
})
.filter('dateSuffix', function($filter) {
  var suffixes = ["th", "st", "nd", "rd"];
  return function(input) {
    var dtfilter = $filter('date')(input, 'MMMM dd');
    var day = parseInt(dtfilter.slice(-2));
    var relevantDigits = (day < 30) ? day % 20 : day % 30;
    var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
    return dtfilter+suffix;
  };
});
