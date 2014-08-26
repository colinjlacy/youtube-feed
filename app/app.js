angular.module("YouTube Feed", [
	"ngRoute",
	"youtube-embed"
])

	// the base url for listing videos
	.value("playlistItems", "https://www.googleapis.com/youtube/v3/playlistItems")
	// the base url for listing playlists
	.value("playlists", "https://www.googleapis.com/youtube/v3/playlists")
	// the base url for revtrieving single videos
	.value("video", "https://www.googleapis.com/youtube/v3/videos/")
	// Google developers API key
	.value("apiKey", "AIzaSyCtqoUiPBtbyl0ffipqLyhahc5SUs8K-nU")
	// channel ID for the channel in question
	.value("channelId", "UCrYqUsxL8UbAbk6wP-9_tig")
	// playlist id for the Uploads playlist, the default playlist for all uploaded vids on a YouTube Channel
	.value("uploads", "UUrYqUsxL8UbAbk6wP-9_tig")

	// URL Routing
	.config(function($routeProvider) {
		$routeProvider
			// main page
			.when('/', {
				templateUrl: 'app/views/main.html'
			})
			.when('/playlist/:playlistId', {
				templateUrl: 'app/views/main.html'
			})
			.when('/video/:videoId', {
				templateUrl: 'app/views/video.html'
			})
	});