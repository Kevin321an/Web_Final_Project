// create the module and name it garageSaleApp
var garageSaleApp = angular.module('garageSaleApp', ['ngMessages', 'flash', 'ngCookies']);

// create the controller and inject Angular's $scope
garageSaleApp.controller('mainController', function($scope, $http) {  
    
    // when landing on the page, get all garages and show them
    var promise = $http.get('/api/garages');
    
    promise.then(
        function(data) {
           
        }, 
        function(err) {
            console.log('Error: ' + err);
        }
    ); 

});

// create the controller and inject Angular's $scope
garageSaleApp.controller('userController', function($scope, $http, Flash, $cookies) {
    
    // when submitting the add form, send the text to the node API
    $scope.createUser = function() {
        $http.post('/api/users', $scope.user)
            .success(function(data) {
                $scope.user = {}; // clear the form so our user is ready to enter another
                var message = '<strong>Success!</strong> User created.';
                Flash.create('success', message);
            
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
});

// create the controller and inject Angular's $scope
garageSaleApp.controller('garageController', function($scope, $http, $filter, Flash, $cookies) {
    
    //system messages
    var message = '';
    
     //to save garageSaleId on each item
    var garageSaleId = $cookies['garageSaleId'];
    
     //to control if the form was submitted
    $scope.submitted = false;
    
    //not allow to submit form twice
    $scope.disableSaveButton = false;
    
    $scope.cancelGarageSale = function() {
       $scope.garageSale ={};
    };
    
   
    // when submitting the add form, send the text to the node API
    $scope.createGarageSale = function(isValid) {
        
        $scope.submitted = true;

        // check to make sure the form is completely valid
        if (isValid) {
            $scope.submitted = false;
            
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
                    //randomly set the icon house
                    var house = Math.floor((Math.random() * 10) + 1);
                    if (house < 10){
                        house = "0"+ house;
                    }
                    $scope.garageSale.icon = "house-" + house;
                    $scope.garageSale.options = {bound: true, tags: ["House"]};

                    //after getting all the values for garage, save it
                    $http.post('/api/garages', $scope.garageSale)
                        .success(function(data) {
                            $scope.garageSale = data;
                            $cookies.garageSaleId = $scope.garageSale._id;
                            $scope.submitted = true;
                            $scope.disableSaveButton = true;
                            message = '<strong>Success!</strong> Now you can add items.';
                            Flash.create('success', message);
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                } else {
                    message = '<strong>Info!</strong> Please, click on the map to add markers.';
                    Flash.create('warning', message);
                }
            });
          
        }

      };  
    
});

// create the controller and inject Angular's $scope
garageSaleApp.controller('itemController', function($scope, $http, $filter, Flash, $cookies, $location) {
    //to save garageSaleId on each item
    var garageSaleId = $cookies['garageSaleId'];
    alert(garageSaleId);
    
    // to read the garage sale choosen from index page
    alert($location.search().garage_id);
});

