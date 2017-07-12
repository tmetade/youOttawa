var youottawa = angular.module('youottawa', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
youottawa.controller('MainController', function MainController($scope) {

	$scope.keyLinks = [{
			"title": "Brightspace",
			"description": "New Blackboard Learn",
			"url" : "http://uottawa.brightspace.com"	
		}];



});

youottawa.component('keyList', {
	template: '<div ng-repeat="link in $ctrl.keyLinks" class="ui segment application" data-content="{{link.description}}" href="{{url}}">' + 
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


