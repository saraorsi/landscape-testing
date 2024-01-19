"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Frame from "./Frame";

export default function NewInput() {
  const [newInput, setNewInput] = useState(
    "Ultimately, it can be more difficult for a computational system not to be creative, even if residually, than to be creative. However, we will also argue that their creativity may be dif ficult for humans to recognize, especially when considering these systems and eval uating their creative acts from an anthro pocentric perspective."
  );
  const [landscape, setLandscape] = useState("");
  const [state, setState] = useState("");
  const [count, setCount] = useState(0);

  let newCount = 0;
  async function fetchSpectulation(input: string) {
    setState("generate speculation");
    const response = await axios.post("/api/generateSpeculation", {
      input,
    });
    const speculation = await response.data;
    console.log(response);
    //await new Promise((resolve) => setTimeout(resolve, 2000));
    setState("speculation finish");
    await fetchLandscape(speculation);
  }

  async function fetchLandscape(speculation: string) {
    setState("generate landscape");
    const response = await axios.post("/api/generateLandscape", {
      speculation,
    });
    const landscape = await response.data;
    setLandscape(landscape);
    //await new Promise((resolve) => setTimeout(resolve, 2000));
    setState("landscape finish");
    speakDescription(speculation);
    newCount = newCount + 1;
  }

  function speakDescription(speculation: string) {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      // const voices = window.speechSynthesis.getVoices(); // Get all available voices
      // const selectedVoice = voices[10]; // You might want to choose an appropriate index
      const utterance = new SpeechSynthesisUtterance(speculation);
      utterance.rate = 1;
      utterance.pitch = 0.6;
      //utterance.voice = selectedVoice;

      utterance.onstart = () => {
        setNewInput(speculation);
        setState("reading");
      };

      utterance.onend = () => {
        setState("end");
        if (count === 10) {
          // Do something after 10 readings
        } else {
          // Increment the count or handle as needed
          setCount(count + 1);
          // Fetch the next speculation
          fetchSpectulation(speculation);
        }
      };
      window.speechSynthesis.speak(utterance);
    } else {
      console.log("Your browser does not support speech synthesis.");
    }
  }

  useEffect(() => {
    fetchSpectulation(newInput);
  }, []); // Run once when the component mounts

  return (
    <>
      <div className="state">[{state}]</div>
      <Frame input={newInput} landscape={landscape} />
    </>
  );
}
