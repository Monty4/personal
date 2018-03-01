/**
 * Spotify API client.
 *
 * @version 1.0.0
 */
var spotifyApi;
(function() {
  "use strict";

  function call(url, token, handleSuccess, handleError, timeout) {

    const headers = { Authorization: 'Bearer: ' + token }

    fetch(url,{headers})

    .then(res => res.json())
    .then(data => handleSuccess(data))
    .catch(err => handleError(err))
  }

  spotifyApi = {
    baseUrl: "https://api.spotify.com/v1/",
    token: "BQAdMeyJUvTYYYQ1X17qlcPTvMqnXPNvLzzSLlsWeZHG-UZrAOoJPNVf1k98zzDm9hUwt-Q_M41U9U95X_KTXrbr-ZMKhWSEEej4xlC2tXqREos53j83S39m7bKhIgraVbB8-T8VMw",
    timeout: 2000,

    /**
     * Searches artists by matching a text.
     * 
     * @see https://developer.spotify.com/web-api/console/get-search-item/
     *
     * @param {String} query - The text to search.
     * @param {Function} handleResults - Handles the results.
     * @param {Function} handleError - Handles an error.
     */
    searchArtists: function(query, handleResults, handleError) {
      call(
        this.baseUrl + "search?type=artist&q=" + query,
        this.token,
        function(results) {
          handleResults(results.artists.items);
        },
        handleError,
        this.timeout
      );
    },

    /**
     * Retrieve albums from an artist (by artist id).
     * 
     * @see https://developer.spotify.com/web-api/console/get-artist-albums/
     *
     * @param {String} artistId - The id of the artist to retrieve the albums from.
     * @param {Function} handleResults - Handles the results.
     * @param {Function} handleError - Handles an error.
     */
    retrieveAlbums: function(artistId, handleResults, handleError) {
      call(
        this.baseUrl + "artists/" + artistId + "/albums",
        this.token,
        function(results) {
          handleResults(results.items);
        },
        handleError,
        this.timeout
      );
    },

    /**
     * Retrieve tracks from an album (by album id).
     * 
     * @see https://developer.spotify.com/web-api/console/get-album-tracks/
     *
     * @param {String} albumId - The id of the album to retrieve the tracks from.
     * @param {Function} handleResults - Handles the results.
     * @param {Function} handleError - Handles an error.
     */
    retrieveTracks: function(albumId, handleResults, handleError) {
      // TODO implement album's tracks retrieval by means of endpoint https://api.spotify.com/v1/albums/{id}/tracks
    },

    /**
     * Retrieve track by id.
     * 
     * @see https://developer.spotify.com/web-api/console/get-track/
     *
     * @param {String} id - The id of the track to retrieve information from.
     * @param {Function} handleResults - Handles the results.
     * @param {Function} handleError - Handles an error.
     */
    retrieveTrack: function(id, handleResults, handleError) {
      call(
        this.baseUrl + "tracks/" + id,
        this.token,
        handleResults,
        handleError,
        this.timeout
      );
    }
  };
})();
