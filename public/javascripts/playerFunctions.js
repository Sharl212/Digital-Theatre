const socket = io();
let player;

function onPlayerReady(event) {
  updateDuration();
  progress_bar();
}

time_update_interval = setInterval(function () { // update the duration and progress bar every second.
  updateDuration();
  progress_bar();
}, 1000);

function updateDuration() {
  document.getElementById("duration").value = `${Math.round(player.getDuration() / 60)} minutes`;
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

  socket.emit("time", newTime);
});

