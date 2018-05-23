function Play() {
    player.playVideo();

    socket.emit('videoCmd', "PLAY");
}

function Pause() {
    player.pauseVideo();

    socket.emit('videoCmd', "PAUSE");
}

function Mute() {
    player.mute();

    socket.emit('VolumeSetting', "Mute");
}

function unMute() {
    player.unMute();

    socket.emit('VolumeSetting', "unMute");
}

function setVolume() {
    player.setVolume();
}