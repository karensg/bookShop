'use strict'

angular.module 'bookShopApp'
.controller 'NavbarCtrl', ($scope, $location) ->
  $scope.menu = [
  ]
  $scope.isCollapsed = true

  $scope.isActive = (route) ->
    route is $location.path()
