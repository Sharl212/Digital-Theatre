function Play() {
    player.playVideo();

    socket.emit('videoCmd', "PLAY");
}

function Pause() {
    player.pauseVideo();

    socket.emit('videoCmd', "PAUSE");
}