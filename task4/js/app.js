// Define the `petrovichApp` module
var petrovichApp = angular.module('petrovichApp', []);

//Image filter
petrovichApp.filter('imageFilter', function() {
    return function(input) {
        input = input || '';
        var out = '';
        out = input.replace(/(\.[\w\d_-]+)$/i, '_220x220_1$1');
        return out;
    };
})

//Number filter
petrovichApp.filter('numberFilter', function() {
    return function(input) {
        input = input || '';
        var out = '';
        out = parseInt(input, 10);
        return out;
    };
})

//Ratio filter
petrovichApp.filter('ratioFilter', function() {
    return function(input) {
        input = input || '';
        var out = '';
        out = 1/input;
        return out;
    };
})

// Define the `ProductController` controller on the `petrovichApp` module
petrovichApp.controller('ProductController', [ '$scope', '$http', function ($scope, $http) {
    $scope.products = [];

    $http.get( '/products.json').then(function(response){
        $scope.products = response.data;
        $scope.products.forEach(function(obj){
            obj.isPriceAlt = true;
            obj.quantity = 1;
        });
        console.log($scope.products);
    });

    $scope.togglePriceUnit = function(product){
        product.isPriceAlt = !product.isPriceAlt;
    }
    $scope.increaseQuanity = function(product){
        product.quantity += 1;
    }
    $scope.decreaseQuanity = function(product){
        if(product.quantity > 1)
            product.quantity -= 1;
    }

    }]);
