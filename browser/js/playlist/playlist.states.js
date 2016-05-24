'use strict'

//playlist: create new Playlist
juke.config(function ($stateProvider) {
    $stateProvider.state('newPlaylist', {
        url: '/playlists/new',
        templateUrl: '/js/playlist/templates/playlist-form.html',
        controller: 'playlistCtrl'
    });
});

//playlist: show playlist songs
juke.config(function ($stateProvider) {
    $stateProvider.state('singlePlaylist', {
        url: '/playlists/:playlistId',
        templateUrl: '/js/playlist/templates/playlist.html',
        controller: 'singlePlaylistCtrl',
        resolve: {
            playlist: function (PlaylistFactory, $stateParams) {
                return PlaylistFactory.fetchById($stateParams.playlistId)


            },
            songs: function (SongFactory) {
                return SongFactory.fetchAll()
            }

        },

    });
});

// //State for adding songs to select
juke.config(function ($stateProvider) {
    $stateProvider.state('singlePlaylist.addSong', {
        url: '/addSong',
        templateUrl: "/js/playlist/templates/addSong.html",
        controller: "singlePlaylistCtrl",
        resolve: {
            songs: function (SongFactory) {
                return SongFactory.fetchAll()
            }

        }
    });
});