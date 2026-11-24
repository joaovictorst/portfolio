"use client";

import { useRef, useState } from "react";

export default function WelcomeModal({ onClose, onOpenProjetos }: { onClose: () => void; onOpenProjetos?: () => void }) {
  const [pos, setPos] = useState({ x: 100, y: 80 });
  const drag = useRef<{ ox: number; oy: number } | null>(null);
  const [tipIndex, setTipIndex] = useState(0);

  const tips = [
    "Aqui você encontrará informações sobre mim, meus projetos e como entrar em contato. Sinta-se à vontade para explorar!",
    <span>No ícone <img src="/icons/my-computer-32x32.png" alt="Sobre mim" className="inline w-8 h-8 [image-rendering:pixelated] align-middle" /> você pode acessar informações sobre mim, minhas stacks e linguagens nas quais já trabalhei/trabalho.</span>,
    <span>No ícone <img src="/icons/mail-32x32.png" alt="Contato" className="inline w-8 h-8 [image-rendering:pixelated] align-middle" /> você encontra meus links de contato, como LinkedIn e GitHub.</span>,
    <span>Na <img src="/icons/recycle-bin-32x32.png" alt="Lixeira" className="inline w-8 h-8 [image-rendering:pixelated] align-middle" /> você pode encontrar algumas ideias minhas que foram descartadas ao longo do tempo.</span>,
    <span>No ícone <img src="/icons/my-documents-folder-32x32.png" alt="Projetos" className="inline w-8 h-8 [image-rendering:pixelated] align-middle" /> você pode ver os meus projetos atuais.</span>,
  ];

  function onMouseDown(e: React.MouseEvent) {
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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="window absolute w-4xl" style={{ left: pos.x, top: pos.y }}>
        <div className="title-bar cursor-move" onMouseDown={onMouseDown}>
          <p className="title-bar-text">Bem-vindo!</p>
          <div className="title-bar-controls">
            <button aria-label="Close" onMouseDown={e => e.stopPropagation()} onClick={onClose}></button>
          </div>
        </div>

        <div className="window-body">
          <h2 className="mb-3">
            Bem-vindo ao meu <span className="font-black">Portfólio</span>
          </h2>

          <div className="flex gap-3">
            <div className="flex-1 bg-[#ffffe0] border border-[#808080] p-3 flex gap-2">
              <span className="shrink-0 mt-0.5">
                <img src="/icons/Welcome_to_Windows_1995.svg" alt="você sabia" className="w-12 h-12 [image-rendering:pixelated]" />
              </span>
              <div>
                <h3 className="font-bold text-[11px] mb-1">Você sabia...</h3>
                <h4>{tips[tipIndex]}</h4>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 shrink-0">
              <button>O que há de novo</button>
              <button onClick={onOpenProjetos}>Projetos</button>
              <button onClick={() => setTipIndex(n => (n + 1) % tips.length)}>Próxima dica</button>
            </div>
          </div>

          <div className="border-t border-t-[#808080] mt-3 pt-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <input type="checkbox" id="show-welcome" defaultChecked />
              <label htmlFor="show-welcome">Exibir esta tela na próxima vez</label>
            </div>
            <button onClick={onClose}>Fechar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
