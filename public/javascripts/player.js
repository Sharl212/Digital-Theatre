function onYouTubeIframeAPIReady() {
    if (document.getElementById("link").value === "") {
      console.log('enter ur video link');
    } else {
      player = new YT.Player('player', {
        height: '620',
        width: '1080',
        videoId: `${document.getElementById("link").value}`,
        playerVars: { 'autoplay': 1, 'controls': 0, 'loop': 1 },
        events: {
          onReady: onPlayerReady
        }
      });
    }
  }
  