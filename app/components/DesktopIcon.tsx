"use client";

type Props = {
  src: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
  onOpen?: () => void;
  textColor?: string;
};

export default function DesktopIcon({ src, label, selected, onSelect, onOpen , textColor}: Props) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="flex flex-col items-center gap-1.5 w-24 cursor-pointer p-1 outline-none"
      style={selected ? { outline: "1px dotted white", outlineOffset: "2px" } : undefined}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      onKeyDown={(e) => e.key === "Enter" && onOpen?.()}
      onDoubleClick={onOpen}
    >
      <img
        src={src}
        alt={label}
        className="w-12 h-12 [image-rendering:pixelated]"
        style={selected ? { filter: "opacity(0.75) drop-shadow(0 0 0 #000080)" } : undefined}
      />
      <span
        className="text-[13px] text-center leading-tight px-0.5 w-full break-all"
        style={selected
          ? { color: textColor ?? "white", background: "#000080", border: "1px dotted #ffff00" }
          : { color: textColor ?? "white", textShadow: textColor ? "none" : "1px 1px 1px #000", border: "1px dotted transparent" }
        }
      >
        {label}
      </span>
    </div>
  );
}
