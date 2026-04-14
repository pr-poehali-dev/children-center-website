interface SynergyBlockProps {
  scrollTo: (id: string) => void;
}

export default function SynergyBlock({ scrollTo }: SynergyBlockProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-[#fff8f0] via-[#f3eeff] to-[#e8f8f3]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm text-[#2a8c6e] font-semibold mb-4 shadow-sm">
            <span>🌱</span> Экосистема
          </div>
          <h2 className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-4">Растём вместе с вами</h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Ваш ребёнок ходил к нам в группу раннего развития? Теперь он может пойти
            в подготовительную группу, а летом — в лагерь с любимыми воспитателями.
            Мы знаем привычки вашего ребёнка, и ему не придётся привыкать заново.
            <span className="font-bold text-[#2a8c6e]"> Непрерывность — наша забота о вас.</span>
          </p>
        </div>

        {/* Путь ребёнка */}
        <div className="relative">
          {/* Линия-соединитель для десктопа */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-[#e85d3b] via-[#6b3fc4] to-[#c45e10] z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {[
              {
                step: "1",
                emoji: "🧸",
                age: "1,5 — 7 лет",
                title: "Детский сад",
                desc: "Мягкая адаптация, творчество и первые друзья. Ребёнок растёт в заботливой среде.",
                color: "#e85d3b",
                bg: "#fff0ed",
              },
              {
                step: "2",
                emoji: "📚",
                age: "1 — 4 класс",
                title: "Группа продлённого дня",
                desc: "Уроки под присмотром педагога, полдник и развитие — пока мама на работе.",
                color: "#6b3fc4",
                bg: "#f3eeff",
              },
              {
                step: "3",
                emoji: "☀️",
                age: "Лето",
                title: "Летний лагерь",
                desc: "Каждое лето — новые приключения с теми же любимыми педагогами.",
                color: "#c45e10",
                bg: "#fff3e8",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-4 shadow-md border-4 border-white"
                  style={{ background: item.bg }}
                >
                  {item.emoji}
                </div>
                <div
                  className="inline-block text-white text-xs font-bold px-3 py-1 rounded-full mb-2"
                  style={{ background: item.color }}
                >
                  {item.age}
                </div>
                <h3 className="font-pacifico text-lg text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button
            onClick={() => scrollTo("запись")}
            className="px-8 py-4 bg-[#2a8c6e] text-white font-bold text-base rounded-2xl shadow-lg hover:bg-[#1e6b54] hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
          >
            🎁 Получить консультацию + чек-лист в подарок
          </button>
        </div>
      </div>
    </section>
  );
}
