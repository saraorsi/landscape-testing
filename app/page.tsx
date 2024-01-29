"use client";
import Frame from "@/components/Frame";
import InicialFrame from "@/components/InicialFrame";
import { use, useEffect, useRef, useState } from "react";

export default function Home() {
  const [input, setInput] = useState(
    "Although the modern Western view of the world is based on their division, nature and culture are interconnected. Culture is a complex and dynamic process of interaction and coevolution between human beings and other species, as well as between technologies and environments. Thus, as is evident with climate change, technology and nature are historically intertwined and must be understood as part of the ecological niche in which the human animal lives."
  );

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      console.log(audioRef);
      audioRef.current.volume = 0.04;
      audioRef.current.playbackRate = 1;
      audioRef.current.muted = false;
      audioRef.current.play();
    }
  });

  return (
    <>
      <InicialFrame input={input} />
      <Frame initialInput={input} />
      <audio ref={audioRef} muted src="/3626487201.mp3" />
    </>
  );
}
