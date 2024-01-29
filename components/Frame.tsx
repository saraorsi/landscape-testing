"use client";
import axios from "axios";
import { useEffect, useState } from "react";

type FrameProps = {
  initialInput: string;
};

export default function Frame({ initialInput }: FrameProps) {
  const [input, setInput] = useState(initialInput);
  const [landscapes, setLandscapes] = useState<Array<string>>([]);
  const [reading, setReading] = useState(false);
  const [state, setState] = useState("");
  const [count, setCount] = useState(0);

  async function fetchSpectulation(input: string) {
    setState("generating speculation");
    const response = await axios.post("/api/generateSpeculation", {
      input,
    });
    const speculation = await response.data;
    await fetchLandscape(speculation);
  }

  async function fetchLandscape(speculation: string) {
    setState("generating landscape");
    try {
      const response = await axios.post("/api/generateLandscape", {
        speculation,
      });
      const landscape = await response.data;
      setLandscapes((prev: Array<string>) => [...prev, landscape]);
      setTimeout(() => speakDescription(speculation), 3000);
    } catch (error) {
      console.error("Error fetching landscape:", error);
    }
  }

  function speakDescription(speculation: string) {
    const synth = window.speechSynthesis;
    if ("speechSynthesis" in window) {
      synth.cancel();
      // const voices = synth.getVoices();
      //const selectedVoice = voices[10];
      const utterance = new SpeechSynthesisUtterance(speculation);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      //utterance.voice = selectedVoice;

      utterance.onstart = () => {
        setInput(speculation);
        setState("");
        setReading(true);
      };

      utterance.onend = () => {
        setReading(false);
        if (count === 10) {
          // Do something after 10 readings
        } else {
          // Increment the count or handle as needed
          setCount(count + 1);
          // Fetch the next speculation
          fetchSpectulation(speculation);
        }
      };
      synth.speak(utterance);
    } else {
      console.log("Your browser does not support speech synthesis.");
    }
  }

  useEffect(() => {
    //new Promise((resolve) => setTimeout(resolve, 2000));
    fetchSpectulation(initialInput);
  }, []);

  return (
    <>
      {state && (
        <div className="fixed top-5 left-5 flicker z-20 text-sm font-mono">
          [{state}]
        </div>
      )}
      {landscapes &&
        landscapes.map((landscape, index) => (
          <div key={index} className="fixed top-0 left-0 w-full h-screen">
            <figure className="w-full h-full left-[-200%]">
              <img
                className={`opacity-100 ${
                  index === landscapes.length - 1
                    ? "opacity-0 fade-in"
                    : "bounce-frame"
                }`}
                src={landscape}
              />
            </figure>
          </div>
        ))}
      <div className="fixed bottom-10 text-center px-64 text-xl">
        {reading && input}
      </div>
    </>
  );
}
