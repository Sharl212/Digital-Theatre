socket.on("newTime", (time) => {
    player.seekTo(time);
    console.log("new time", time);
});
socket.on("pauseOrPlay", (cmd) => {
    if (cmd == "PAUSE") {
        player.pauseVideo();
    }
    else {
        player.playVideo();
    }
    console.log("new command", cmd);
});

