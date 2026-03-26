import Icon from "@/components/ui/icon";

const navLinks = ["О центре", "Услуги", "Специалисты", "Галерея", "Прайс", "Отзывы", "Контакты"];

function BlogBubbleButton() {
  return (
    <a
      href="https://blogribkadolli.ru/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-20 right-4 z-[100] flex flex-col items-center gap-1 group"
      style={{ filter: "drop-shadow(0 4px 16px rgba(230,120,0,0.5))" }}
    >
      <div
        className="relative w-24 h-24 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110 group-active:scale-95"
        style={{
          background: "radial-gradient(circle at 35% 30%, #ffe066 0%, #ffaa00 30%, #e85d3b 65%, #b22000 100%)",
          boxShadow: "0 4px 0 #7a1000, 0 6px 24px rgba(200,60,0,0.5), inset 0 2px 8px rgba(255,230,100,0.5)",
          border: "2.5px solid #c47a00",
        }}
      >
        <div
          className="absolute top-2 left-3 w-7 h-4 rounded-full opacity-60"
          style={{ background: "radial-gradient(ellipse, rgba(255,255,220,0.95) 0%, rgba(255,220,80,0.0) 100%)" }}
        />
        <div
          className="absolute bottom-2 right-3 w-4 h-2.5 rounded-full opacity-25"
          style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.8) 0%, transparent 100%)" }}
        />
        <Icon name="BookOpen" size={36} className="text-white drop-shadow-md relative z-10" />
      </div>
      <span
        className="text-xs font-bold tracking-wide px-2 py-0.5 rounded-full"
        style={{ color: "#b22000", textShadow: "0 1px 0 rgba(255,220,100,0.5)", background: "rgba(255,255,255,0.85)" }}
      >
        БЛОГ
      </span>
    </a>
  );
}

interface NavbarProps {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  scrollTo: (id: string) => void;
}

export default function Navbar({ menuOpen, setMenuOpen, scrollTo }: NavbarProps) {
  return (
    <>
    <BlogBubbleButton />
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/c4844e39-f0a4-402d-b73b-86467b249168.png" alt="Рыбка Долли" className="h-12 w-12 object-contain rounded-xl" />
          <div>
            <div className="font-pacifico text-xl text-[#e85d3b] leading-none">Рыбка Долли</div>
            <div className="text-xs text-gray-400 leading-none">Дети наше всё!</div>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-[#e85d3b] rounded-full hover:bg-[#fff0ed] transition-all"
            >
              {link}
            </button>
          ))}
          <a
            href="https://blogribkadolli.ru/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-5 py-2 bg-[#2a8c6e] text-white text-sm font-bold rounded-full transition-all duration-200 shadow-sm hover:bg-[#1f6b52] hover:shadow-md hover:-translate-y-0.5 hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            <Icon name="BookOpen" size={16} /> Блог
          </a>
          <button
            onClick={() => scrollTo("запись")}
            className="ml-2 px-5 py-2 bg-[#e85d3b] text-white text-sm font-bold rounded-full transition-all duration-200 shadow-sm hover:bg-[#c94d2e] hover:shadow-md hover:-translate-y-0.5 hover:scale-105 active:scale-95"
          >
            Записаться
          </button>
        </div>
        <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={24} className="text-gray-700" />
        </button>
      </div>
      {menuOpen && (
        <div className="lg:hidden bg-white border-t px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className="text-left px-4 py-2 text-gray-700 hover:text-[#e85d3b] hover:bg-[#fff0ed] rounded-xl transition-all"
            >
              {link}
            </button>
          ))}
          <a
            href="https://blogribkadolli.ru/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 px-5 py-3 bg-[#2a8c6e] text-white font-bold rounded-full transition-all duration-200 hover:bg-[#1f6b52] hover:scale-105 active:scale-95"
          >
            <Icon name="BookOpen" size={18} /> Блог
          </a>
          <button
            onClick={() => scrollTo("запись")}
            className="px-5 py-3 bg-[#e85d3b] text-white font-bold rounded-full transition-all duration-200 hover:bg-[#c94d2e] hover:scale-105 active:scale-95"
          >
            Записаться
          </button>
          <div className="mt-2 flex flex-col gap-2">
            <a href="tel:+79881521698" className="flex items-center justify-center gap-2 px-5 py-3 bg-[#2a8c6e] text-white font-bold rounded-full transition-all duration-200 hover:bg-[#1f6b52] hover:scale-105 active:scale-95">
              <Icon name="Phone" size={18} /> +7 988 152-16-98
            </a>
            <a href="tel:+79787120353" className="flex items-center justify-center gap-2 px-5 py-3 bg-[#2a8c6e] text-white font-bold rounded-full transition-all duration-200 hover:bg-[#1f6b52] hover:scale-105 active:scale-95">
              <Icon name="Phone" size={18} /> +7 978 712-03-53
            </a>
          </div>
        </div>
      )}
    </nav>
    </>
  );
}