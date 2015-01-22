angular.module('Videohunt')
.factory('security', ['$http', '$location', '$rootScope', '$window', function($http, $location, $rootScope, $window) {

  // Redirect to the given url (defaults to '/')
  function redirect(url) {
    url = url || '/';
    $location.path(url);
  }

  var service = {

    twitterLogin: function(){
      // $location.path('/auth/twitter');
      // redirect('auth/twitter');
      $http.get('/auth/twitter', {
        params: {
          dataType: 'jsonp'
        }
      });
      // return request.then(function(response) {
      //   service.currentUser = response.data.user;
      //   if ( service.isAuthenticated() ) {
      //
      //     $location.path('/');
      //   }
      //   return service.isAuthenticated();
      // });
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
