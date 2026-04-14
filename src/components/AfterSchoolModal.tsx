interface AfterSchoolModalProps {
  open: boolean;
  onClose: () => void;
  scrollTo: (id: string) => void;
}

export default function AfterSchoolModal({ open, onClose, scrollTo }: AfterSchoolModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Шапка */}
        <div className="sticky top-0 bg-gradient-to-r from-[#f3eeff] to-[#e8e0f9] px-6 pt-6 pb-4 rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-white transition-all text-xl font-bold"
          >
            ×
          </button>
          <div className="inline-block bg-[#6b3fc4] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            1 — 4 класс
          </div>
          <h2 className="font-pacifico text-2xl md:text-3xl text-gray-800 leading-snug pr-8">
            «Второй дом» для школьника:<br />без стресса из-за уроков и гаджетов
          </h2>
        </div>

        <div className="px-6 pb-8 pt-5">

          {/* Боль */}
          <div className="bg-[#f3eeff] rounded-2xl p-5 mb-6">
            <p className="text-gray-700 leading-relaxed">
              Школа заканчивается в 13:00, а рабочий день — в 18:00. Кто присмотрит за детьми?
              Бабушка устала, а дома — телевизор и бесконтрольный телефон?
              <span className="font-bold text-[#6b3fc4]"> Мы берём этот хаос на себя.</span>
            </p>
          </div>

          {/* Фото */}
          <div className="w-full rounded-2xl overflow-hidden mb-6 shadow-sm">
            <img
              src="https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/5bb071ed-1eee-40dc-93f6-18a01f7ab2fe.jpg"
              alt="Педагог помогает ребёнку с домашним заданием в группе продлённого дня"
              className="w-full h-56 object-cover object-top"
            />
          </div>

          {/* Преимущества */}
          <h3 className="font-bold text-gray-800 text-lg mb-4">Что мы берём на себя:</h3>
          <div className="space-y-4 mb-6">
            {[
              {
                icon: "✅",
                title: "Уроки сделаны ДО прихода мамы",
                desc: "Педагог помогает с домашним заданием, объясняет сложные темы. Вечер дома — для отдыха, а не для криков над тетрадью.",
              },
              {
                icon: "🍎",
                title: "Вкусный полдник",
                desc: "Домашняя еда, а не чипсы из автомата.",
              },
              {
                icon: "🎯",
                title: "Развитие без скуки",
                desc: "Английский в игре, лего-конструирование, настольные игры, творчество.",
              },
              {
                icon: "🔒",
                title: "Полная безопасность",
                desc: "Ребёнок под присмотром — вы спокойны на работе.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-4 bg-[#fdf9f5] rounded-2xl">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="font-bold text-gray-800 mb-1">{item.title}</div>
                  <div className="text-gray-500 text-sm leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Цена */}
          <div className="bg-[#f3eeff] rounded-2xl p-5 flex items-center justify-between mb-6">
            <div>
              <div className="text-sm text-gray-500">Стоимость</div>
              <div className="font-pacifico text-2xl text-[#6b3fc4]">12 500 ₽/мес</div>
            </div>
            <div className="text-sm text-gray-500 text-right max-w-[180px]">
              Пн–Пт, с 13:00 до 18:00
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => { onClose(); scrollTo("запись"); }}
            className="w-full py-4 bg-[#6b3fc4] text-white font-bold text-lg rounded-2xl shadow-lg hover:bg-[#5530a0] hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Узнать расписание продлёнки →
          </button>
        </div>
      </div>
    </div>
  );
}