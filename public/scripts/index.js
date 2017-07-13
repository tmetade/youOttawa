var youottawa = angular.module('youottawa', []);

youottawa.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('%%');
  $interpolateProvider.endSymbol('%%');
});

youottawa.controller('mainController', ["$scope", "$http", function MainController($scope, $http) {

	$http.get('applications.json')
	  .then(function(data, status, headers, config) {
	    $scope.applications = data.data;
	  });

	$scope.keyLinks = [];


	$scope.addLink = function(index){
		var found = false;

		for(link in $scope.keyLinks){
			console.log("does it match: " + $scope.keyLinks[link].title + "    " + $scope.applications[index].title);
			if($scope.keyLinks[link].title == $scope.applications[index].title){
				found = true;
				$scope.keyLinks.splice(link, 1);
			}
		}

		if(!found){
			$scope.keyLinks.push($scope.applications[index]);
		}


	}



}]);



