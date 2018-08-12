import ItunesService from "./itunes-service.js";

//PRIVATE

const itunesService = new ItunesService()

function drawSongs(results) {
  let template = ''

  for (let i = 0; i < results.length; i++) {
    if (results[i].preview.includes('video')) {
      continue
    } if (results[i].price <= 0) {
      continue
    }
    else {
      const song = results[i];
      template += `
    <div class="col-sm-4 px-5 d-inline-block my-5">
      <div class="song-card">
      <p class="text-truncate">${song.artist}</p>
      <p class="text-truncate">${song.title}</p>
      <p class="text-truncate">${song.collection}</p>
      <p class="text-truncate">$${song.price}</p>
      <p><img src="${song.albumArt}" alt="" class="img-fluid img-thumbnail" /></p>
      <p><audio controls><source src="${song.preview}" type="audio/mp4"></audio></p>
      </div>
      </div>
    `
    }
    document.getElementById("songs").innerHTML = template
  }
}


document.addEventListener('play', function (e) {
  var play = document.getElementsByTagName('audio');
  for (var i = 0, len = play.length; i < len; i++) {
    if (play[i] != e.target) {
      play[i].pause();
    }
  }
}, true);



//PUBLIC
class ItunesController {
  //DO NOT MODIFY THIS METHOD
  getMusic(e) {
    e.preventDefault();
    var artist = e.target.artist.value;
    //changes the button to loading while songs load
    // @ts-ignore
    $('#get-music-button').text('LOADING....');
    itunesService.getMusicByArtist(artist).then(results => {
      drawSongs(results)
      //changes button back to GET MUSIC once songs are loaded
      // @ts-ignore
      $('#get-music-button').text('GET MUSIC');
    })
  }


}


export default ItunesController