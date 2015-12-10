// create the module and name it garageSaleApp
var garageSaleApp = angular.module('garageSaleApp', []);

// create the controller and inject Angular's $scope
garageSaleApp.controller('mainController', function($scope) {

      // when submitting the add form, send the text to the node API
    $scope.createUser = function() {
        $http.post('/api/users', $scope.user)
            .success(function(data) {
                $scope.user = {}; // clear the form so our user is ready to enter another
                $scope.user = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    // when submitting the add form, send the text to the node API
    $scope.createGarageSale = function() {
        console.log(angular.element('#state').val());
        $http.post('/api/garageSale', $scope.garageSale)
            .success(function(data) {
                $scope.user = {}; // clear the form so our user is ready to enter another
                $scope.user = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
});