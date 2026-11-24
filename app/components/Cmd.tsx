"use client";

import { useEffect, useRef, useState } from "react";

const PROMPT = "C:\\WINDOWS>";

function executeCommand(command: string): string[] {
  const normalized = command.trim().toLowerCase();

  if (!normalized) return [];

  if (normalized === "cls") return ["__CLEAR__"];

  if (normalized === "help") return [
    "Comandos disponíveis:",
    "  help     - exibe esta ajuda",
    "  cls      - limpa a tela",
    "  dir      - lista arquivos",
    "  ver      - versão do sistema",
    "  echo     - exibe texto",
    "  jvictor     - talvez apareça algo interessante",
  ];

  if (normalized === "dir") return [
    " Volume em disco não tem nome.",
    " Número de série do volume: 1998-2025",
    "",
    " Pasta de C:\\WINDOWS",
    "",
    "SYSTEM           <DIR>",
    "SYSTEM32         <DIR>",
    "portfolio.exe    1.337 bytes",
    "README.txt       420 bytes",
    "",
    "  2 arquivo(s)    1.757 bytes",
  ];

  if (normalized === "ver") return ["Microsoft Windows 98 [Versão 4.10.2222]"];

  if (normalized.startsWith("echo ")) return [command.slice(5)];

  if (normalized === "jvictor") return [
    "Olá! Eu sou o João Victor, desenvolvedor web e entusiasta de tecnologia.",
    "Este portfólio foi inspirado no Windows 98, um sistema que marcou época.",
    "Sinta-se à vontade para explorar meus projetos e entrar em contato!",
  ];

  return [`'${command}' não é reconhecido como um comando interno ou externo.`];
}

export default function Cmd({ onClose }: { onClose?: () => void }) {
  const [outputLines, setOutputLines] = useState([
    "Microsoft(R) Windows 98",
    "    (C)Copyright Microsoft Corp 1981-1999.",
    "",
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [pos, setPos] = useState({ x: 100, y: 80 });
  const drag = useRef<{ ox: number; oy: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  function onTitleBarMouseDown(e: React.MouseEvent) {
    drag.current = { ox: e.clientX - pos.x, oy: e.clientY - pos.y };
    function onMove(e: MouseEvent) {
      if (!drag.current) return;
      setPos({ x: e.clientX - drag.current.ox, y: e.clientY - drag.current.oy });
    }
    function onUp() {
      drag.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  function onTitleBarTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    drag.current = { ox: t.clientX - pos.x, oy: t.clientY - pos.y };
    function onMove(e: TouchEvent) {
      if (!drag.current) return;
      const t = e.touches[0];
      setPos({ x: t.clientX - drag.current.ox, y: t.clientY - drag.current.oy });
    }
    function onUp() {
      drag.current = null;
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    }
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [outputLines, currentInput]);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "Enter") return;

    const result = executeCommand(currentInput);

    if (result[0] === "__CLEAR__") {
      setOutputLines([]);
    } else {
      setOutputLines(prev => [...prev, `${PROMPT}${currentInput}`, ...result]);
    }

    setCurrentInput("");
  }

  return (
    <div className="window absolute pointer-events-auto" style={{ width: 560, left: pos.x, top: pos.y }}>
      <div className="title-bar cursor-move" onMouseDown={onTitleBarMouseDown} onTouchStart={onTitleBarTouchStart}>
        <div className="title-bar-text flex gap-1">
          <img src="/icons/msdos-16x16.png" alt="" className="w-4 h-4 [image-rendering:pixelated]" />
          MS-DOS Prompt
        </div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Restore"></button>
          <button aria-label="Close" onClick={onClose}></button>
        </div>
      </div>

      <div
        className="bg-black font-mono text-[13px] p-1 cursor-text overflow-y-auto"
        style={{ color: "#fff", minHeight: 220, maxHeight: 400 }}
        onClick={() => inputRef.current?.focus()}
      >
        {outputLines.map((line, index) => (
          <div key={index}>{line || "\u00a0"}</div>
        ))}

        <div className="flex">
          <span>{PROMPT}</span>
          <span>{currentInput}</span>
          <span className="animate-[blink_1s_step-end_infinite] border-l-8 border-white ml-px" />
        </div>

        <div ref={bottomRef} />
      </div>

      <input
        ref={inputRef}
        className="absolute opacity-0 pointer-events-none w-0 h-0"
        value={currentInput}
        autoFocus
        onChange={e => setCurrentInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
}
