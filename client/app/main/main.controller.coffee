'use strict'

angular.module 'bookShopApp'
.controller 'MainCtrl', ($scope, $http) ->

  $("#search-frm").submit (event) ->
    event.preventDefault()
    keywords = $("#keywords").val()
    $http.get('/api/amazon/search/'+keywords).success (books) ->
      $scope.books = books
      console.log books


  $scope.goodReadsGot = []
  $scope.updateGoodReads = (key) ->
    if $scope.goodReadsGot[key] != true
      isbn = $scope.books[key].ItemAttributes.ISBN
      $http.get('/api/goodreads/'+isbn).success (goodReads) ->
        $scope.goodReadsGot[key] = true
        if goodReads.GoodreadsResponse == undefined
          $("#modalbody"+key).html("This book is not available")
        else
          $scope.goodReads = goodReads.GoodreadsResponse.book[0]
          $("#review"+key).html($scope.goodReads.reviews_widget[0])
          $("#rating"+key).html($scope.goodReads.average_rating[0])
      .error (error) ->
        console.log error
