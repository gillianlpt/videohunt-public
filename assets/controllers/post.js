angular.module('Videohunt')
  .controller('PostCtrl', ['$scope', '$location', '$anchorScroll', 'security', '$modal', 'PostFactory',
    function($scope, $location, $anchorScroll, security, $modal, PostFactory) {

      $scope.posts = PostFactory.posts;

      $scope.addPost = function(isValid) {
        $scope.submitted = true;

        // if form is all valid
        if (isValid) {
          // create a new post
          PostFactory.create({
            title: $scope.post.title,
            link: $scope.post.link,
            description: $scope.post.description,
            posted_by: $scope.currentUser 
          });
          // close out previous modal
          $scope.modalInstance.close();

          // confirm add to user
          var modalInstance = $modal.open({
            templateUrl: '/postsuccess',
            controller: 'PostCtrl',
            resolve: {
              title: $scope.post.title,
              description: $scope.post.description
            }
          });
        }
      };

      $scope.upvote = function(post) {
        PostFactory.upvote(post);
      }

    }
  ]);
