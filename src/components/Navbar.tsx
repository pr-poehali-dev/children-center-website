import Icon from "@/components/ui/icon";

const navLinks = ["О центре", "Услуги", "Специалисты", "Галерея", "Прайс", "Отзывы", "Контакты"];

interface NavbarProps {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  scrollTo: (id: string) => void;
}

export default function Navbar({ menuOpen, setMenuOpen, scrollTo }: NavbarProps) {
  return (
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
          <button
            onClick={() => scrollTo("запись")}
            className="ml-2 px-5 py-2 bg-[#e85d3b] text-white text-sm font-bold rounded-full hover:bg-[#c94d2e] transition-all shadow-sm hover:shadow-md"
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
          <button
            onClick={() => scrollTo("запись")}
            className="mt-2 px-5 py-3 bg-[#e85d3b] text-white font-bold rounded-full"
          >
            Записаться
          </button>
          <div className="mt-2 flex flex-col gap-2">
            <a href="tel:+79881521698" className="flex items-center justify-center gap-2 px-5 py-3 bg-[#2a8c6e] text-white font-bold rounded-full">
              <Icon name="Phone" size={18} /> +7 988 152-16-98
            </a>
            <a href="tel:+79787120353" className="flex items-center justify-center gap-2 px-5 py-3 bg-[#2a8c6e] text-white font-bold rounded-full">
              <Icon name="Phone" size={18} /> +7 978 712-03-53
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}