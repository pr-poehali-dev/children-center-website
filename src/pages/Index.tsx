import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/files/5c28a653-45b9-41fd-9019-5cfd32048f26.jpg";
const READING_IMG = "https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/files/fa53f2c9-5578-4d90-b8a6-fc3b65124032.jpg";
const CRAFT_IMG = "https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/files/89e87b38-79de-42c5-b6b9-f63b4dd75b59.jpg";

const services = [
  {
    emoji: "🧸",
    title: "Ясельная группа",
    subtitle: "от 1,5 до 3 лет",
    desc: "Мягкая адаптация к детскому коллективу, развитие речи, сенсорика и игровая деятельность в уютной обстановке.",
    color: "#e85d3b",
    bg: "#fff0ed",
    tags: ["Полный день", "Неполный день"],
  },
  {
    emoji: "⭐",
    title: "Старшая группа",
    subtitle: "от 3 до 7 лет",
    desc: "Качественная подготовка к школе, развитие логики, творчества и социальных навыков.",
    color: "#d4840a",
    bg: "#fffbeb",
    tags: ["Полный день", "Неполный день"],
  },
  {
    emoji: "🗣️",
    title: "Логопед",
    subtitle: "индивидуальные занятия",
    desc: "Профессиональный логопед проводит диагностику и коррекцию речи. Занятия в игровой форме.",
    color: "#2a8c6e",
    bg: "#e8f8f3",
    tags: ["Все возрасты"],
  },
  {
    emoji: "📚",
    title: "Группа продлённого дня",
    subtitle: "1–4 классы",
    desc: "Безопасное пространство после школы: домашние задания под присмотром педагога, отдых, игры и перекус.",
    color: "#6b3fc4",
    bg: "#f3eeff",
    tags: ["Школьники"],
  },
  {
    emoji: "🌍",
    title: "Английский язык",
    subtitle: "для дошкольников и школьников",
    desc: "Погружение в язык через игры, песни и сказки. Обучение по коммуникативной методике.",
    color: "#1a7ab5",
    bg: "#e8f4fd",
    tags: ["С 3 лет"],
  },
  {
    emoji: "☀️",
    title: "Летний клуб",
    subtitle: "июнь – август, для школьников",
    desc: "Насыщенная программа: творческие мастерские, спорт, прогулки, экскурсии и новые друзья!",
    color: "#c45e10",
    bg: "#fff3e8",
    tags: ["Сезонная программа"],
  },
];

const specialists = [
  { name: "Ирина Павловна", role: "Администратор центра", exp: "", emoji: "", color: "#fff0ed", photo: "https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/a240adac-ebb2-455a-8777-e1d81b688a4e.jpg" },
  { name: "Марина Анатольевна", role: "Помощник воспитателя", exp: "", emoji: "", color: "#fffbeb", photo: "https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/33738489-df0f-4dcd-a784-da42b7bf5266.jpg" },
  { name: "Светлана Владимировна", role: "Воспитатель старшей группы", exp: "", emoji: "", color: "#e8f8f3", photo: "https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/21d90dda-0f04-4210-9e74-012ae88470d5.jpg" },
  { name: "Ирина Васильевна", role: "Воспитатель ясельной группы, педагог-психолог", exp: "", emoji: "", color: "#e8f4fd", photo: "https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/9782c412-48ea-40cb-9a43-4b0fb7066715.jpg" },
  { name: "Наталья Петровна", role: "Педагог группы продлённого дня, учитель английского языка", exp: "", emoji: "", color: "#f3eeff", photo: "https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/62e2e43e-9928-4729-9295-6fa2bfe6b424.png" },
];

const prices = [
  { service: "Ясельная группа — полный день", price: "18 000 ₽/мес" },
  { service: "Ясельная группа — неполный день", price: "12 000 ₽/мес" },
  { service: "Старшая группа — полный день", price: "16 000 ₽/мес" },
  { service: "Старшая группа — неполный день", price: "10 000 ₽/мес" },
  { service: "Логопед (индивидуально)", price: "1 200 ₽/занятие" },
  { service: "Группа продлённого дня", price: "9 000 ₽/мес" },
  { service: "Английский язык", price: "4 500 ₽/мес" },
  { service: "Летний клуб", price: "от 15 000 ₽/мес" },
];

const reviews = [
  { name: "Ольга М.", text: "Дочка ходит уже 2 года и каждое утро бежит в садик с улыбкой! Педагоги чудесные, всегда на связи.", stars: 5, child: "дочка, 4 года" },
  { name: "Дмитрий К.", text: "Сын пошёл в школу абсолютно готовым: умеет читать, считать, рисует замечательно. Спасибо за такую подготовку!", stars: 5, child: "сын, перешёл в 1 класс" },
  { name: "Светлана Р.", text: "Группа продлённого дня — настоящее спасение для работающих родителей. Уроки делают, кормят, и дети не скучают.", stars: 5, child: "сын, 2 класс" },
  { name: "Наталья В.", text: "Занимались с логопедом — за 3 месяца результат превзошёл все ожидания. Очень профессиональный специалист.", stars: 5, child: "дочка, 5 лет" },
];

const gallery = [HERO_IMG, READING_IMG, CRAFT_IMG, HERO_IMG, READING_IMG, CRAFT_IMG];

const navLinks = ["О центре", "Услуги", "Специалисты", "Галерея", "Прайс", "Отзывы", "Контакты"];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="font-nunito bg-[#fdf9f5] text-gray-800 overflow-x-hidden">

      {/* NAV */}
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
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="pt-20 min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            "w-64 h-64 bg-yellow-200/40 -top-12 -left-12",
            "w-96 h-96 bg-coral-200/30 -bottom-24 -right-24",
            "w-48 h-48 bg-mint-200/40 top-1/3 left-1/4",
            "w-32 h-32 bg-orange-200/50 top-1/4 right-1/3",
            "w-80 h-80 bg-pink-200/20 bottom-1/4 left-1/3",
          ].map((cls, i) => (
            <div key={i} className={`absolute rounded-full blur-3xl ${cls}`} />
          ))}
        </div>
        <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">

          {/* ВЕРХНИЙ БЛОК: название + цветок */}
          <div className="flex flex-col lg:flex-row items-center gap-10 mb-12">

            {/* Название */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-sm text-[#2a8c6e] font-semibold shadow-sm mb-4">
                <span>🌈</span> Комфортное пространство для детей
              </div>
              <h1 className="font-pacifico text-5xl md:text-6xl lg:text-7xl text-[#2a6e8c] leading-tight mb-3">
                Рыбка Долли
              </h1>
              <p className="font-pacifico text-2xl md:text-3xl text-[#f7a825]">Дети наше всё!</p>
            </div>

            {/* ЦВЕТОК из 3 кружков — кружки перекрываются */}
            <div className="flex-shrink-0 relative w-[340px] h-[340px]">
              {/* верхний кружок по центру */}
              <div className="absolute w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl"
                style={{ top: 0, left: '50%', transform: 'translateX(-50%)' }}>
                <img src="https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/c9c6c2de-6fa6-4603-b1dd-47cf3c59d10d.png"
                  alt="Занятие 1" className="w-full h-full object-cover object-center" />
              </div>
              {/* нижний левый */}
              <div className="absolute w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl"
                style={{ bottom: 0, left: 0 }}>
                <img src="https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/b5abbf02-664c-4904-a795-366abad23a95.png"
                  alt="Занятие 2" className="w-full h-full object-cover object-center" />
              </div>
              {/* нижний правый */}
              <div className="absolute w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl"
                style={{ bottom: 0, right: 0 }}>
                <img src="https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/7c6c1780-f350-491b-85cc-f59152886e65.png"
                  alt="Занятие 3" className="w-full h-full object-cover object-center" />
              </div>
            </div>
          </div>

          {/* НИЖНИЙ БЛОК: текст + кнопки */}
          <div className="max-w-2xl">
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Детский развивающий центр, где каждый ребёнок чувствует себя особенным. Мягкая адаптация, творческое развитие и качественная подготовка к школе.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["🎨 Творчество", "📖 Подготовка к школе", "🤗 Лёгкая адаптация", "🌟 Комплексное развитие"].map((tag) => (
                <span key={tag} className="px-4 py-1.5 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={() => scrollTo("запись")}
                className="px-8 py-4 bg-[#e85d3b] text-white font-bold text-lg rounded-2xl hover:bg-[#c94d2e] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Записаться на экскурсию
              </button>
              <button
                onClick={() => scrollTo("услуги")}
                className="px-8 py-4 bg-white text-gray-700 font-bold text-lg rounded-2xl hover:bg-gray-50 transition-all shadow-md"
              >
                Наши программы →
              </button>
              <a href="https://vk.com/app6379730_-179759189#l=6" target="_blank" rel="noopener noreferrer"
                className="px-8 py-4 bg-[#4f86f7] text-white font-bold text-lg rounded-2xl hover:bg-[#3570e0] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                🏠 Подробнее о садике →
              </a>
              <a href="https://vk.com/app6379730_-179759189#l=8" target="_blank" rel="noopener noreferrer"
                className="px-8 py-4 bg-[#f7c948] text-gray-800 font-bold text-lg rounded-2xl hover:bg-[#e6b830] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                ☀️ Смены летнего клуба →
              </a>
            </div>
            <div className="flex gap-8">
              {[["200+", "счастливых семей"], ["10+", "опытных педагогов"], ["6", "программ развития"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-pacifico text-3xl text-[#2a6e8c]">{num}</div>
                  <div className="text-sm text-gray-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* О ЦЕНТРЕ */}
      <section id="о центре" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img src={READING_IMG} alt="Занятие в центре" className="w-full h-80 object-cover" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {[
                  { emoji: "🏠", title: "Комфорт", desc: "Уютные просторные помещения" },
                  { emoji: "💚", title: "Забота", desc: "Внимание к каждому ребёнку" },
                  { emoji: "🎯", title: "Результат", desc: "Видимый прогресс за месяц" },
                ].map((item) => (
                  <div key={item.title} className="bg-[#fdf9f5] rounded-2xl p-4 text-center">
                    <div className="text-2xl mb-1">{item.emoji}</div>
                    <div className="font-bold text-sm text-gray-800">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-[#fff0ed] px-4 py-2 rounded-full text-sm text-[#e85d3b] font-semibold mb-4">
                <span>💛</span> О нас
              </div>
              <h2 className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-6 leading-snug">
                Место, где дети любят учиться
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Наш центр — это больше чем детский сад. Это комфортное и безопасное пространство, где каждый ребёнок развивается в своём темпе. Мы строим образовательный процесс так, чтобы учёба была радостью, а не обязанностью.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Особое внимание мы уделяем мягкой адаптации — каждый малыш получает время и поддержку, чтобы освоиться. Большой блок программы посвящён творческому развитию: рисование, лепка, аппликации, конструирование.
              </p>
              <div className="space-y-3">
                {[
                  "Максимально облегчаем адаптацию к коллективу",
                  "Много времени на творческое развитие",
                  "Качественная подготовка к школе",
                  "Комплексный подход к развитию ребёнка",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#e85d3b] rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={14} className="text-white" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* УСЛУГИ */}
      <section id="услуги" className="py-20 bg-[#fdf9f5]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm text-[#e85d3b] font-semibold mb-4 shadow-sm">
              <span>🎓</span> Программы центра
            </div>
            <h2 className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-4">Наши услуги</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4" style={{ background: s.bg }}>
                  {s.emoji}
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">{s.title}</h3>
                <p className="text-sm font-semibold mb-3" style={{ color: s.color }}>{s.subtitle}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-semibold rounded-full" style={{ background: s.bg, color: s.color }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* СПЕЦИАЛИСТЫ */}
      <section id="специалисты" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#e8f8f3] px-4 py-2 rounded-full text-sm text-[#2a8c6e] font-semibold mb-4">
              <span>👥</span> Наша команда
            </div>
            <h2 className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-4">Наши специалисты</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Опытные педагоги, которые любят свою работу</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialists.map((s) => (
              <div key={s.name} className="rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-64 flex items-center justify-center overflow-hidden" style={{ background: s.color }}>
                  {s.photo
                    ? <img src={s.photo} alt={s.name} className="w-full h-full object-cover object-[center_20%]" />
                    : <span className="text-7xl">{s.emoji}</span>
                  }
                </div>
                <div className="bg-white p-5">
                  <div className="font-bold text-gray-800 mb-1">{s.name}</div>
                  <div className="text-sm text-[#e85d3b] font-medium mb-1">{s.role}</div>
                  {s.exp && <div className="text-xs text-gray-400">{s.exp}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ГАЛЕРЕЯ */}
      <section id="галерея" className="py-20 bg-[#fdf9f5]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm text-[#e85d3b] font-semibold mb-4 shadow-sm">
              <span>📸</span> Фотогалерея
            </div>
            <h2 className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-4">Наша жизнь</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Взгляните, как проходят дни в нашем центре</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((img, i) => (
              <div
                key={i}
                className={`rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${i === 0 ? "md:col-span-2" : ""}`}
              >
                <img
                  src={img}
                  alt={`Галерея ${i + 1}`}
                  className="w-full h-52 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПРАЙС */}
      <section id="прайс" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#fffbeb] px-4 py-2 rounded-full text-sm text-[#d4840a] font-semibold mb-4">
              <span>💰</span> Стоимость
            </div>
            <h2 className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-4">Прайс-лист</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Прозрачные цены без скрытых платежей</p>
          </div>
          <div className="bg-[#fdf9f5] rounded-3xl overflow-hidden shadow-sm">
            {prices.map((item, i) => (
              <div
                key={item.service}
                className={`flex items-center justify-between px-6 py-4 hover:bg-[#fff0ed] transition-colors ${i !== prices.length - 1 ? "border-b border-white" : ""}`}
              >
                <span className="text-gray-700 font-medium">{item.service}</span>
                <span className="font-bold text-[#e85d3b] text-lg whitespace-nowrap ml-4">{item.price}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-4">
            * Возможны скидки при оплате за полгода. Уточняйте по телефону.
          </p>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section id="отзывы" className="py-20 bg-gradient-to-br from-[#fff0ed] via-yellow-50 to-[#e8f8f3]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm text-[#e85d3b] font-semibold mb-4 shadow-sm">
              <span>💬</span> Отзывы
            </div>
            <h2 className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-4">Что говорят родители</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 italic text-[15px]">«{r.text}»</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#fff0ed] rounded-full flex items-center justify-center">
                    <Icon name="User" size={18} className="text-[#e85d3b]" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">{r.name}</div>
                    <div className="text-xs text-gray-400">{r.child}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЗАПИСЬ */}
      <section id="запись" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#fff0ed] px-4 py-2 rounded-full text-sm text-[#e85d3b] font-semibold mb-4">
              <span>✍️</span> Запись
            </div>
            <h2 className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-4">Записаться в центр</h2>
            <p className="text-gray-500">Оставьте заявку и мы свяжемся с вами в течение часа</p>
          </div>
          {submitted ? (
            <div className="bg-[#e8f8f3] rounded-3xl p-10 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-pacifico text-2xl text-gray-800 mb-2">Заявка принята!</h3>
              <p className="text-gray-600">Мы позвоним вам в ближайшее время. Ждём вас в гости!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[#fdf9f5] rounded-3xl p-8 shadow-sm space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ваше имя *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Анна Петрова"
                    className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e85d3b]/30 focus:border-[#e85d3b] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Телефон *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e85d3b]/30 focus:border-[#e85d3b] transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Интересующая программа</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e85d3b]/30 focus:border-[#e85d3b] transition-all"
                >
                  <option value="">Выберите программу</option>
                  {services.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Сообщение</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Возраст ребёнка, вопросы..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e85d3b]/30 focus:border-[#e85d3b] transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[#e85d3b] text-white font-bold text-lg rounded-2xl hover:bg-[#c94d2e] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Отправить заявку 🚀
              </button>
              <p className="text-center text-xs text-gray-400">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </form>
          )}
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="контакты" className="py-20 bg-[#fdf9f5]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm text-[#e85d3b] font-semibold mb-4 shadow-sm">
              <span>📍</span> Контакты
            </div>
            <h2 className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-4">Как нас найти</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: "📍", title: "Адрес", lines: ["ул. Циолковского, 12", "г. Керчь"], color: "#fff0ed" },
              { emoji: "📞", title: "Телефон", lines: ["+7 (988) 152-16-98", "+7 (978) 712-03-53"], color: "#e8f8f3" },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-all">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" style={{ background: c.color }}>
                  {c.emoji}
                </div>
                <h3 className="font-bold text-gray-800 mb-3">{c.title}</h3>
                {c.lines.map((line) => (
                  <p key={line} className="text-gray-600 text-sm">{line}</p>
                ))}
              </div>
            ))}
            <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" style={{ background: "#e8f0fb" }}>
                💬
              </div>
              <h3 className="font-bold text-gray-800 mb-3">Мы в соцсетях</h3>
              <p className="text-gray-600 text-sm mb-3">ribkadolli@mail.ru</p>
              <a
                href="https://vk.com/rybka_dolli"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 bg-[#0077FF] text-white text-sm font-semibold rounded-full hover:bg-[#005fcc] transition-all"
              >
                ВКонтакте →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/c4844e39-f0a4-402d-b73b-86467b249168.png" alt="Рыбка Долли" className="h-12 w-12 object-contain rounded-xl" />
              <div>
                <div className="font-pacifico text-xl text-yellow-300">Рыбка Долли</div>
                <div className="text-sm text-gray-400">Дети наше всё!</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              {navLinks.map((link) => (
                <button key={link} onClick={() => scrollTo(link.toLowerCase())} className="hover:text-white transition-colors">
                  {link}
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-500">© 2024 Рыбка Долли</div>
          </div>
        </div>
      </footer>
    </div>
  );
}