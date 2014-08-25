angular.module("YouTube Feed")
	.controller("youTubeCtrl", function($scope, $rootScope, $route, $routeParams, $location, apiKey, playlistItems, playlists, channelId, uploads, getVideos, getPlaylists) {
		$scope.videos = {};
		$scope.numberOfPages = null;
		$scope.page = null;
		$scope.playlistId = $routeParams.playlistId;

		// self-executing function that runs when the page is loaded
		(function() {
			// determine whether or not we're paging on a user-defined playlist
			var playlist = $scope.playlistId ? $scope.playlistId : uploads;

			// uses the getVideos factory to run the initial video query,
			// uses the base url for playlistItems and the set Uploads channel ID
			getVideos.videoQuery(playlistItems, playlist).then(function(data) {
				// sets the returned data object to the videos property of the $scope
				$scope.videos = data;
				// set a scope property for the total number of pages
				$scope.numberOfPages = Math.ceil($scope.videos.pageInfo.totalResults/12);
				// fills the pages array with each of the page numbers
				$scope.page = 1;
			},
			function(errorMessage){
				// if an error is returned, let's the people know
				$rootScope.error = errorMessage;
			});

			// uses the getPlaylists service to list the channel's playlists
			// uses the base url for playlists and uses the pre-defined channelId
			getPlaylists.playlistQuery(playlists, channelId).then(function(data) {
				// sets the returned data object to the videos property of the $scope
				$scope.playlists = data;
			},
			function(errorMessage){
				// if an error is returned, let's the people know
				$rootScope.error = errorMessage;
			});
		})();

		// function that handles playlist browsing
		$scope.viewPlaylist = function(playlistId) {
			// update the address bar
			$location.path('/playlist/' + playlistId);

			// unset the videos scope property (good for UX)
			$scope.videos = null;

			// run the getVideos query
			getVideos.videoQuery(playlistItems, playlistId).then(function(data) {
					// sets the returned data object to the videos property of the $scope
					$scope.videos = data;
					// set a scope property for the total number of pages
					$scope.numberOfPages = Math.ceil($scope.videos.pageInfo.totalResults/12);
					// fills the pages array with each of the page numbers
					$scope.page = 1;
				},
				function(errorMessage){
					// if an error is returned, let's the people know
					$rootScope.error = errorMessage;
				});
		};

		// function that handles paging
		$scope.pageQuery = function(pageString, change) {
			// unset the videos scope property (good for UX)
			$scope.videos = null;

			// determine whether or not we're paging on a user-defined playlist
			var playlist = $routeParams.playlistId ? $routeParams.playlistId : uploads;

			// run the getVideos query
			getVideos.videoQuery(playlistItems, playlist, pageString).then(function(data) {
					// sets the returned data object to the videos property of the $scope
					$scope.videos = data;
					// increment or decrement the active page number
					$scope.page += change;
				},
				function(errorMessage){
					// if an error is returned, let's the people know
					$rootScope.error = errorMessage;
				});
		};

		$scope.viewAll = function() {
			// reverts the path to the index route, so that the user can navigate back to the original listing
			$location.path('/');
		}
	});
