import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/files/5c28a653-45b9-41fd-9019-5cfd32048f26.jpg";
const READING_IMG = "https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/files/fa53f2c9-5578-4d90-b8a6-fc3b65124032.jpg";
const CRAFT_IMG = "https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/files/89e87b38-79de-42c5-b6b9-f63b4dd75b59.jpg";

const services = [
  { emoji: "🧸", title: "Ясельная группа", subtitle: "от 1,5 до 3 лет", desc: "Мягкая адаптация к детскому коллективу, развитие речи, сенсорика и игровая деятельность в уютной обстановке.", color: "#e85d3b", bg: "#fff0ed", tags: ["Полный день", "Неполный день"] },
  { emoji: "⭐", title: "Старшая группа", subtitle: "от 3 до 7 лет", desc: "Качественная подготовка к школе, развитие логики, творчества и социальных навыков.", color: "#d4840a", bg: "#fffbeb", tags: ["Полный день", "Неполный день"] },
  { emoji: "🗣️", title: "Логопед", subtitle: "индивидуальные занятия", desc: "Профессиональный логопед проводит диагностику и коррекцию речи. Занятия в игровой форме.", color: "#2a8c6e", bg: "#e8f8f3", tags: ["Все возрасты"] },
  { emoji: "📚", title: "Группа продлённого дня", subtitle: "1–4 классы", desc: "Безопасное пространство после школы: домашние задания под присмотром педагога, отдых, игры и перекус.", color: "#6b3fc4", bg: "#f3eeff", tags: ["Школьники"] },
  { emoji: "🌍", title: "Английский язык", subtitle: "для дошкольников и школьников", desc: "Погружение в язык через игры, песни и сказки. Обучение по коммуникативной методике.", color: "#1a7ab5", bg: "#e8f4fd", tags: ["С 3 лет"] },
  { emoji: "☀️", title: "Летний клуб", subtitle: "июнь – август, для школьников", desc: "Насыщенная программа: творческие мастерские, спорт, прогулки, экскурсии и новые друзья!", color: "#c45e10", bg: "#fff3e8", tags: ["Сезонная программа"] },
];

const specialists = [
  { name: "Ирина Павловна", role: "Администратор центра", exp: "", emoji: "", color: "#fff0ed", photo: "https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/a240adac-ebb2-455a-8777-e1d81b688a4e.jpg" },
  { name: "Марина Анатольевна", role: "Помощник воспитателя", exp: "", emoji: "", color: "#fffbeb", photo: "https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/33738489-df0f-4dcd-a784-da42b7bf5266.jpg" },
  { name: "Светлана Владимировна", role: "Воспитатель старшей группы", exp: "", emoji: "", color: "#e8f8f3", photo: "https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/21d90dda-0f04-4210-9e74-012ae88470d5.jpg" },
  { name: "Ирина Васильевна", role: "Воспитатель ясельной группы, педагог-психолог", exp: "", emoji: "", color: "#e8f4fd", photo: "https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/9782c412-48ea-40cb-9a43-4b0fb7066715.jpg" },
  { name: "Наталья Петровна", role: "Педагог группы продлённого дня, учитель английского языка", exp: "", emoji: "", color: "#f3eeff", photo: "https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/62e2e43e-9928-4729-9295-6fa2bfe6b424.png" },
];

const prices = [
  { service: "Ясельная группа — полный день", price: "20 000 ₽/мес" },
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

const gallery = [
  "https://cdn.poehali.dev/files/b7e139c8-93e0-4bbb-b9d3-83e343cd59db.png",
  "https://cdn.poehali.dev/files/bb83b1db-3a9f-4e90-ab10-e6980a71620a.png",
  "https://cdn.poehali.dev/files/3e522020-93c1-4155-ac37-1067785b8111.png",
  "https://cdn.poehali.dev/files/4b6ccfe2-5c36-4d8f-86a3-2d2d0ba4a2df.png",
  "https://cdn.poehali.dev/files/3611f407-5c5c-4b26-89e4-891e2f8aaff8.png",
];

export default function ContentSections() {
  return (
    <>
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
              <div key={s.title} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-default">
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
              <div key={i} className={`rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${i === 0 ? "md:col-span-2" : ""}`}>
                <img src={img} alt={`Галерея ${i + 1}`} className="w-full h-52 object-cover" />
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
              <div key={item.service} className={`flex items-center justify-between px-6 py-4 hover:bg-[#fff0ed] transition-colors ${i !== prices.length - 1 ? "border-b border-white" : ""}`}>
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
    </>
  );
}