const socket = io();
let player;

function onYouTubeIframeAPIReady() {
  const vidLink = document.getElementById("link").value;
  const clearLink = vidLink.replace("https://www.youtube.com/watch?v=", "");
  console.log(clearLink)
  if (vidLink == "") {
    console.log('enter ur video link');
  } else {
    player = new YT.Player('player', {
      height: '600',
      width: '1080',
      videoId: `${clearLink}`,
      playerVars: { 'autoplay': 1, 'controls': 0, 'loop': 1, 'suggestedQuality': 'large' },
      events: {
        onReady: onPlayerReady
      }
    });
    $('#progressbar-Section').css({"display":"block"});
    $('.controls').css({"display":"block"});
    $(".btn-primary").attr('class', 'btn btn-success');
    $('#sendVid').text('Send invite');
    socket.emit("linkOfVideo", vidLink);
  }
}
function onPlayerReady(event) {
  updateDuration();
  progress_bar();
  document.getElementById('vol').value = player.getVolume();
}

time_update_interval = setInterval(function () { // update the duration and progress bar every second.
  updateDuration();
  progress_bar();
}, 1000);

function updateDuration() {
  document.getElementById("duration").value = `length: ${Math.round(player.getDuration() / 60)} minutes`;
}

function progress_bar() {
  const percentage = player.getCurrentTime() / player.getDuration() * 100;
  const seconds = Math.floor(player.getCurrentTime());
  const minutes = Math.floor(player.getDuration());

  document.getElementById("time").value = `${seconds} / ${minutes} seconds`;
  document.getElementsByClassName('progress-bar')[0].style.width = `${percentage}%`;
  $('.range-progress-bar').val(percentage);
}


$('.range-progress-bar').on('mouseup touchend', function (e) {
  // Calculate the new time for the video.
  // new time in seconds = total duration in seconds * ( value of range input / 100 )
  const newTime = player.getDuration() * (e.target.value / 100);
  // Skip video to new time.
  player.seekTo(newTime);

  if (player.getPlayerState() == 3) {
    socket.emit("time", "buffering");
  }
  socket.emit("time", newTime);
});

$('.setVolume').on('mouseup touchend', function (e) {
  player.setVolume(e.target.value);
  document.getElementById('vol').value = e.target.value;
  console.log(e.target.value);
});