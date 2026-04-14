interface ThreeDoorsBlockProps {
  scrollTo: (id: string) => void;
  onOpenAfterSchool: () => void;
  onOpenSummerCamp: () => void;
}

export default function ThreeDoorsBlock({ scrollTo, onOpenAfterSchool, onOpenSummerCamp }: ThreeDoorsBlockProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#fff0ed] px-4 py-2 rounded-full text-sm text-[#e85d3b] font-semibold mb-4">
            <span>🚪</span> Выберите своё направление
          </div>
          <h2 className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-3">
            Развивающий центр для детей от 1,5 до 12 лет
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Мы — не просто садик. У нас три полноценных направления для разного возраста и разных задач
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* КАРТОЧКА 1 — Детский сад */}
          <button
            onClick={() => scrollTo("услуги")}
            className="group text-left rounded-3xl overflow-hidden shadow-sm border-2 border-transparent hover:border-[#e85d3b] hover:shadow-xl transition-all duration-300 hover:-translate-y-2 focus:outline-none"
          >
            <div className="h-52 bg-gradient-to-br from-[#fff0ed] to-[#fde8e2] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl opacity-20 group-hover:opacity-30 transition-opacity">🧸</span>
              </div>
              <div className="relative z-10 text-center px-6">
                <div className="text-5xl mb-2">🧸</div>
                <div className="inline-block bg-[#e85d3b] text-white text-xs font-bold px-3 py-1 rounded-full">
                  1,5 — 7 лет
                </div>
              </div>
            </div>
            <div className="bg-white p-6">
              <h3 className="font-pacifico text-xl text-gray-800 mb-2 group-hover:text-[#e85d3b] transition-colors">
                Детский сад
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Мягкая адаптация, творчество и подготовка к школе. Ясельная и старшая группы.
              </p>
              <div className="flex items-center gap-1 text-[#e85d3b] text-sm font-semibold">
                Подробнее <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </div>
          </button>

          {/* КАРТОЧКА 2 — Продлёнка */}
          <button
            onClick={onOpenAfterSchool}
            className="group text-left rounded-3xl overflow-hidden shadow-sm border-2 border-transparent hover:border-[#6b3fc4] hover:shadow-xl transition-all duration-300 hover:-translate-y-2 focus:outline-none"
          >
            <div className="h-52 bg-gradient-to-br from-[#f3eeff] to-[#e8e0f9] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl opacity-20 group-hover:opacity-30 transition-opacity">📚</span>
              </div>
              <div className="relative z-10 text-center px-6">
                <div className="text-5xl mb-2">📚</div>
                <div className="inline-block bg-[#6b3fc4] text-white text-xs font-bold px-3 py-1 rounded-full">
                  1 — 4 класс
                </div>
              </div>
            </div>
            <div className="bg-white p-6">
              <h3 className="font-pacifico text-xl text-gray-800 mb-2 group-hover:text-[#6b3fc4] transition-colors">
                Группа продлённого дня
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Уроки сделаны до прихода мамы. Безопасно, вкусно, без гаджетов и скуки.
              </p>
              <div className="flex items-center gap-1 text-[#6b3fc4] text-sm font-semibold">
                Узнать подробнее <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </div>
          </button>

          {/* КАРТОЧКА 3 — Летний лагерь */}
          <button
            onClick={onOpenSummerCamp}
            className="group text-left rounded-3xl overflow-hidden shadow-sm border-2 border-transparent hover:border-[#c45e10] hover:shadow-xl transition-all duration-300 hover:-translate-y-2 focus:outline-none"
          >
            <div className="h-52 bg-gradient-to-br from-[#fff3e8] to-[#fde8d0] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl opacity-20 group-hover:opacity-30 transition-opacity">☀️</span>
              </div>
              <div className="relative z-10 text-center px-6">
                <div className="text-5xl mb-2">☀️</div>
                <div className="inline-block bg-[#c45e10] text-white text-xs font-bold px-3 py-1 rounded-full">
                  Июнь — Август
                </div>
              </div>
            </div>
            <div className="bg-white p-6">
              <h3 className="font-pacifico text-xl text-gray-800 mb-2 group-hover:text-[#c45e10] transition-colors">
                Летний лагерь
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Приключения, друзья и никаких гаджетов. Каждая неделя — новая тема.
              </p>
              <div className="flex items-center gap-1 text-[#c45e10] text-sm font-semibold">
                Узнать подробнее <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </div>
          </button>

        </div>
      </div>
    </section>
  );
}
