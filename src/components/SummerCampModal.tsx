import { useState } from "react";

interface SummerCampModalProps {
  open: boolean;
  onClose: () => void;
  scrollTo: (id: string) => void;
}

const SHIFTS = [
  {
    emoji: "📖",
    theme: "Сундук со сказками",
    desc: "Описание смены появится совсем скоро — следите за новостями!",
  },
  {
    emoji: "🍕",
    theme: "Вкусные открытия",
    desc: "Описание смены появится совсем скоро — следите за новостями!",
  },
  {
    emoji: "🎬",
    theme: "Мульти-драйв",
    desc: "Описание смены появится совсем скоро — следите за новостями!",
  },
  {
    emoji: "📱",
    theme: "Поколение Альфа",
    desc: "Описание смены появится совсем скоро — следите за новостями!",
  },
  {
    emoji: "🚀",
    theme: "Есть ли жизнь на Марсе?",
    desc: "Описание смены появится совсем скоро — следите за новостями!",
  },
  {
    emoji: "🌍",
    theme: "Кругосветка",
    desc: "Описание смены появится совсем скоро — следите за новостями!",
  },
  {
    emoji: "🔬",
    theme: "Лаборатория чудес",
    desc: "Описание смены появится совсем скоро — следите за новостями!",
  },
];

export default function SummerCampModal({ open, onClose, scrollTo }: SummerCampModalProps) {
  const [activeShift, setActiveShift] = useState<number | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Шапка */}
        <div className="sticky top-0 bg-gradient-to-r from-[#fff3e8] to-[#fde8d0] px-6 pt-6 pb-4 rounded-t-3xl z-10">
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
            Летний клуб «РыбкаДолли»:<br />приключения, друзья и никаких гаджетов
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

          {/* Фото */}
          <div className="w-full rounded-2xl overflow-hidden mb-6 shadow-sm">
            <img
              src="https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/35403e3b-0707-4044-8d1d-70e16fde3b68.png"
              alt="Дети летнего клуба РыбкаДолли на прогулке у фонтана"
              className="w-full h-56 object-cover object-top"
            />
          </div>

          {/* Тематические смены */}
          <h3 className="font-bold text-gray-800 text-lg mb-1">Тематические смены — каждая неделя новый мир:</h3>
          <p className="text-xs text-gray-400 mb-4">Нажмите на смену, чтобы узнать подробнее</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {SHIFTS.map((s, i) => (
              <button
                key={s.theme}
                onClick={() => setActiveShift(activeShift === i ? null : i)}
                className={`text-left rounded-2xl p-4 flex items-center gap-3 border-2 transition-all duration-200 ${
                  activeShift === i
                    ? "border-[#c45e10] bg-[#fff3e8] shadow-md"
                    : "border-transparent bg-[#fff3e8] hover:border-[#c45e10]/50"
                }`}
              >
                <span className="text-2xl flex-shrink-0">{s.emoji}</span>
                <span className="font-bold text-gray-800 text-sm leading-snug">{s.theme}</span>
              </button>
            ))}
          </div>

          {/* Описание выбранной смены */}
          {activeShift !== null && (
            <div className="bg-[#fff3e8] border-2 border-[#c45e10] rounded-2xl p-5 mb-6 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{SHIFTS[activeShift].emoji}</span>
                <span className="font-pacifico text-lg text-[#c45e10]">{SHIFTS[activeShift].theme}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{SHIFTS[activeShift].desc}</p>
            </div>
          )}

          {/* Активности */}
          <h3 className="font-bold text-gray-800 text-lg mb-4">Активности:</h3>
          <div className="space-y-3 mb-6">
            {[
              { icon: "🏖️", text: "Поездки на море и походы" },
              { icon: "🔥", text: "Барбекю на природе" },
              { icon: "🌳", text: "Прогулки и командные игры в парках" },
              { icon: "🎨", text: "Творческие, экспериментальные и кулинарные мастер-классы" },
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
              2-х разовое горячее питание:<br />обед и полдник
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => { onClose(); scrollTo("запись"); }}
            className="w-full py-4 bg-[#c45e10] text-white font-bold text-lg rounded-2xl shadow-lg hover:bg-[#a34d0c] hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Записаться в летний клуб →
          </button>
        </div>
      </div>
    </div>
  );
}
