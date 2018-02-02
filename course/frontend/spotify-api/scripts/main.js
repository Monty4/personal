$('#artist').hide();
$('#albums').hide();
$('#tracks').hide();
$('#track').hide();

(function(){
    'use strict';
    $('form').submit(function(e){
        e.preventDefault();

        var queryArtists = $('input').val();

        $.ajax({

            url: "https://api.spotify.com/v1/search?q=" + queryArtists + "&type=artist",
                              
            type: 'GET',
          
            headers: {"Authorization": "Bearer BQBgsQpRwcL9TX7QN1-xAtLDVZcxC2JDpuK6hxUz6iIrnmJW4UZni3BjcYNKvIpFc5VYS9du4wdnhABX-PK-XtvGTS6VbjmulkjWNKck_YEflar3x1c19uYZrVxVUtd60Ez5HGDAT0R3ietIus8ehyk"},
            success: function(result){
                //$('.class').empty();
                $('#artist').show();
                $('#albums').hide();
                $('#tracks').hide();
                $('#track').hide();
                $('#SelectArtist').empty();
                $('#tracks > .col-md-6 > li').remove();
                
                result.artists.items.forEach(function(artist) {
                    
                    //$('#artist').append('<div class="col-md-3">' + artist.name + '</div>');
                    $('#SelectArtist').append('<option value="' + artist.name + '">' + artist.name + '</option>');
                });
            }
          });
    });

    $('#SelectArtist').change(function(e){
        e.preventDefault();

        var queryAlbums = $(this).val();
        
        $.ajax({

            url: "https://api.spotify.com/v1/search?query=" + queryAlbums + "&type=album",

            type: 'GET',

            headers: {"Authorization": "Bearer BQBgsQpRwcL9TX7QN1-xAtLDVZcxC2JDpuK6hxUz6iIrnmJW4UZni3BjcYNKvIpFc5VYS9du4wdnhABX-PK-XtvGTS6VbjmulkjWNKck_YEflar3x1c19uYZrVxVUtd60Ez5HGDAT0R3ietIus8ehyk"},
            success: function(result){
                $('#albums').empty();
                $('#albums').show();
                $('#albums > .col-md-3').empty();

                result.albums.items.forEach(function(albums){
                    console.log(albums.id);
                    var src = albums.images[2].url;
                    var wid = albums.images[2].width;
                    var heig = albums.images[2].width;
                    //$('#SelectAlbum').append('<option value="' + albums.id + '">' + albums.name + '</option>');
                    $('#albums').append('<div class="col-md-3"><p><img src="' + src + '" alt=""></p><p><a href="#" id="' + albums.id + '">' + albums.name + '</a></p></div>')
                });

            }
        });
        
    });

    $('#albums').on('click', 'a', function(e){
        //e.preventDefault();

        var queryTracks = $(this).attr('id');
        
        $.ajax({

            url: "https://api.spotify.com/v1/albums/" + queryTracks + "/tracks",

            type: 'GET',

            headers: {"Authorization": "Bearer BQBgsQpRwcL9TX7QN1-xAtLDVZcxC2JDpuK6hxUz6iIrnmJW4UZni3BjcYNKvIpFc5VYS9du4wdnhABX-PK-XtvGTS6VbjmulkjWNKck_YEflar3x1c19uYZrVxVUtd60Ez5HGDAT0R3ietIus8ehyk"},

            success: function(result){
                
                $('#albums').hide();
                $('#tracks').show();
                $('#SelectTracks').empty();
                $('#SelectTrack').empty();

                result.items.forEach(function(tracks){
                    
                    $('#tracks > .col-md-6').append('<li class="list-group-item" id="' + tracks.id + '">' + tracks.name + '</li>');
                });

            }
        });
    });

    $('#tracks').on('click', 'li' , function(e){
        
        var queryTrack = $(this).attr('id');
        
        $.ajax({
            url: "https://api.spotify.com/v1/tracks/" + queryTrack,

            type: 'GET',

            headers: {"Authorization": "Bearer BQCEHt-Pu5BoGQFkCGt43FoSg-zEPKLYoP9DfL797AycLU4GNuKrWB2nV2mXQ-jlLYGinrLDZtxrkgfIeTVT1uhedArDkPCqAIVgnWejByPuhOYnHGbGUl3sMyYqXJSf6RdTUnFeHUakVCiZ2Ijyys4"},

            success: function(result){
                //console.log(result);
                $('#tracks').hide();
                $('#track').show();
                $('#SelectTrack').empty();

                var song = result.preview_url;

                console.log(song);
                
                $('#track > .col-md-6').append('<p><h2>' + result.name + '</h2></p><audio controls id="playing"><source src="' + song + '" type="audio/mpeg"></audio>');
            }
        })
    })

})();