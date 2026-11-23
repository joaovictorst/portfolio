"use client";

import { useRef, useState, type ReactNode } from "react";
import DesktopIcon from "./DesktopIcon";

export type Item = {
  nome: string;
  tipo: string;
};

type Props = {
  titulo: string;
  icon?: string;
  statusBar?: string;
  children?: ReactNode;
  itens?: Item[];
  onClose?: () => void;
  initialPos?: { x: number; y: number };
  zIndex?: number;
  onFocus?: () => void;
};

export default function Page({ titulo, icon, statusBar, children, itens, onClose, initialPos, zIndex, onFocus }: Props) {
  const [pos, setPos] = useState(initialPos ?? { x: 100, y: 80 });
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const drag = useRef<{ ox: number; oy: number } | null>(null);

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
    <div className="window absolute min-w-[280px]" style={{ left: pos.x, top: pos.y, zIndex }} onMouseDown={onFocus}>
      <div className="title-bar cursor-move" onMouseDown={onMouseDown}>
        {icon && <img src={icon} alt="" className="w-4 h-4 [image-rendering:pixelated]" />}
        <div className="title-bar-text">{titulo}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close" onMouseDown={e => e.stopPropagation()} onClick={onClose}></button>
        </div>
      </div>

      <div className="window-body">
        {itens ? (
          <div className="flex flex-wrap gap-2" onClick={() => setSelectedItem(null)}>
            {itens.map((item) => (
              <DesktopIcon
                key={item.nome}
                src={item.tipo}
                label={item.nome}
                selected={selectedItem === item.nome}
                onSelect={() => setSelectedItem(item.nome)}
                textColor="black"
              />
            ))}
          </div>
        ) : children}
      </div>

      {(statusBar || itens) && (
        <div className="status-bar">
          <p className="status-bar-field">
            {itens ? `${itens.length} objeto${itens.length !== 1 ? "s" : ""}` : statusBar}
          </p>
        </div>
      )}
    </div>
  );
}
