angular.module("YouTube Feed")
	.controller("videoCtrl", function($scope, $rootScope, $route, $routeParams, $location, getPlaylists, getInfo, playlists, channelId) {
		// get the video ID
		$scope.videoId = $routeParams.videoId;
		$scope.playerVars = {
			showinfo: 1
		};

		// getting the video info
		getInfo.videoInfo($scope.videoId).then(function(data) {
				// sets the info object for the video being displayed
				$scope.vid = data;
				console.log($scope.vid);
			},
			function(errorMessage){
				// if an error is returned, let's the people know
				$rootScope.error = errorMessage;
			});


		// getting the playlists
		getPlaylists.playlistQuery(playlists, channelId).then(function(data) {
				// sets the returned data object to the videos property of the $scope
				$scope.playlists = data;
			},
			function(errorMessage){
				// if an error is returned, let's the people know
				$rootScope.error = errorMessage;
			});

		$scope.viewAll = function() {
			// reverts the path to the index route, so that the user can navigate back to the original listing
			$location.path('/');
		};

		// function that handles playlist browsing
		$scope.viewPlaylist = function(playlistId) {
			// update the address bar
			$location.path('/playlist/' + playlistId);
		};

	});