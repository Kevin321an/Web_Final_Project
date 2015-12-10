// create the module and name it garageSaleApp
var garageSaleApp = angular.module('garageSaleApp', []);

// create the controller and inject Angular's $scope
garageSaleApp.controller('mainController', function($scope, $http, $filter) {

      // when submitting the add form, send the text to the node API
    $scope.createUser = function() {
        $http.post('/api/users', $scope.user)
            .success(function(data) {
                $scope.user = {}; // clear the form so our user is ready to enter another
                $scope.user = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    // when submitting the add form, send the text to the node API
    $scope.createGarageSale = function() {
        $scope.garageSale.province = angular.element('#state').val();
        $scope.garageSale.country = angular.element('#country').val();
        $scope.garageSale.address = angular.element('#address').val();
        
        $scope.garageSale.date = $filter('date')($scope.garageSale.date, "yyyy-MM-dd");
        $scope.garageSale.time = $filter('date')($scope.garageSale.time, "HH:mm");
        
        $http.post('/api/garages', $scope.garageSale)
            .success(function(data) {
                $scope.garageSale = {}; // clear the form so our user is ready to enter another
                $scope.garageSale = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    $scope.cancelGarageSale = function() {
       $scope.garageSale ={};
    };
});