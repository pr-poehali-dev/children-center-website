import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import FUNC2URL from "../../backend/func2url.json";

interface GalleryPhoto { id: number; url: string; sort_order: number; }

const PROMO_ACTIVE = new Date() < new Date("2026-05-15T23:59:59");

const HERO_IMG = "https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/files/5c28a653-45b9-41fd-9019-5cfd32048f26.jpg";
const READING_IMG = "https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/files/fa53f2c9-5578-4d90-b8a6-fc3b65124032.jpg";
const CRAFT_IMG = "https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/files/89e87b38-79de-42c5-b6b9-f63b4dd75b59.jpg";

const services = [
  { emoji: "🧸", title: "Ясельная группа", subtitle: "от 1,5 до 3 лет", desc: "Мягкая адаптация к детскому коллективу, развитие речи, сенсорика и игровая деятельность в уютной обстановке.", color: "#e85d3b", bg: "#fff0ed", tags: ["Полный день", "Неполный день"] },
  { emoji: "⭐", title: "Старшая группа", subtitle: "от 3 до 7 лет", desc: "Качественная подготовка к школе, развитие логики, творчества и социальных навыков.", color: "#d4840a", bg: "#fffbeb", tags: ["Полный день", "Неполный день"] },
  { emoji: "🗣️", title: "Логопед", subtitle: "индивидуальные занятия", desc: "Профессиональный логопед проводит диагностику и коррекцию речи. Занятия в игровой форме.", color: "#2a8c6e", bg: "#e8f8f3", tags: ["Все возрасты"] },
  { emoji: "📚", title: "Группа продлённого дня", subtitle: "1–4 классы", desc: "Безопасное пространство после школы: домашние задания под присмотром педагога, отдых, игры и перекус.", color: "#6b3fc4", bg: "#f3eeff", tags: ["Школьники"] },
  { emoji: "🌍", title: "Английский язык", subtitle: "для дошкольников и школьников", desc: "Погружение в язык через игры, песни и сказки. Обучение по коммуникативной методике.", color: "#1a7ab5", bg: "#e8f4fd", tags: ["С 3 лет"] },
  { emoji: "☀️", title: "Летний клуб", subtitle: "июнь – август, для школьников", desc: "Насыщенная программа: творческие мастерские, спорт, прогулки, экскурсии и новые друзья!", color: "#c45e10", bg: "#fff3e8", tags: ["Сезонная программа"], promo: "🏷️ −12% при покупке до 15 мая" },
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
  { service: "Ясельная группа — неполный день", price: "18 000 ₽/мес" },
  { service: "Старшая группа — полный день", price: "20 000 ₽/мес" },
  { service: "Старшая группа — неполный день", price: "18 000 ₽/мес" },
  { service: "Логопед (индивидуально)", price: "800 ₽/занятие" },
  { service: "Группа продлённого дня", price: "12 500 ₽/мес" },
  { service: "Английский язык", price: "4 500 ₽/мес" },
  { service: "Летний клуб", price: "12 500 ₽/мес" },
];

const reviews = [
  { name: "Ольга М.", text: "Дочка ходит уже 2 года и каждое утро бежит в садик с улыбкой! Педагоги чудесные, всегда на связи.", stars: 5, child: "дочка, 4 года" },
  { name: "Дмитрий К.", text: "Сын пошёл в школу абсолютно готовым: умеет читать, считать, рисует замечательно. Спасибо за такую подготовку!", stars: 5, child: "сын, перешёл в 1 класс" },
  { name: "Светлана Р.", text: "Группа продлённого дня — настоящее спасение для работающих родителей. Уроки делают, кормят, и дети не скучают.", stars: 5, child: "сын, 2 класс" },
  { name: "Наталья В.", text: "Занимались с логопедом — за 3 месяца результат превзошёл все ожидания. Очень профессиональный специалист.", stars: 5, child: "дочка, 5 лет" },
  { name: "Оксана Р.", text: "Мои дети ходили в летний клуб, а у меня их трое, и каждая с разным характером. Так вот, для меня было очень удивительно, что все трое в один голос восторженно отзывались о лагере! Им безумно понравилась педагог Наталья Петровна, вожатая Назлифе. Сколько нового они принесли из лагеря! А этот их вечерний час с заданиями — просто восторг! Дети практически забыли о гаджетах. То, что они купили в магазине лагеря на заработанную игровую валюту, хранят до сих пор — ведь сами на это заработали! Хочу отметить и качество еды — она на высоте. Моя средняя дочь малоежка, но там ела с удовольствием. Мне пришлось покупать несколько смен, дети очень просили. Такое активное лето гораздо лучше, чем сидение за гаджетами. Обязательно вернёмся в следующем году!", stars: 5, child: "дочкам 7, 10 и 12 лет" },
];

const gallery = [
  "https://cdn.poehali.dev/files/b7e139c8-93e0-4bbb-b9d3-83e343cd59db.png",
  "https://cdn.poehali.dev/files/bb83b1db-3a9f-4e90-ab10-e6980a71620a.png",
  "https://cdn.poehali.dev/files/3e522020-93c1-4155-ac37-1067785b8111.png",
  "https://cdn.poehali.dev/files/4b6ccfe2-5c36-4d8f-86a3-2d2d0ba4a2df.png",
  "https://cdn.poehali.dev/files/3611f407-5c5c-4b26-89e4-891e2f8aaff8.png",
];

export default function ContentSections() {
  const [reviewIndex, setReviewIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);

  useEffect(() => {
    fetch(FUNC2URL["gallery"])
      .then(r => r.json())
      .then(data => setGallery(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setReviewIndex((i) => (i + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const prevReview = () => { setPaused(true); setReviewIndex((i) => (i - 1 + reviews.length) % reviews.length); };
  const nextReview = () => { setPaused(true); setReviewIndex((i) => (i + 1) % reviews.length); };

  return (
    <>
      {/* О ЦЕНТРЕ */}
      <section id="о центре" aria-labelledby="about-heading" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img src="https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/f9682350-a1f1-4927-bfec-64a418f4fe76.png" alt="Групповое занятие в детском развивающем центре «Рыбка Долли», Керчь" className="w-full h-80 object-cover" width="640" height="320" loading="lazy" />
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
              <h2 id="about-heading" className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-6 leading-snug">
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

      {/* БЕЗОПАСНОСТЬ */}
      <section className="py-16 bg-[#f0f9f6]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm text-[#2a8c6e] font-semibold mb-4 shadow-sm">
              <span>🔒</span> Безопасность
            </div>
            <h2 className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-3">Ваш ребёнок под надёжной защитой</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Мы создали среду, где родители могут быть спокойны за своего малыша</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { emoji: "📹", title: "Видеонаблюдение", desc: "Камеры во всех помещениях и на входе" },
              { emoji: "🚨", title: "Пожарная система", desc: "Автоматическая сигнализация и датчики" },
              { emoji: "🩺", title: "Курсы медпомощи", desc: "Весь персонал обучен первой помощи" },
              { emoji: "🍎", title: "Сбалансированное питание", desc: "Полезное меню, разработанное с учётом возраста" },
              { emoji: "🧼", title: "Чистота и кварцевание", desc: "Ежедневная уборка и обеззараживание воздуха" },
              { emoji: "🚪", title: "Контроль доступа", desc: "Электронный замок — посторонние не войдут" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-5 shadow-sm flex gap-4 items-start hover:shadow-md transition-all">
                <div className="text-3xl flex-shrink-0">{item.emoji}</div>
                <div>
                  <div className="font-bold text-gray-800 text-sm mb-1">{item.title}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ДОРОЖКИ ПО ВОЗРАСТУ */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#fff0ed] px-4 py-2 rounded-full text-sm text-[#e85d3b] font-semibold mb-4">
              <span>👶</span> Выберите путь
            </div>
            <h2 className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-3">Всё зависит от возраста ребёнка</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Для каждого возраста — своя программа и подход</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Малыши 1.5-3 */}
            <div className="rounded-3xl overflow-hidden shadow-sm border-2 border-[#ffd6cc] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-gradient-to-br from-[#fff0ed] to-[#ffe8e2] p-8">
                <div className="text-5xl mb-4">🧸</div>
                <div className="inline-block bg-[#e85d3b] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">1,5 — 3 года</div>
                <h3 className="font-pacifico text-2xl text-gray-800 mb-3">Малыши</h3>
                <p className="text-gray-600 leading-relaxed mb-5">
                  Первый шаг в большой мир — без слёз и стресса. Мягкая адаптация, забота и тепло — так, чтобы ребёнок полюбил детский сад с первого дня.
                </p>
                <ul className="space-y-2 mb-6">
                  {["Мягкая адаптация к коллективу", "Развитие речи и сенсорики", "Игровые занятия в уютной обстановке", "Индивидуальный подход к каждому малышу"].map(i => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-[#e85d3b] font-bold">✓</span> {i}
                    </li>
                  ))}
                </ul>
                <div className="bg-white/60 rounded-2xl p-4 text-sm text-gray-600 italic">
                  «Ваш малыш будет смеяться и играть — пока вы спокойно занимаетесь своими делами»
                </div>
              </div>
            </div>
            {/* Дошколята 3-7 */}
            <div className="rounded-3xl overflow-hidden shadow-sm border-2 border-[#d4f0e8] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-gradient-to-br from-[#e8f8f3] to-[#d4f0e8] p-8">
                <div className="text-5xl mb-4">⭐</div>
                <div className="inline-block bg-[#2a8c6e] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">3 — 7 лет</div>
                <h3 className="font-pacifico text-2xl text-gray-800 mb-3">Дошколята</h3>
                <p className="text-gray-600 leading-relaxed mb-5">
                  Готовим к школе весело и эффективно. Ребёнок придёт в первый класс уверенным, умеющим читать, считать и дружить.
                </p>
                <ul className="space-y-2 mb-6">
                  {["Качественная подготовка к школе", "Развитие логики и творчества", "Социальные навыки и общение", "Английский язык в игровой форме"].map(i => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-[#2a8c6e] font-bold">✓</span> {i}
                    </li>
                  ))}
                </ul>
                <div className="bg-white/60 rounded-2xl p-4 text-sm text-gray-600 italic">
                  «Ваш ребёнок пойдёт в школу готовым — а вы будете гордиться им с первого дня»
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Якоря для Яндекс.Директ */}
      <span id="детский-сад" style={{ position: 'relative', top: '-80px', display: 'block', visibility: 'hidden' }} aria-hidden="true" />
      <span id="продленный-день" style={{ position: 'relative', top: '-80px', display: 'block', visibility: 'hidden' }} aria-hidden="true" />
      <span id="летний-клуб" style={{ position: 'relative', top: '-80px', display: 'block', visibility: 'hidden' }} aria-hidden="true" />

      {/* УСЛУГИ */}
      <section id="услуги" aria-labelledby="services-heading" className="py-20 bg-[#fdf9f5]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm text-[#e85d3b] font-semibold mb-4 shadow-sm">
              <span aria-hidden="true">🎓</span> Программы центра
            </div>
            <h2 id="services-heading" className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-4">Наши услуги</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Услуги детского центра «Рыбка Долли»">
            {services.map((s) => (
              <article key={s.title} role="listitem" className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-default"
                itemScope itemType="https://schema.org/Service">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4" style={{ background: s.bg }} aria-hidden="true">
                  {s.emoji}
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-1" itemProp="name">{s.title}</h3>
                <p className="text-sm font-semibold mb-3" style={{ color: s.color }}>{s.subtitle}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-4" itemProp="description">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-semibold rounded-full" style={{ background: s.bg, color: s.color }}>
                      {tag}
                    </span>
                  ))}
                  {'promo' in s && s.promo && PROMO_ACTIVE && (
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#e85d3b] text-white animate-pulse">
                      {s.promo}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* СПЕЦИАЛИСТЫ */}
      <section id="специалисты" aria-labelledby="specialists-heading" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#e8f8f3] px-4 py-2 rounded-full text-sm text-[#2a8c6e] font-semibold mb-4">
              <span aria-hidden="true">👥</span> Наша команда
            </div>
            <h2 id="specialists-heading" className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-4">Наши специалисты</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Опытные педагоги, которые любят свою работу</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {specialists.map((s) => (
              <article key={s.name} className="rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                itemScope itemType="https://schema.org/Person">
                <div className="h-44 sm:h-56 md:h-64 flex items-center justify-center overflow-hidden" style={{ background: s.color }}>
                  {s.photo
                    ? <img src={s.photo} alt={`${s.name} — ${s.role}, детский центр «Рыбка Долли»`} className="w-full h-full object-cover object-[center_20%]" loading="lazy" itemProp="image" />
                    : <span className="text-7xl" aria-hidden="true">{s.emoji}</span>
                  }
                </div>
                <div className="bg-white p-5">
                  <div className="font-bold text-gray-800 mb-1" itemProp="name">{s.name}</div>
                  <div className="text-sm text-[#e85d3b] font-medium mb-1" itemProp="jobTitle">{s.role}</div>
                  {s.exp && <div className="text-xs text-gray-400">{s.exp}</div>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ГАЛЕРЕЯ */}
      <section id="галерея" aria-labelledby="gallery-heading" className="py-20 bg-[#fdf9f5]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm text-[#e85d3b] font-semibold mb-4 shadow-sm">
              <span aria-hidden="true">📸</span> Фотогалерея
            </div>
            <h2 id="gallery-heading" className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-4">Наша жизнь</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Взгляните, как проходят дни в нашем центре</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4" role="list" aria-label="Фотографии из жизни детского центра">
            {[
              "Дети на занятии в детском развивающем центре «Рыбка Долли»",
              "Творческая мастерская — рисование и лепка в «Рыбке Долли»",
              "Игровые занятия для дошкольников в Керчи",
              "Подготовка к школе: занятия в старшей группе",
              "Летний клуб «Рыбка Долли» — активный отдых для детей",
            ].map((altText, i) => (
              <div key={i} role="listitem" className={`rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${i === 0 ? "md:col-span-2" : ""}`}>
                <img src={gallery[i]} alt={altText} className="w-full h-36 sm:h-44 md:h-52 object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПРАЙС */}
      <section id="прайс" aria-labelledby="price-heading" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#fffbeb] px-4 py-2 rounded-full text-sm text-[#d4840a] font-semibold mb-4">
              <span aria-hidden="true">💰</span> Стоимость
            </div>
            <h2 id="price-heading" className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-4">Прайс-лист</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Прозрачные цены без скрытых платежей</p>
          </div>
          <div className="bg-[#fdf9f5] rounded-3xl overflow-hidden shadow-sm">
            {prices.map((item, i) => (
              <div key={item.service} className={`flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 hover:bg-[#fff0ed] transition-colors ${i !== prices.length - 1 ? "border-b border-white" : ""}`}>
                <span className="text-gray-700 font-medium flex flex-wrap items-center gap-2 text-sm sm:text-base">
                  {item.service}
                  {item.service === "Летний клуб" && PROMO_ACTIVE && (
                    <span className="inline-flex items-center gap-1 bg-[#e85d3b] text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                      🏷️ −12% при покупке до 15 мая
                    </span>
                  )}
                </span>
                <span className="font-bold text-[#e85d3b] text-lg whitespace-nowrap ml-4">{item.price}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-4">
            * Возможны скидки при оплате за полгода. Уточняйте по телефону.
          </p>
        </div>
      </section>

      {/* СЕГОДНЯ В ЦЕНТРЕ */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#fff0ed] px-4 py-2 rounded-full text-sm text-[#e85d3b] font-semibold mb-4">
              <span>📸</span> Живая жизнь центра
            </div>
            <h2 className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-3">Сегодня в центре</h2>
            <p className="text-gray-500">Каждый день — новые эмоции и открытия</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((photo) => (
              <div key={photo.id} className="relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <img src={photo.url} alt="Фото из жизни центра" className="w-full h-44 md:h-52 object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section id="отзывы" aria-labelledby="reviews-heading" className="py-20 bg-gradient-to-br from-[#fff0ed] via-yellow-50 to-[#e8f8f3]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm text-[#e85d3b] font-semibold mb-4 shadow-sm">
              <span aria-hidden="true">💬</span> Отзывы
            </div>
            <h2 id="reviews-heading" className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-4">Что говорят родители</h2>
          </div>
          <div className="relative max-w-2xl mx-auto" role="region" aria-label="Отзывы родителей о детском центре «Рыбка Долли»" aria-live="polite">
            <article className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm min-h-[220px] flex flex-col justify-between"
              itemScope itemType="https://schema.org/Review">
              <meta itemProp="itemReviewed" content="Детский развивающий центр «Рыбка Долли»" />
              <div>
                <div className="flex gap-1 mb-4" role="img" aria-label={`Оценка: ${reviews[reviewIndex].stars} из 5`}
                  itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                  <meta itemProp="ratingValue" content={String(reviews[reviewIndex].stars)} />
                  <meta itemProp="bestRating" content="5" />
                  {Array.from({ length: reviews[reviewIndex].stars }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl" aria-hidden="true">★</span>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic text-[15px]" itemProp="reviewBody">«{reviews[reviewIndex].text}»</p>
              </div>
              <div className="flex items-center gap-3" itemProp="author" itemScope itemType="https://schema.org/Person">
                <div className="w-10 h-10 bg-[#fff0ed] rounded-full flex items-center justify-center" aria-hidden="true">
                  <Icon name="User" size={18} className="text-[#e85d3b]" />
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-800" itemProp="name">{reviews[reviewIndex].name}</div>
                  <div className="text-xs text-gray-400">{reviews[reviewIndex].child}</div>
                </div>
              </div>
            </article>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button onClick={prevReview} aria-label="Предыдущий отзыв" className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-[#fff0ed] transition-all">
                <Icon name="ChevronLeft" size={20} className="text-[#e85d3b]" />
              </button>
              <div className="flex gap-2" role="tablist" aria-label="Переключатель отзывов">
                {reviews.map((r, i) => (
                  <button key={i} role="tab" aria-selected={i === reviewIndex} aria-label={`Отзыв от ${r.name}`}
                    onClick={() => { setPaused(true); setReviewIndex(i); }}
                    className={`w-2 h-2 rounded-full transition-all ${i === reviewIndex ? "bg-[#e85d3b] w-5" : "bg-gray-300"}`} />
                ))}
              </div>
              <button onClick={nextReview} aria-label="Следующий отзыв" className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-[#fff0ed] transition-all">
                <Icon name="ChevronRight" size={20} className="text-[#e85d3b]" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}