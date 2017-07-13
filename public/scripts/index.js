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

	$scope.keyLinks = [{
			"title": "Brightspace",
			"description": "New Blackboard Learn",
			"url" : "http://uottawa.brightspace.com"	
	}];


	$scope.addLink = function(index){
		console.log($scope.applications)
		$scope.keyLinks.push($scope.applications[index]);
	}



}]);

youottawa.component('keyList', {
	template: '<div ng-repeat="link in $ctrl.keyLinks" class="ui segment " data-content="{{link.description}}" href="{{url}}">' + 
				    '<div class="content" >'+
				     '<a class="header" href="{{link.url}}">{{link.title}}</a>'+
				       ' </div>'+
				    '</div>'+
				  '</div>',
	controller: function KeyListController(){
		this.keyLinks = [{
			"title": "Brightspace",
			"description": "New Blackboard Learn",
			"url" : "http://uottawa.brightspace.com"	
		}]
	}
})


