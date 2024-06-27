import React, { useRef, useEffect, MutableRefObject } from "react";

// Define an interface for the component's props
interface AutoPlaySilentVideoProps {
  className?: string;
  video: string;
}

export default function AutoPlaySilentVideo(props: AutoPlaySilentVideoProps) {
  // Add a type for the ref: MutableRefObject<HTMLVideoElement | null>
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
    }
  }, []); // Ensure effect runs only once by adding an empty dependency array

  return (
    <video
      className={props.className}
      ref={videoRef}
      loop
      autoPlay
      muted
      playsInline
    >
      <source src={props.video}/>
    </video>
  );
}
