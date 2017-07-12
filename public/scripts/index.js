var youottawa = angular.module('youottawa', []);

youottawa.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('%%');
  $interpolateProvider.endSymbol('%%');
});
// Define the `PhoneListController` controller on the `phonecatApp` module
youottawa.controller('mainController', ["$scope", function MainController($scope) {

	$scope.keyLinks = [{
			"title": "Brightspace",
			"description": "New Blackboard Learn",
			"url" : "http://uottawa.brightspace.com"	
	}];

	$scope.addLink = function(index){
		var newLink = {
			"title": "UoZone",
			"description": "uOZone",
			"url" : "http://uozone.uottawa.ca"	
		}
		$scope.keyLinks.push(newLink);
		$scope.$apply();
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