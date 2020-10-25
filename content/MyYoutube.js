import React from "react";
import YouTube from "react-youtube";

class MyYoutube extends React.Component {
  render() {
    const opts = {
      //height: "390",
      width: "100%",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    return (
      <YouTube
        videoId={this.props.videoId}
        opts={opts}
        onReady={this._onReady}
        style={{ objectFit: "contain" }}
      />
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default MyYoutube;
