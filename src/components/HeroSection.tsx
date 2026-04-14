import { useEffect, useState } from "react";

interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

const TITLE = "Рыбка Долли";

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  const [visibleChars, setVisibleChars] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const badgeTimer = setTimeout(() => setBadgeVisible(true), 200);
    const titleTimer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setVisibleChars(i);
        if (i >= TITLE.length) clearInterval(interval);
      }, 80);
      return () => clearInterval(interval);
    }, 500);
    const subtitleTimer = setTimeout(() => setSubtitleVisible(true), 500 + TITLE.length * 80 + 100);
    const contentTimer = setTimeout(() => setContentVisible(true), 500 + TITLE.length * 80 + 300);
    return () => {
      clearTimeout(badgeTimer);
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <section
      id="главная"
      aria-label="Детский развивающий центр «Рыбка Долли» в Керчи"
      className="pt-20 min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50"
      itemScope itemType="https://schema.org/ChildCare"
    >
      <meta itemProp="name" content="Рыбка Долли" />
      <meta itemProp="telephone" content="+79881521698" />
      <meta itemProp="address" content="г. Керчь, ул. Циолковского, 12" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
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
      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10 w-full">

        {/* СТРОКА 1: цветок слева + название справа */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">

          {/* ЦВЕТОК */}
          <div className="relative flex-shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px]" aria-hidden="true">
            <div className="absolute rounded-full overflow-hidden border-[5px] border-white shadow-2xl"
              style={{ width: '55%', height: '55%', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
              <img src="https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/c9c6c2de-6fa6-4603-b1dd-47cf3c59d10d.png"
                alt="Дети на творческом занятии в центре «Рыбка Долли»" className="w-full h-full object-cover object-center"
                width="209" height="209" loading="eager" />
            </div>
            <div className="absolute rounded-full overflow-hidden border-[5px] border-white shadow-2xl"
              style={{ width: '55%', height: '55%', bottom: 0, left: 0 }}>
              <img src="https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/d707734d-8b6d-4ee2-9d51-0e454f84f5e0.png"
                alt="Занятие с педагогом в детском развивающем центре Керчь" className="w-full h-full object-cover object-center"
                width="209" height="209" loading="eager" />
            </div>
            <div className="absolute rounded-full overflow-hidden border-[5px] border-white shadow-2xl"
              style={{ width: '55%', height: '55%', bottom: 0, right: 0 }}>
              <img src="https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/7c6c1780-f350-491b-85cc-f59152886e65.png"
                alt="Игровое обучение в «Рыбке Долли», Керчь" className="w-full h-full object-cover object-center"
                width="209" height="209" loading="eager" />
            </div>
          </div>

          {/* НАЗВАНИЕ */}
          <div className="flex-1 text-center md:text-left">
            <div
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-sm text-[#2a8c6e] font-semibold shadow-sm mb-4 transition-all duration-500"
              style={{ opacity: badgeVisible ? 1 : 0, transform: badgeVisible ? 'translateY(0)' : 'translateY(-12px)' }}
            >
              <span aria-hidden="true">🌈</span> Комфортное пространство для детей
            </div>
            <h1
              className="font-pacifico text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#2a6e8c] leading-none mb-3 min-h-[1em]"
              itemProp="name"
            >
              {TITLE.split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block transition-all duration-300"
                  style={{
                    opacity: i < visibleChars ? 1 : 0,
                    transform: i < visibleChars ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
            <p
              className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed transition-all duration-500 max-w-lg"
              style={{ opacity: subtitleVisible ? 1 : 0, transform: subtitleVisible ? 'translateY(0)' : 'translateY(10px)' }}
            >
              Мягкая и быстрая адаптация — без слёз и стресса.<br />
              Детский центр в Керчи, где ребёнок полюбит учиться,<br className="hidden sm:block" />
              а вы перестанете переживать.
            </p>
          </div>

        </div>

        {/* СТРОКА 2: текст + кнопки + статистика */}
        <div
          className="max-w-3xl transition-all duration-700"
          style={{ opacity: contentVisible ? 1 : 0, transform: contentVisible ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6" itemProp="description">
            Детский развивающий центр в Керчи, где каждый ребёнок чувствует себя особенным. Мягкая адаптация, творческое развитие и качественная подготовка к школе для детей от 1,5 до 7 лет.
          </p>
          <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label="Направления работы центра">
            {["🎨 Творчество", "📖 Подготовка к школе", "🤗 Лёгкая адаптация", "🌟 Комплексное развитие"].map((tag) => (
              <span key={tag} role="listitem" className="px-3 py-1.5 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8">
            <a href="https://vk.com/app6379730_-179759189#l=6" target="_blank" rel="noopener noreferrer"
              aria-label="Подробнее о детском саде «Рыбка Долли» во ВКонтакте"
              className="px-6 py-3 bg-[#4f86f7] text-white font-bold text-base rounded-2xl shadow-lg text-center
                transition-all duration-200 hover:bg-[#3570e0] hover:shadow-xl hover:-translate-y-1 hover:scale-105 active:scale-95">
              🏠 Подробнее о садике →
            </a>
            <button onClick={() => scrollTo("запись")}
              aria-label="Получить консультацию и чек-лист в подарок"
              className="px-6 py-3 bg-[#e85d3b] text-white font-bold text-base rounded-2xl shadow-lg
                transition-all duration-200 hover:bg-[#c94d2e] hover:shadow-xl hover:-translate-y-1 hover:scale-105 active:scale-95 flex items-center gap-2">
              <span>🎁</span> Получить консультацию + чек-лист в подарок
            </button>
            <a href="https://vk.com/app6379730_-179759189#l=8" target="_blank" rel="noopener noreferrer"
              aria-label="Смены летнего клуба «Рыбка Долли» — купить путёвку"
              className="px-6 py-3 bg-[#f7c948] text-gray-800 font-bold text-base rounded-2xl shadow-lg text-center
                transition-all duration-200 hover:bg-[#e6b830] hover:shadow-xl hover:-translate-y-1 hover:scale-105 active:scale-95">
              ☀️ Смены летнего клуба →
            </a>
          </div>
          <div className="flex flex-wrap gap-6" role="list" aria-label="Преимущества центра">
            {[
              ["🏡", "Множество счастливых семей"],
              ["👩‍🏫", "Опытные, современные педагоги"],
              ["📚", "Авторские программы развития"],
            ].map(([icon, label]) => (
              <div key={label} role="listitem" className="flex items-center gap-2">
                <div className="text-2xl" aria-hidden="true">{icon}</div>
                <div className="text-sm text-gray-600 font-medium max-w-[120px] leading-tight">{label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}