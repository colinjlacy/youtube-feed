angular.module("YouTube Feed").controller("videoCtrl",function(o,i,n,e,l,t,r,d,u){o.videoId=e.videoId,o.playerVars={showinfo:1},r.videoInfo(o.videoId).then(function(i){o.vid=i,console.log(o.vid)},function(o){i.error=o}),t.playlistQuery(d,u).then(function(i){o.playlists=i},function(o){i.error=o}),o.viewAll=function(){l.path("/")},o.viewPlaylist=function(o){l.path("/playlist/"+o)}});