

socket.on('connect', () => {
    console.log("fired");

    socket.emit('newUserConnected', "New user is connected!");
});

socket.on('disconnect', () => {
    console.log("fired");

    socket.emit('newUserConnected', "User disconnected");
});

socket.on("aNewUserConnected", (msg) => {
    const alert = $(".alert-warning");
    console.log('new user notification');
    alert.text(msg);
    alert.css({ "display": "block" });
    setTimeout(() => {
        alert.css({ "display": "none" });
    }, 8000);
});

socket.on('vidLink', (link) => {
    const alert = $(".alert-success");
    alert.text(`a new video being watched : '${link}' click to join the party!`);
    alert.css({ "display": "block" });
    setTimeout(() => {
        alert.css({ "display": "none" });
    }, 12000);

    $("#VideosBeingPlayed").on('click', () => {
        $('#link').val(link);
        onYouTubeIframeAPIReady();
    });
})

socket.on("newTime", (time) => {
    if (time == "buffering") {
        return player.pauseVideo();
    } else {
        player.seekTo(time);
        console.log("new time", time);
        document.getElementById('command-log').innerHTML += `<li class="list-group-item" >skip to ${Math.round(time)} second/s</li>`;
    }
});


socket.on("pauseOrPlay", (cmd) => {
    if (cmd == "PAUSE") {
        player.pauseVideo();
        document.getElementById('command-log').innerHTML += '<li class="list-group-item" >PAUSE</li>';
    }
    else {
        player.playVideo();
        document.getElementById('command-log').innerHTML += '<li class="list-group-item" >PLAY</li>';        
    }

    console.log("new command", cmd);
});

socket.on("VolumeLevels", (setting) => {
    if (setting == "Mute") {
        player.mute();
        document.getElementById('command-log').innerHTML += '<li class="list-group-item" >MUTE</li>';        
    } else if (setting == "unMute") {
        player.unMute();
        document.getElementById('command-log').innerHTML += '<li class="list-group-item" >unMUTE</li>';        
    }
    console.log("new volume", setting)
});

socket.on("UsersLength", (length) => {
    console.log(length); // number of users connected.

    document.getElementById("count").innerHTML = `<span class='btn btn-outline-success'>Online Users ${length-1}</span>`;
})
