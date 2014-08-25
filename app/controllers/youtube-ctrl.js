angular.module("YouTube Feed")
	.controller("youTubeCtrl", function($scope, $http, apiKey, videoList) {
		(function() {
			$http({
				method: "GET",
				url: "https://www.googleapis.com/youtube/v3/search",
				params: {
					part: ["contentDetails","id"],
					channelId: "expertboxing",
					key: apiKey,
					maxResults: 20
				}
			})
				.success(function(data) {
					console.log(data);
					$scope.videos = data;
				});
		})();
	});
