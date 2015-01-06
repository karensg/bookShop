'use strict'

describe 'Controller: MainCtrl', ->

  # load the controller's module
  beforeEach module 'bookShopApp'

  MainCtrl = undefined
  scope = undefined
  $httpBackend = undefined

  # Initialize the controller and a mock scope
  beforeEach inject (_$httpBackend_, $controller, $rootScope) ->
    $httpBackend = _$httpBackend_
    scope = $rootScope.$new()
    MainCtrl = $controller 'MainCtrl',
      $scope: scope

  it 'should contain 0 books in the beginning', ->
    expect(scope.books.length).toBe 0
