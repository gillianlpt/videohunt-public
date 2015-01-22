angular.module('VideoHunt')
.factory('Security', ['$http', '$location', '$scope', '$window', function($http, $location, $scope, $window) {

  // Redirect to the given url (defaults to '/')
  function redirect(url) {
    url = url || '/';
    $location.path(url);
  }

  var service = {

    twitterLogin: function(){
      var request = $http.post('/auth/twitter');
      return request.then(function(response) {
        service.currentUser = response.data.user;
        if ( service.isAuthenticated() ) {

          $location.path('/');
        }
        return service.isAuthenticated();
      });
    },

    // Information about the current user
    currentUser: null,

    // Is the current user authenticated?
    isAuthenticated: function(){
      return !!service.currentUser;
    },

    // Logout the current user and redirect
    logout: function(redirectTo) {
      $http.post('/logout').then(function() {
        service.currentUser = null;
        redirect(redirectTo);
      });
    }
  };

  return service;
}]);
