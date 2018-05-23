function onYouTubeIframeAPIReady() {
  const vidLink = document.getElementById("link").value;
  const clearLink = vidLink.replace("https://www.youtube.com/watch?v=","");
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
      $(".btn-primary").attr('class', 'btn btn-success');
      $('#sendVid').text('Send invite');
      socket.emit("linkOfVideo", vidLink);
    }
  }
  // xhuZfX8FCac

  // https://www.youtube.com/watch?v=7q9v8yhrFbQ
