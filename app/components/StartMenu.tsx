"use client";

import { useEffect, useRef, useState } from "react";

type MenuItem = { icon: string; label: string; onClick?: () => void };

function buildItems(callbacks: { onExecutar?: () => void }): (MenuItem | null)[] {
  return [
    { icon: "/icons/programs-32x32.png",      label: "Programas" },
    { icon: "/icons/start-settings-32x32.png", label: "Configurações" },
    { icon: "/icons/find-file-32x32.png",      label: "Localizar" },
    { icon: "/icons/help-32x32.png",           label: "Ajuda" },
    { icon: "/icons/msdos-32x32.png",          label: "MS-DOS Prompt...", onClick: callbacks.onExecutar },
    null,
    { icon: "/icons/shutdown-32x32.png",       label: "Desligar..." },
  ];
}

export default function StartButton({ onExecutar }: { onExecutar?: () => void }) {
  const items = buildItems({ onExecutar });
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {open && (
        <div className="window absolute bottom-full left-0 mb-1 w-56 z-[9999]">
          <div className="flex">
            <div className="bg-[#808080] w-7 flex items-end justify-center pb-2 shrink-0">
              <span
                className="text-white font-bold text-[16px] tracking-widest select-none"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                meu portfolio<span className="font-normal text-[#c0c0c0]">!</span>
              </span>
            </div>

            <div className="flex flex-col py-1 flex-1">
              {items.map((item, i) =>
                item === null ? (
                  <div key={i} className="border-t border-[#808080] my-1 mx-2" />
                ) : (
                  <div
                    key={item.label}
                    onClick={() => { setOpen(false); item.onClick?.(); }}
                    className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-[#000080] hover:text-white text-[13px]"
                  >
                    <img src={item.icon} alt="" className="w-6 h-6 [image-rendering:pixelated] shrink-0" />
                    {item.label}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 h-8 px-2 text-[13px] font-bold text-black
          shadow-[inset_-1px_-1px_0_#000,inset_1px_1px_0_#fff,inset_-2px_-2px_0_#808080,inset_2px_2px_0_#dfdfdf]
          active:shadow-[inset_1px_1px_0_#000,inset_-1px_-1px_0_#fff,inset_2px_2px_0_#808080,inset_-2px_-2px_0_#dfdfdf]"
      >
        <img src="/buttonIcon.png" alt="" className="h-5 w-5 [image-rendering:pixelated]" />
        Start
      </button>
    </div>
  );
}
