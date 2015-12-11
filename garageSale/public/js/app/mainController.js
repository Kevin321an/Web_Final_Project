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
        
        //setting formats
        $scope.garageSale.date = $filter('date')($scope.garageSale.date, "yyyy-MM-dd");
        $scope.garageSale.time = $filter('date')($scope.garageSale.time, "HH:mm");
        
        $scope.garageSale.location = angular.element('#address').val();
        
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': $scope.garageSale.location}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              $scope.garageSale.latitude = results[0].geometry.location.lat();
              $scope.garageSale.longitude = results[0].geometry.location.lng();
                
                //setting default values for template 
                $scope.garageSale.image = "images\/photodune-196089-house-xs.jpg";
                $scope.garageSale.details_url = "map-property.html";
                $scope.garageSale.ribbon_mark_text = "Garage Sale";
                $scope.garageSale.ribbon_mark_class = "ribbon-primary";
                $scope.garageSale.template = "real-estate-map-pop_home";
                $scope.garageSale.icon = "house-02";
                $scope.garageSale.options = {bound: true, tags: ["House"]};
                
                //after getting all the values for garage, save it
                $http.post('/api/garages', $scope.garageSale)
                    .success(function(data) {
                        $scope.garageSale = {}; // clear the form so our user is ready to enter another
                        $scope.garageSale = data;
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
        });

    };
    
    $scope.cancelGarageSale = function() {
       $scope.garageSale ={};
    };
});