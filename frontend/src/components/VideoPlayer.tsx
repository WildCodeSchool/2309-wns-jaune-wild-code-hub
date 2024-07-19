import React from "react";

const VideoPlayer = () => {
  return (
    <iframe
      width="640"
      height="590"
      src="https://www.youtube.com/embed/ujFvOaJy6DI?si=N1lv7_kb7tnxBHTx"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  );
};

export default VideoPlayer;
