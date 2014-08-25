angular.module("YouTube Feed", [
	"ngRoute"
])
	// Google API Client ID
	.value("clientId", "403398258696-gq8plqe2mkhtoggmi2a4esduh4paf5dn.apps.googleusercontent.com")
	.value("videoList", "https://www.googleapis.com/youtube/v3/channels")
	.value("apiKey", "AIzaSyCtqoUiPBtbyl0ffipqLyhahc5SUs8K-nU")

	// URL Routing
	.config(function($routeProvider) {
		$routeProvider
			// main page
			.when('/', {
				templateUrl: 'app/views/main.html'
			})
	});