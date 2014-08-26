angular.module("YouTube Feed")
	.service("getInfo", function($http, $q, video, apiKey) {
		// defers a variable to be returned once an API call is complete
		return {
			videoInfo: function(videoId) {
				var info = $q.defer();

				$http({
					url: video,
					method: "GET",
					params: {
						part: "contentDetails, snippet",
						id: videoId,
						key: apiKey
					}
				})
					.success(function(data) {
						console.log(data);
						info.resolve(data);
					})
					.error(function(error) {
						console.log(error);
						info.reject();
					});
				// returns the promise of the API call - whether successful or not
				return info.promise;
			}
		}
	});
