angular.module('Videohunt')
.controller('NavCtrl', [
'$rootScope',  '$location', '$anchorScroll', 'security',
function($scope, $location, $anchorScroll, security){
  $scope.twitterLogin = function(data) {
    security.twitterLogin();
  };

  $scope.isAuthenticated = security.isAuthenticated();
}]);
