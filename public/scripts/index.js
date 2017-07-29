var youottawa = angular.module('youottawa', []);

youottawa.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('%%');
  $interpolateProvider.endSymbol('%%');
});

youottawa.controller('mainController', ["$scope", "$http", "FeedFactory",  function MainController($scope, $http, FeedFactory) {

	$http.get('applications.json')
	  .then(function(data, status, headers, config) {
	    $scope.applications = data.data;
	  });

	$scope.feed = null;


	$scope.keyLinks = [{
	"title": "Brightspace",
	"description": "New Blackboard Learn",
	"url" : "http://uottawa.brightspace.com"	
	}, { 
	"title": "Account Summary",
	"description":"View your account summary. For step-by-step instructions, see this tutorial.",
	"url": "https://www.uocampus.uottawa.ca/psp/csprpr9www/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSF_SS_ACCT_SUMM.GBL?languageCd=ENG"
	}, { 
	"title": "CO-OP Navigator",
	"description":"Once you've registered at uOttawa, you can sign up for co-op programs in your discipline.",
	"url": "https://nav-coop-sso.uottawa.ca/CoopNav.Net/LoginSSO.aspx?culture=en-CA"
	}, { 
	"title": "Financial Aid",
	"description":"View your financial aid, awards, work study navigator status and your financial questionnaire status. Refer to the PDF tutorial under this application for step-by-step instructions.", 
	"url": "https://www.uocampus.uottawa.ca/psp/csprpr9www/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SS_FA_AWARDS.GBL?languageCd=ENG"
	}];

	FeedFactory.then(function(result) {  

       $scope.feed = result;

    });

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

youottawa.factory('FeedFactory', function($http) {

    // Angular $http() and then() both return promises themselves 
    return $http({method:"GET", url:"/load-feed"}).then(function(result){
    	console.log("YEAH " + result)

        // What we return here is the data that will be accessible 
        // to us after the promise resolves
        return result.data;
    });
});