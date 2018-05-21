'use strict';
angular.module('app').controller('searchCtrl', ['dict', '$http', '$scope', function(dict, $http, $scope){
  $scope.name = '';
  $scope.search = function() {
    $http.get('data/positionList.json?name='+$scope.name).success(function(resp) {
      $scope.positionList = resp;
    });
  };
  $scope.search();
  $scope.sheet = {};
  $scope.tabList = [{
    id: 'city',
    name: 'City'
  }, {
    id: 'salary',
    name: 'salary'
  }, {
    id: 'scale',
    name: 'Scale'
  }];
  $scope.filterObj = {};
  var tabId = '';
  $scope.tClick = function(id,name) {
    tabId = id;
    $scope.sheet.list = dict[id];
    $scope.sheet.visible = true;
  };
  $scope.sClick = function(id,name) {
    if(id) {
      angular.forEach($scope.tabList, function(item){
        if(item.id===tabId) {
          item.name = name;
        }
      });
      $scope.filterObj[tabId + 'Id'] = id;
    } else {
      delete $scope.filterObj[tabId + 'Id'];
      angular.forEach($scope.tabList, function(item){
        if(item.id===tabId) {
          switch (item.id) {
            case 'city':
              item.name = 'City';
              break;
            case 'salary':
              item.name = 'Salary';
              break;
            case 'scale':
              item.name = 'Scale';
              break;
            default:
          }
        }
      });
    }
  }
}]);
