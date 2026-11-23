const links = [
  {
    icon: "/icons/stacks/linkedin-32x32.png",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/joaovictorst/",
  },
  {
    icon: "/icons/stacks/github-32x32.png",
    label: "GitHub",
    href: "https://github.com/joaovictorst",
  },
];

export default function Contato() {
  return (
    <div className="flex gap-6 p-4">
      {links.map(({ icon, label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 w-20 cursor-pointer no-underline text-black hover:underline"
        >
          <img src={icon} alt={label} className="w-12 h-12 [image-rendering:pixelated]" />
          <span className="text-[13px] text-center">{label}</span>
        </a>
      ))}
    </div>
  );
}
