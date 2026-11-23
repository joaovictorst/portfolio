"use client";

import { useState } from "react";
import DesktopIcon from "./components/DesktopIcon";
import Page from "./components/Page";
import Contato from "./components/Contato";
import SobreMim from "./components/SobreMim";
import Taskbar from "./components/Taskbar";
import WelcomeModal from "./components/WelcomeModal";

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);
  const [openWindows, setOpenWindows] = useState<Set<string>>(new Set());
  const [zOrder, setZOrder] = useState<string[]>([]);
  const [welcome, setWelcome] = useState(true);

  const focusWindow = (id: string) => setZOrder(prev => [...prev.filter(w => w !== id), id]);
  const openWindow = (id: string) => { setOpenWindows(prev => new Set(prev).add(id)); focusWindow(id); };
  const closeWindow = (id: string) => { setOpenWindows(prev => { const s = new Set(prev); s.delete(id); return s; }); setZOrder(prev => prev.filter(w => w !== id)); };
  const zIndex = (id: string) => zOrder.indexOf(id) + 1;

  const positions: Record<string, { x: number; y: number }> = {
    "sobre-mim":  { x: 150, y: 80 },
    "contato":    { x: 190, y: 110 },
    "Lixeira":    { x: 230, y: 140 },
    "Projetos":   { x: 270, y: 170 },
  };

  return (
    <div className="flex flex-col max-h-screen">
      {welcome && <WelcomeModal onClose={() => setWelcome(false)} onOpenProjetos={() => openWindow("Projetos")} />}
      <main
        className="bg-[url('../public/wallpaper.jpg')] w-full h-screen bg-cover bg-center flex flex-col flex-wrap content-start items-start gap-6 p-4"
        onClick={() => setSelected(null)}
      >
        {openWindows.has("sobre-mim") && (
          <Page
            titulo="Sobre mim"
            icon="/icons/my-computer-32x32.png"
            onClose={() => closeWindow("sobre-mim")}
            initialPos={positions["sobre-mim"]}
            zIndex={zIndex("sobre-mim")}
            onFocus={() => focusWindow("sobre-mim")}
          >
            <SobreMim />
          </Page>
        )}

        <DesktopIcon
          src="/icons/my-computer-32x32.png"
          label="Sobre mim"
          selected={selected === "sobre-mim"}
          onSelect={() => setSelected("sobre-mim")}
          onOpen={() => openWindow("sobre-mim")}
        />

        {openWindows.has("contato") && (
          <Page
            titulo="Contato"
            icon="/icons/mail-32x32.png"
            statusBar="1 objeto . 100% original"
            onClose={() => closeWindow("contato")}
            initialPos={positions["contato"]}
            zIndex={zIndex("contato")}
            onFocus={() => focusWindow("contato")}
          >
            <Contato />
          </Page>
        )}
        <DesktopIcon
          src="/icons/mail-32x32.png"
          label="Contato"
          selected={selected === "contato"}
          onSelect={() => setSelected("contato")}
          onOpen={() => openWindow("contato")}
        />

        {openWindows.has("Lixeira") && (
          <Page
            titulo="Lixeira"
            icon="/icons/recycle-bin-32x32.png"
            onClose={() => closeWindow("Lixeira")}
            initialPos={positions["Lixeira"]}
            zIndex={zIndex("Lixeira")}
            onFocus={() => focusWindow("Lixeira")}
            itens={[
              { nome: "GTA 7.doc", tipo: "/icons/doc-32x32.png" },
              { nome: "ideias_ruins.txt", tipo: "/icons/notepad-32x32.png" },
              { nome: "projeto_final_v7_AGORA_VAI.rar", tipo: "/icons/winrar-32x32.png" },
            ]}
          />
        )}
        <DesktopIcon
          src="/icons/recycle-bin-32x32.png"
          label="Lixeira"
          selected={selected === "Lixeira"}
          onSelect={() => setSelected("Lixeira")}
          onOpen={() => openWindow("Lixeira")}
        />

        {openWindows.has("Projetos") && (
          <Page
            titulo="Projetos"
            icon="/icons/my-documents-32x32.png"
            onClose={() => closeWindow("Projetos")}
            initialPos={positions["Projetos"]}
            zIndex={zIndex("Projetos")}
            onFocus={() => focusWindow("Projetos")}
            itens={[
              { nome: "Portfolio v1", tipo: "/icons/folder-32x32.png" },
              { nome: "README",       tipo: "/icons/notepad-32x32.png" },
              { nome: "Command",      tipo: "/icons/msdos-32x32.png" },
            ]}
          />
        )}
        <DesktopIcon
          src="/icons/my-documents-folder-32x32.png"
          label="Projetos"
          selected={selected === "Projetos"}
          onSelect={() => setSelected("Projetos")}
          onOpen={() => openWindow("Projetos")}
        />
      </main>

      <Taskbar />
    </div>
  );
}
