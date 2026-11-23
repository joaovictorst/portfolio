"use client";

import { useEffect, useState } from "react";
import SimpleModal from "./SimpleModal";
import StartButton from "./StartMenu";

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return <span className="text-[13px] font-bold">{time}</span>;
}

export default function Taskbar() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <footer className="flex items-center gap-1 px-1 shrink-0 h-10 bg-[#c0c0c0] border-t-2 border-t-white shadow-[inset_0_1px_0_#dfdfdf] select-none">
      <StartButton />
      <div className="w-px h-6 bg-[#808080] border-r border-r-white mx-0.5" />
      <div className="flex-1" />
      <div className="flex items-center gap-2 h-7 px-2 shadow-[inset_1px_1px_0_#808080,inset_-1px_-1px_0_#fff]">
        <img
          src="/audio.png"
          alt="audio"
          className="w-4 h-4 cursor-pointer [image-rendering:pixelated]"
          onClick={() => { new Audio("/sons/CHORD.wav").play(); setModalOpen(true); }}
        />
        <div className="w-px h-4 bg-[#808080]" />
        <Clock />
      </div>

      {modalOpen && <SimpleModal onClose={() => setModalOpen(false)} />}
    </footer>
  );
}
