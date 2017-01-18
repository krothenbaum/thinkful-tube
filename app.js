var YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  var query = {
  	part: 'snippet',
    key: 'AIzaSyA3IHL73MF00WFjgxdwzg57nI1CwW4dybQ',
    maxResults: 6,
    type: 'video',
    q: searchTerm
  }
  $.getJSON(YOUTUBE_URL, query, callback);
}


function displayYoutubeSearchData(data) {
  console.log(data);
  var resultsHTML = '<div class="row">';
  data.items.forEach(function (item) {
    // resultsHTML = (resultsHTML +'<div class="search-item col s12 m4"><div class="video-container z-depth-2">' +
    // '<iframe width="853" height="480" src="https://www.youtube.com/embed/' + item.id.videoId + '?rel=0" frameborder="0" allowfullscreen></iframe>' +
    // '</div></div>');
    resultsHTML = (resultsHTML + '<div class="search-item col s12 m6"><div class="card small hoverable">' +
            '<div class="card-image">' +
              '<iframe src="https://www.youtube.com/embed/' + item.id.videoId + '" frameborder="0" allowfullscreen></iframe>' +
            '</div>' +
            '<div class="card-content">' +
              '<p class="truncate">' + item.snippet.title + '</p>' +
            '</div>' +
            '<div class="card-action">' +
              '<a href="https://www.youtube.com/channel/' + item.snippet.channelId + '">View more from '+ item.snippet.channelTitle + '</a>' +
            '</div>' + 
          '</div></div>')
  });
  
  resultsHTML = resultsHTML + '</div>';

  $('.search-results').html(resultsHTML);
  $('.next-page').removeClass('hidden');

}

function watchSubmit() {
  $('form[name="user-search"]').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.user-search-input').val();
    getDataFromApi(query, displayYoutubeSearchData); 
  });
}

$(document).ready(function () {
	watchSubmit();
})

