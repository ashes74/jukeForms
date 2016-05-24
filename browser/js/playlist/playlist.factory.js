'use strict';

juke.factory('PlaylistFactory', function ($http, SongFactory) {
    var cachedPlaylists = [];
    var cachedSongs = [];

    var PlaylistFactory = {};

    PlaylistFactory.fetchAll = function () {
        return $http.get('/api/playlists')
            .then(function (response) {
                angular.copy(response.data, cachedPlaylists);
                return cachedPlaylists;
            });
    };

    PlaylistFactory.create = function (data) {
        return $http.post('/api/playlists', data)
            .then(function (response) {
                var playlist = response.data
                cachedPlaylists.push(playlist);
                return playlist;
            });
    };

    PlaylistFactory.fetchById = function (playlistId) {
        return $http.get('api/playlists/' + playlistId)
            .then(function (response) {

                return response.data;
            });
    };

    PlaylistFactory.addSong = function (playlistId, id) {
        return $http.post(`/api/playlists/${playlistId}/songs`, id)
            .then(function (response) {
                var song = response.data
                    // console.log(song);
                return SongFactory.convert(song)
            })

    }

    PlaylistFactory.removeSong = function (playlistId, id) {
        return $http.delete('/api/playlists/' + playlistId + '/songs/' + id)
            .then(function (response) {
                return response.data;
            });
    }

    return PlaylistFactory;

});