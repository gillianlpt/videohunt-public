angular.module('Videohunt')
.controller('NavCtrl', ['$rootScope', '$scope',  '$location', '$anchorScroll', 'security', '$modal',
function($rootScope, $scope, $location, $anchorScroll, security, $modal){

  $scope.openAddModal = function(size) {
    var modalScope = $rootScope.$new();
    modalScope.modalInstance = $modal.open({
      templateUrl: '/addpost',
      controller: 'PostCtrl',
      size: size,
      scope: modalScope

    });
    console.log(modalScope.modalInstance);

    modalScope.modalInstance.result.then(function (selectedItem) {
      console.log('closed :'+selectedItem);
    }, function () {
      console.log('cancelled');
    });
    // ['finally'](function(){
    //   // unset modalInstance to prevent double close of modal when $routeChangeStart
    //   $scope.modalInstance = undefined
    // });
  }

  $scope.twitterLogin = function(data) {
    security.twitterLogin();
  };

  $scope.isAuthenticated = security.isAuthenticated();
}]);
