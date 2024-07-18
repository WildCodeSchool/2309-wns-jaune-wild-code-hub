import React from "react";

const VideoPlayer = () => {
  const videoId = "matrix";
  const videoSrc = `https://www.youtube.com/embed/ujFvOaJy6DI/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`;

  const videoResponsiveStyle = {
    overflow: "hidden",
    paddingBottom: "56.25%",
    position: "relative",
    height: 0,
  };

  // const iframeStyle = {
  //   left: 0,
  //   top: 0,
  //   height: "50%",
  //   width: "5s0%",
  //   position: "absolute",
  // };
  return (
    <iframe
      src={videoSrc}
      title="Binary"
      frameborder="0"
      allow="autoplay; encrypted-media;"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
      // style={iframeStyle}
    ></iframe>

    // <video
    //   autoPlay
    //   loop
    //   muted
    //   playsInline
    //   style={{ width: "50%", height: "auto" }}
    // >
    //   <source
    //     src="https://www.youtube.com/embed/ujFvOaJy6DI"
    //     type="video/mp4"
    //   />
    // </video>
  );
};

export default VideoPlayer;
