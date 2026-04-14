interface SummerCampModalProps {
  open: boolean;
  onClose: () => void;
  scrollTo: (id: string) => void;
}

export default function SummerCampModal({ open, onClose, scrollTo }: SummerCampModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Шапка */}
        <div className="sticky top-0 bg-gradient-to-r from-[#fff3e8] to-[#fde8d0] px-6 pt-6 pb-4 rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-white transition-all text-xl font-bold"
          >
            ×
          </button>
          <div className="inline-block bg-[#c45e10] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            Июнь — Август
          </div>
          <h2 className="font-pacifico text-2xl md:text-3xl text-gray-800 leading-snug pr-8">
            Лето в «РыбкеДолли»:<br />приключения, друзья и никаких гаджетов
          </h2>
        </div>

        <div className="px-6 pb-8 pt-5">

          {/* Описание */}
          <div className="bg-[#fff3e8] rounded-2xl p-5 mb-6">
            <p className="text-gray-700 leading-relaxed">
              Лето — это не только дача и планшет. Это время открытий! Мы разработали программу,
              в которой каждый день — это маленькое путешествие.
              <span className="font-bold text-[#c45e10]"> Вожатые-педагоги, активные игры, мастер-классы и новые друзья.</span>
            </p>
          </div>

          {/* Фото-заглушка */}
          <div className="w-full h-48 bg-[#fff3e8] rounded-2xl flex items-center justify-center mb-6 text-gray-400 text-sm border-2 border-dashed border-[#f0b882]">
            📸 Фото из лагеря — скоро будет
          </div>

          {/* Тематические смены */}
          <h3 className="font-bold text-gray-800 text-lg mb-4">Тематические смены — каждая неделя новый мир:</h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { emoji: "🚀", theme: "Космос" },
              { emoji: "🌴", theme: "Джунгли" },
              { emoji: "🔍", theme: "Детективы" },
              { emoji: "🔬", theme: "Наука" },
            ].map((s) => (
              <div key={s.theme} className="bg-[#fff3e8] rounded-2xl p-4 flex items-center gap-3">
                <span className="text-3xl">{s.emoji}</span>
                <span className="font-bold text-gray-800">{s.theme}</span>
              </div>
            ))}
          </div>

          {/* Преимущества */}
          <h3 className="font-bold text-gray-800 text-lg mb-4">Чем можно заняться:</h3>
          <div className="space-y-3 mb-6">
            {[
              { icon: "⚽", text: "Спорт, квесты и прогулки в парке" },
              { icon: "🎨", text: "Творческие мастер-классы" },
              { icon: "💃", text: "Танцы и командные игры" },
              { icon: "🍱", text: "3-разовое питание + полдник (с учётом аллергий)" },
              { icon: "📅", text: "Гибкий график: на неделю, две или всё лето" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 p-3 bg-[#fdf9f5] rounded-xl">
                <span className="text-xl">{item.icon}</span>
                <span className="text-gray-700 text-sm">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Цена */}
          <div className="bg-[#fff3e8] rounded-2xl p-5 flex items-center justify-between mb-6">
            <div>
              <div className="text-sm text-gray-500">Стоимость</div>
              <div className="font-pacifico text-2xl text-[#c45e10]">12 500 ₽/мес</div>
            </div>
            <div className="text-sm text-gray-500 text-right max-w-[180px]">
              Смены с июня по август
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => { onClose(); scrollTo("запись"); }}
            className="w-full py-4 bg-[#c45e10] text-white font-bold text-lg rounded-2xl shadow-lg hover:bg-[#a34d0c] hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Записаться в летний лагерь →
          </button>
        </div>
      </div>
    </div>
  );
}
