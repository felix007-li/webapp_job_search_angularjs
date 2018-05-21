'use strict';
angular.module('app').controller('positionCtrl', ['$log', '$q', '$http', '$state', '$scope', 'cache', function($log, $q, $http, $state, $scope, cache){
  $scope.isLogin = !!cache.get('name');
  $scope.message = $scope.isLogin?'Post your CV':'Login';
  function getPosition() {
    var def = $q.defer();
    $http.get('data/position.json', {
      params: {
        id: $state.params.id
      }
    }).success(function(resp) {
      $scope.position = resp;
      if(resp.posted) {
        $scope.message = 'CV be posted';
      }
      def.resolve(resp);
    }).error(function(err) {
      def.reject(err);
    });
    return def.promise;
  }
  function getCompany(id) {
    $http.get('data/company.json?id='+id).success(function(resp){
      $scope.company = resp;
    })
  }
  getPosition().then(function(obj){
    getCompany(obj.companyId);
  });
  $scope.go = function() {
    if($scope.message !== 'CV be posted') {
      if($scope.isLogin) {
        $http.post('data/handle.json', {
          id: $scope.position.id
        }).success(function(resp) {
          $log.info(resp);
          $scope.message = 'CV be posted';
        });
      } else {
        $state.go('login');
      }
    }
  }
}]);
