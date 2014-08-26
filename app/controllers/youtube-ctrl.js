angular.module("YouTube Feed")
	.controller("youTubeCtrl", function($scope, $rootScope, $route, $routeParams, $location, apiKey, playlistItems, playlists, channelId, uploads, getVideos, getPlaylists, getInfo) {

		/*  **********************************************************************
			Setting up some initial scope properties that we want to have handy...
		    **********************************************************************  */

		// the id of the playlist we're looking at, as told by the URL route
		$scope.playlistId = $routeParams.playlistId;

		// the id of the video we're looking at, as told by the URL route
		$scope.videoId = $routeParams.videoId;

		// the template call that runs the grid/video include
		$scope.includePart = $scope.videoId ? 'app/views/video.html' : 'app/views/grid.html';

		// if we're returning from viewing a video, set the back.page as the $scope.page
		if ($rootScope.back && $rootScope.back.use && $rootScope.back.page) {
			$scope.page = $rootScope.back.page;
			$rootScope.back = null;
		}


		/*  *************************************************************************************************************
			The function that runs on load, getting the playlists, video grid, and if necessary, the initial video's info
			*************************************************************************************************************  */


		// self-executing function that runs when the page is loaded
		(function() {
			console.log("reloaded");
			// determine whether or not we're paging on a user-defined playlist
			var playlist = $scope.playlistId ? $scope.playlistId : uploads;

			if (!$rootScope.videos) {
				console.log("got videos");
				// uses the getVideos factory to run the initial video query,
				// uses the base url for playlistItems and the set Uploads channel ID
				getVideos.videoQuery(playlistItems, playlist).then(function(data) {
						// sets the returned data object to the videos property of the $scope
						$rootScope.videos = data;
						// set a scope property for the total number of pages
						$rootScope.numberOfPages = Math.ceil($scope.videos.pageInfo.totalResults/12);
						// fills the pages array with each of the page numbers
						$scope.page = 1;
					},
					function(errorMessage){
						// if an error is returned, let's the people know
						$rootScope.error = errorMessage;
					});
			}

			if (!$rootScope.playlists) {
				console.log("got playlists");
				// uses the getPlaylists service to list the channel's playlists
				// uses the base url for playlists and uses the pre-defined channelId
				getPlaylists.playlistQuery(playlists, channelId).then(function(data) {
						// sets the returned data object to the videos property of the $scope
						$rootScope.playlists = data;
					},
					function(errorMessage){
						// if an error is returned, let's the people know
						$rootScope.error = errorMessage;
					});
			}

			if ($scope.videoId) {
				console.log("got info");
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
			}
		})();


		/*  **********************************************************************************************************
			The rest of the controller sets up the interactivity of the app, with methods that respond to user actions
		    **********************************************************************************************************  */


		// function that handles playlist browsing
		$scope.viewPlaylist = function(playlistId) {
			// unset the videos scope property (good for UX)
			$rootScope.videos = null;

			// update the address bar
			$location.path('/playlist/' + playlistId);

			// remove the video location.search parameter from the URL
//			if ($routeParams.videoId) {
//				$location.path('/video', null);
//			}

			// run the getVideos query
			getVideos.videoQuery(playlistItems, playlistId).then(function(data) {
					// sets the returned data object to the videos property of the $scope
					$rootScope.videos = data;
					// set a scope property for the total number of pages
					$rootScope.numberOfPages = Math.ceil($scope.videos.pageInfo.totalResults/12);
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
			$rootScope.videos = null;

			// determine whether or not we're paging on a user-defined playlist
			var playlist = $routeParams.playlistId ? $routeParams.playlistId : uploads;

			// run the getVideos query
			getVideos.videoQuery(playlistItems, playlist, pageString).then(function(data) {
					// sets the returned data object to the videos property of the $scope
					$rootScope.videos = data;
					// increment or decrement the active page number
					$scope.page += change;
				},
				function(errorMessage){
					// if an error is returned, let's the people know
					$rootScope.error = errorMessage;
				});
		};

		// the function that kills the video view
		$scope.destroy = function() {
			$scope.videoId = null;
			$rootScope.back.use = true;
			if($rootScope.back.playlistId) {
				$location.path('/playlist/' + $rootScope.back.playlistId)
			} else {
				$location.path('/')
			}
		};

		$scope.viewAll = function() {
			// unset the videos scope property (good for UX)
			$rootScope.videos = null;

			// reverts the path to the index route, so that the user can navigate back to the original listing
			$location.path('/');
		};

		$scope.viewVideo = function(videoId) {
			// see if the $rootScope.back object exists
			if (!$rootScope.back) {
				// if not, create one
				$rootScope.back = {};
			}
			// save the playlistId for routing when returning to the grid
			$rootScope.back.playlistId = $scope.playlistId ? $scope.playlistId : null;
			// save the page number for proper page number display when returning to the grid
			$rootScope.back.page = $scope.page;
			// deactivate all of this saved info until it's ready to be used by the $scope.destroy() method
			$rootScope.back.use = false;
			// finally, route to the actual video view template
			$location.path('/video/' + videoId);
		};

		// info to be passed to the embedded youtube player
		$scope.playerVars = {
			showinfo: 1 // shows title, share buttons, etc.
		};

	});
