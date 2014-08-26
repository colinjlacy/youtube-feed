angular.module("YouTube Feed")
	.service("getVideos", function($http, $q, apiKey) {
		// defers a variable to be returned once an API call is complete
		return {

			videoQuery: function(baseUrl, playlistID, page, maxResults) {
				var videos = $q.defer();

				// starts an AJAX call to the YouTube API
				$http({
					url: baseUrl,
					method: "GET",
					params: {
						part: "snippet",
						playlistId: playlistID,
						key: apiKey,
						pageToken: page ? page : "",
						maxResults: maxResults ? maxResults : 12
					}
				})
					.success(function(data) {
						videos.resolve(data);
						return videos;
					})
					.error(function(error) {
						console.log(error);
						videos.reject();
					});
				// returns the promise of the API call - whether successful or not
				return videos.promise;
			}
		}
	});