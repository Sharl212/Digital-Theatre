socket.on('vidLink', (link)=>{
    console.log(link);
    document.getElementById('VideosBeingPlayed').innerHTML = `videos being played by other people ${link}`;
    
    document.getElementById('VideosBeingPlayed').addEventListener('click', ()=>{
        document.getElementById('link').value = link;
        onYouTubeIframeAPIReady();
    })
})

socket.on("newTime", (time) => {
    if(time == "buffering"){
        return player.pauseVideo();        
    }else{
        player.playVideo();
        player.seekTo(time);
        console.log("new time", time);
    }
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

socket.on("VolumeLevels", (setting)=>{
    if(setting == "Mute"){
        player.mute();
    }else if(setting == "unMute"){
        player.unMute();
    }
    console.log("new volume", setting)
})