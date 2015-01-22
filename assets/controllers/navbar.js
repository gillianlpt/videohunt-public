angular.module('Videohunt')
.controller('NavCtrl', [
'$rootScope',  '$location', '$anchorScroll', 'security', '$modal',
function($scope, $location, $anchorScroll, security, $modal){

  $scope.openAddModal = function(size) {
    var modalInstance = $modal.open({
      templateUrl: '/addpost',
      controller: 'NavCtrl',
      size: size,
      resolve: {

      }
    });
  }

  $scope.twitterLogin = function(data) {
    security.twitterLogin();
  };

  $scope.isAuthenticated = security.isAuthenticated();
}]);
