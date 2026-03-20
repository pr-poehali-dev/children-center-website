interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  return (
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
      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">

        {/* СТРОКА 1: цветок слева + название справа */}
        <div className="flex flex-wrap items-center gap-10 mb-8">

          {/* ЦВЕТОК слева */}
          <div className="relative flex-shrink-0" style={{ width: 420, height: 420 }}>
            <div className="absolute rounded-full overflow-hidden border-[5px] border-white shadow-2xl"
              style={{ width: 230, height: 230, top: 0, left: '50%', transform: 'translateX(-50%)' }}>
              <img src="https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/c9c6c2de-6fa6-4603-b1dd-47cf3c59d10d.png"
                alt="Занятие 1" className="w-full h-full object-cover object-center" />
            </div>
            <div className="absolute rounded-full overflow-hidden border-[5px] border-white shadow-2xl"
              style={{ width: 230, height: 230, bottom: 0, left: 0 }}>
              <img src="https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/b5abbf02-664c-4904-a795-366abad23a95.png"
                alt="Занятие 2" className="w-full h-full object-cover object-center" />
            </div>
            <div className="absolute rounded-full overflow-hidden border-[5px] border-white shadow-2xl"
              style={{ width: 230, height: 230, bottom: 0, right: 0 }}>
              <img src="https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/7c6c1780-f350-491b-85cc-f59152886e65.png"
                alt="Занятие 3" className="w-full h-full object-cover object-center" />
            </div>
          </div>

          {/* НАЗВАНИЕ справа */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-sm text-[#2a8c6e] font-semibold shadow-sm mb-4">
              <span>🌈</span> Комфортное пространство для детей
            </div>
            <h1 className="font-pacifico text-6xl md:text-7xl lg:text-8xl text-[#2a6e8c] leading-none mb-3">
              Рыбка Долли
            </h1>
            <p className="font-pacifico text-2xl md:text-3xl text-[#f7a825]">Дети наше всё!</p>
          </div>

        </div>

        {/* СТРОКА 2: текст + кнопки + статистика */}
        <div className="max-w-3xl">
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Детский развивающий центр, где каждый ребёнок чувствует себя особенным. Мягкая адаптация, творческое развитие и качественная подготовка к школе.
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            {["🎨 Творчество", "📖 Подготовка к школе", "🤗 Лёгкая адаптация", "🌟 Комплексное развитие"].map((tag) => (
              <span key={tag} className="px-4 py-1.5 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 mb-8">
            <a href="https://vk.com/app6379730_-179759189#l=6" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 bg-[#4f86f7] text-white font-bold text-lg rounded-2xl hover:bg-[#3570e0] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              🏠 Подробнее о садике →
            </a>
            <button onClick={() => scrollTo("запись")}
              className="px-8 py-4 bg-[#e85d3b] text-white font-bold text-lg rounded-2xl hover:bg-[#c94d2e] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              Записаться на экскурсию
            </button>
            <a href="https://vk.com/app6379730_-179759189#l=8" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 bg-[#f7c948] text-gray-800 font-bold text-lg rounded-2xl hover:bg-[#e6b830] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              ☀️ Смены летнего клуба →
            </a>
          </div>
          <div className="flex gap-8">
            {[
              ["🏡", "Множество счастливых семей"],
              ["👩‍🏫", "Опытные, современные педагоги"],
              ["📚", "Авторские программы развития"],
            ].map(([icon, label]) => (
              <div key={label} className="flex items-center gap-2">
                <div className="text-2xl">{icon}</div>
                <div className="text-sm text-gray-600 font-medium max-w-[110px] leading-tight">{label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}