function onYouTubeIframeAPIReady() {
  const vidLink = document.getElementById("link").value;
    if (vidLink == "") {
      console.log('enter ur video link');
    } else {
      player = new YT.Player('player', {
        height: '600',
        width: '1080',
        videoId: `${vidLink}`,
        playerVars: { 'autoplay': 1, 'controls': 0, 'loop': 1, 'suggestedQuality': 'large' },
        events: {
          onReady: onPlayerReady
        }
      });
      socket.emit("linkOfVideo", vidLink);      
    }
  }
  // xhuZfX8FCac