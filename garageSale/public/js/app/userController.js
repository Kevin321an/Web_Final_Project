angular.module('garageSaleApp', [])
        .controller('userController', function($scope, $http) {
    
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
    
});
/* // create the module and name it garageSaleApp
var garageSaleApp = angular.module('garageSaleApp', ['ngRoute']);

garageSaleApp.controller('userController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    }); */