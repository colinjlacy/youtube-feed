angular.module("YouTube Feed")
	.service("getPlaylists", function($http, $q, apiKey) {
		// defers a variable to be returned once an API call is complete
		return {

			playlistQuery: function(baseUrl, channelID) {
				var playlists = $q.defer();

				// starts an AJAX call to the YouTube API
				$http({
					url: baseUrl,
					method: "GET",
					params: {
						part: "snippet",
						channelId: channelID,
						key: apiKey
					}
				})
					.success(function(data) {
						console.log(data);
						playlists.resolve(data);
						return playlists;
					})
					.error(function(error) {
						console.log(error);
						playlists.reject();
					});
				// returns the promise of the API call - whether successful or not
				return playlists.promise;
			}
		}
	});