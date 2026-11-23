const stacks = {
  "Front End": [
    { src: "/icons/stacks/js-32x32.png",               label: "JavaScript" },
    { src: "/icons/stacks/ts-32x32.png",               label: "TypeScript" },
    { src: "/icons/stacks/html-32x32.png",             label: "HTML" },
    { src: "/icons/stacks/css-32x32.png",              label: "CSS" },
    { src: "/icons/stacks/tailwind-32x32.png",         label: "Tailwind CSS" },
    { src: "/icons/stacks/styled-components-32x32.png",label: "Styled Components" },
    { src: "/icons/stacks/axios-32x32.png",            label: "Axios" },
    { src: "/icons/stacks/nextjs-32x32.png",           label: "Next.js" },
    { src: "/icons/stacks/jquery-32x32.png",           label: "jQuery" },
    { src: "/icons/stacks/heroui-32x32.png",           label: "HeroUI" },
    { src: "/icons/stacks/vite-32x32.png",             label: "Vite" },
  ],
  "Back End": [
    { src: "/icons/stacks/php-32x32.png",    label: "PHP" },
    { src: "/icons/stacks/laravel-32x32.png",label: "Laravel" },
  ],
  "Outras": [
    { src: "/icons/stacks/docker-32x32.png", label: "Docker" },
    { src: "/icons/stacks/git-32x32.png",    label: "Git" },
    { src: "/icons/stacks/linux-32x32.png",  label: "Linux" },
    { src: "/icons/stacks/nginx-32x32.png",  label: "Nginx" },
  ],
};

function StackIcon({ src, label }: { src: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 w-20">
      <img src={src} alt={label} className="w-12 h-12 [image-rendering:pixelated]" />
      <span className="text-center leading-tight">{label}</span>
    </div>
  );
}

export default function SobreMim() {
  return (
    <div className="flex flex-col text-[13px]">
      <div className="toolbar flex gap-4 px-2 py-1">
        {["Arquivo", "Editar", "Exibir", "Favoritos", "Ajuda"].map(m => (
          <span key={m} className="cursor-default">{m}</span>
        ))}
      </div>

      <div className="flex min-h-0">
        <div className="sunken-panel w-64 shrink-0 flex flex-col items-center gap-3 p-4 text-center">
          <img
            src="/icons/my-computer-32x32.png"
            alt="avatar"
            className="w-16 h-16 [image-rendering:pixelated]"
          />
          <p className="font-bold text-[15px]">João Victor</p>
          <hr className="w-full" />
          <p className="text-left leading-relaxed">
            Desenvolvedor Web Full-Stack.<br /><br />
            Cursando Sistemas de Informação na UEG.<br /><br />
            Apaixonado por tecnologia e sempre aprendendo.
          </p>
        </div>

        <div className="sunken-panel flex-1 p-4 flex flex-col gap-4 overflow-auto">
          {Object.entries(stacks).map(([categoria, items]) => (
            <div key={categoria}>
              <p className="font-bold text-[14px] mb-2">{categoria}</p>
              <div className="flex flex-wrap gap-3">
                {items.map(s => <StackIcon key={s.label} {...s} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
