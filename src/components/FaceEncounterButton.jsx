"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function EncounterButton() {
  const [audio, setAudio] = useState(null);

  // We are using "window!" to initialize the audio object only on the client side.
  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudio(new Audio("/audio/dungeon.mp3"));
    }
  }, []);

  const handleClick = () => {
    if (audio) {
      audio.currentTime = 0; 
      audio.play();

      // To stop the audio after 5 seconds
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
      }, 5000);
    }
  };

  return (
    <div>
      <Link href="/dungeon">
        <button
          onClick={handleClick}
          className="mt-8 px-6 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 hover:shadow-lg transition-all duration-300 animate-pulse"
        >
          Face Encounter
        </button>
      </Link>
    </div>
  );
}
