'use strict'

angular.module 'bookShopApp'
.controller 'MainCtrl', ($scope, $http, $timeout) ->

  # Search for books
  $scope.books = []
  $("#search-frm").submit (event) ->
    event.preventDefault()
    keywords = $("#keywords").val()
    $http.get('/api/amazon/search/'+keywords).success (books) ->
      $scope.books = books

  # Gather additional information from GoodReads
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

  # Add books to the cart
  $scope.cart = []
  $scope.totalAmount = 0
  $("#order").click () ->
    $scope.$apply () ->
      for i in [0...10]
        amount =  parseInt($("#amount"+i).val())
        if amount > 0
          book = $scope.books[i]
          price = (book.ItemAttributes.ListPrice.Amount || book.ItemAttributes.TradeInValue.Amount) / 100
          $scope.cart.push({
            key: i,
            amount: amount,
            price: price,
            ISBN: $scope.books[i].ASIN
          })
          $scope.totalAmount += amount * price

  # Empty cart
  $("#emptyCart").click () ->
    $scope.$apply () ->
      $scope.cart = []
      $scope.totalAmount = 0


  $scope.bank = {
    Type: 0,
    AccountNumber: '',
    AccountName: '',
    ExpirationDate: '',
    SecurityNumber: ''
  };

  # Process the order
  $("#sendOrder").click () =>
    data = {
      order: $scope.cart,
      bank: $scope.bank,
      total: $scope.totalAmount
    }
    $http.post('/api/order/', data).success (res) ->
      if res.success
        $timeout ->
          $scope.$apply () ->
            $scope.books = []
            $scope.cart = []
            $scope.totalAmount = 0
        $('#orderModal').modal('hide')
        $(".amount").val("")
        $("#success").show()
      else
        $("#error").show()
        $('#orderModal').modal('hide')
