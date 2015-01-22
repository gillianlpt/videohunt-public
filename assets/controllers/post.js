angular.module('Videohunt')
.controller('PostCtrl', ['$rootScope',  '$location', '$anchorScroll', 'security', '$modal',
function($scope, $location, $anchorScroll, security, $modal){

  $scope.add = function(isValid) {
    console.log('am here');
    // if (isValid) {
    //   alert('our form is amazing!');
    // } else {
    $scope.submitted = true;
    // }
  };

}]);
