'use strict';

juke.controller('playlistCtrl', function ($scope, PlaylistFactory, $state) {
    $scope.name;

    $scope.createPlaylist = function () {

        PlaylistFactory.create({
                name: $scope.name
            })
            .then(function (playlist) {
                console.log(playlist);
                $scope.name = '';
                $scope.reset();
                $state.go("singlePlaylist", {
                    playlistId: playlist.id
                })
            });
    }

    $scope.reset = function () {
        $scope.name = "";
        $scope.playlistForm.$setPristine();
    };
});

// Sidebar Control
juke.controller('sidebarListCtrl', function ($scope, PlaylistFactory) {
    PlaylistFactory.fetchAll()
        .then(function (playlists) {
            $scope.playlists = playlists;
        });

});

//single Playlist page control
juke.controller('singlePlaylistCtrl', function ($scope, playlist, songs, PlaylistFactory, PlayerFactory) {
    $scope.playlist = playlist;
    $scope.songOptions = songs;
    //add song to playlist
    $scope.addToPlaylist = function (songId) {
            console.log("Playlist", playlist);
            PlaylistFactory.addSong(playlist.id, songId)
                .then(function (addedSong) {
                    $scope.playlist.songs.push(addedSong)

                });
            // reset the select
            $scope.selected = "";
        }
        // toggle the player on and off
    $scope.toggle = function (song) {
        if (song !== PlayerFactory.getCurrentSong()) {
            PlayerFactory.start(song, $scope.playlist.songs);
        } else if (PlayerFactory.isPlaying()) {
            PlayerFactory.pause();
        } else {
            PlayerFactory.resume();
        }
    };

    $scope.getCurrentSong = function () {
        return PlayerFactory.getCurrentSong();
    };

    $scope.isPlaying = function (song) {
        return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
    };

    $scope.removeSong = function (song) {
        console.log("remove this song", song);
        PlaylistFactory.removeSong(playlist.id, song.id)
            .then(function (response) {
                console.log(response);
                var ind = $scope.playlist.songs.indexOf(song);
                $scope.playlist.songs.splice(ind, 1);
                console.log("new playlist with item removed", $scope.playlist.songs);
            })
    }
});