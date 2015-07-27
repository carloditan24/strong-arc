/*
 *
 *
 *   GATEWAY MAP DIRECTIVES
 *
 * */
Gateway.directive('slGatewayMapForm', [
  'GatewayServices',
  '$log',
  'growl',
  '$state',
  function(GatewayServices,$log,growl,$state) {
    return {
      restrict: 'E',
      scope: {
        map: '=',
        context: '=',
        hidebuttons: '='
      },
      templateUrl: './scripts/modules/gateway/templates/gateway.map.form.html',
      controller: ['$scope',
        function($scope) {

          $scope.isMapDirty = false;
          $scope.originalMap = {};

          function refreshMaps() {
            context.gatewayMaps = GatewayServices.getGatewayMaps()
              .then(function(maps) {

                $scope.context.gatewayMaps = maps;

              });
          }

          $scope.init = function() {
            $scope.originalMap = angular.copy($scope.map);
          };
          $scope.init();

          $scope.saveCurrentGatewayMap = function(map) {
            if (map.name && map.endpoint) {

              if ($scope.isMapDirty) {
                if (confirm('do you want to make this change')) {
                  GatewayServices.saveGatewayMap(map)
                    .$promise
                    .then(function(map) {
                      growl.addSuccessMessage('Gateway Map Saved');
                      //resetCurrentPolicy();

                    });
                }
              }
              else {
                GatewayServices.saveGatewayMap(map)
                  .$promise
                  .then(function(map) {
                    growl.addSuccessMessage('Gateway Map Saved');
                    //resetCurrentPolicy();

                  });
              }





            }
          };
        }
      ]
    }
  }
]);
Gateway.directive('slGatewayMapList', [
  function() {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/gateway/templates/gateway.map.list.html',
      controller: [
        '$scope',
        function($scope) {
          $scope.saveGatewayMap = function(gatewayMap) {
            $scope.gatewayMapCtx.currentGatewayMap = gatewayMap;
            $scope.saveCurrentGatewayMap();
          }
        }
      ]
    }
  }
]);
Gateway.directive('slGatewayMapMainView', [
  '$log',
  function($log) {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/gateway/templates/gateway.map.main.html',
      link: function(scope, el, attrs) {

      }
    }
  }
]);
