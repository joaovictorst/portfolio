
export default function SimpleModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="window" style={{ width: 300 }}>
        <div className="title-bar">
          <div className="title-bar-text">Portfolio</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close" onClick={onClose}></button>
          </div>
        </div>
        <div className="window-body">
          <p>Bom dia</p>
          <div className="flex justify-end">
            <button className="cursor-pointer" onClick={onClose}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
}
