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
    age: "7–9 лет",
    duration: "2 недели",
    slogan: "Волшебство, которое оживает в руках ребёнка",
    activities: [
      "Погружение в сюжет: каждый день — новая глава сказки",
      "Театральная постановка в современном стиле (репетиции + премьера)",
      "Творческие и кулинарные мастер-классы по мотивам историй",
      "Тематические прогулки и интеллектуальные викторины",
    ],
    skills: "Развитие речи, фантазии, уверенности в себе на публике и умения работать в команде.",
    bonus: "Премьера спектакля для родителей + личный «сказочный дневник» с артефактами путешествия.",
  },
  {
    emoji: "🍳",
    theme: "Вкусные открытия",
    age: "7–12 лет",
    duration: "2 недели",
    slogan: "Гастрономическое путешествие по 5 континентам",
    activities: [
      "Готовим сами: от простых закусок до авторских десертов и выездного барбекю",
      "Изучаем культуру, традиции и застольный этикет разных стран",
      "Кулинарные баттлы, дегустации и создание семейных рецептов",
      "Научные викторины о еде и питании",
    ],
    skills: "Самостоятельность на кухне, принципы здорового питания, расширение кругозора.",
    bonus: "Персональная кулинарная книга ребёнка + сертификат «Юного шеф-повара».",
  },
  {
    emoji: "🏴‍☠️",
    theme: "Мульти-драйв",
    age: "7–10 лет",
    duration: "2 недели",
    slogan: "Ожившие мультфильмы, пиратские квесты и поиск сокровищ",
    activities: [
      "Путешествие по вселенным любимых мультфильмов",
      "Пиратский квест с картой, шифрами и командными испытаниями",
      "Творческие мастер-классы: от анимации до рукоделия",
      "Поездки на море, походы с играми на свежем воздухе",
    ],
    skills: "Креативное мышление, лидерские качества, умение договариваться и достигать цели.",
    bonus: "«Пиратская карта приключений» с отметками + профессиональный фотоотчёт в стиле кино.",
  },
  {
    emoji: "📱",
    theme: "Поколение Альфа",
    age: "10–14 лет",
    duration: "2 недели",
    slogan: "Гаджеты — в дело. Технологии, творчество и реальные навыки",
    activities: [
      "Основы работы с ИИ: промты, генерация идей, этичное использование",
      "Фуд-фотография и визуальный сторителлинг",
      "Создание чат-бота для Telegram и неоновой вывески своими руками",
      "Дизайн и печать уникальной футболки + мастер-класс по созданию парфюма",
      "Море, походы с барбекю и командные викторины",
    ],
    skills: "Цифровая грамотность, проектное мышление, умение создавать, а не только потреблять контент.",
    bonus: "Готовый продукт на выбор (футболка/вывеска/бот) + цифровое портфолио навыков.",
  },
  {
    emoji: "🚀",
    theme: "Есть ли жизнь на Марсе?",
    age: "10–14 лет",
    duration: "2 недели",
    slogan: "Космическая миссия: колонизируем Марс своими руками",
    activities: [
      "Инженерные задачи: сборка солнечной панели и умной пожарной сигнализации",
      "Гидропоника: выращиваем растения в «марсианских» условиях",
      "Создание реалистичного шлема космонавта (не из картона!)",
      "Съёмка финального ролика: высадка на Марс и контакт с инопланетянами",
      "Использование ИИ и спецПО для моделирования и монтажа",
    ],
    skills: "Инженерное мышление, работа с технологиями будущего, управление проектами от идеи до презентации.",
    bonus: "Премьера космического ролика + работающие гаджеты/модели, которые ребёнок заберёт домой.",
  },
  {
    emoji: "🌍",
    theme: "Кругосветка",
    age: "7–12 лет",
    duration: "2 недели",
    slogan: "Экспедиция в неизведанные уголки планеты",
    activities: [
      "Путешествие по культурам и кухням мира (от Азии до Латинской Америки)",
      "Кулинарные и этнографические мастер-классы: готовим, пробуем, сравниваем",
      "Тематические квесты, изучение традиций и языковых приветствий",
      "Выезды на природу, викторины на эрудицию и логику",
    ],
    skills: "Любознательность, толерантность, адаптивность и умение находить общее в разном.",
    bonus: "«Паспорт путешественника» с визами разных стран + мини-выставка культурных артефактов.",
  },
  {
    emoji: "🔬",
    theme: "Лаборатория чудес",
    age: "7–12 лет",
    duration: "1 неделя (интенсив)",
    slogan: "Физика и химия без скучных учебников",
    activities: [
      "Зрелищные и безопасные опыты с физическими и химическими явлениями",
      "Изучение законов природы через игру и эксперимент",
      "Научные викторины, командные битвы эрудитов",
      "Создание домашних «лабораторных наборов»",
    ],
    skills: "Критическое мышление, понимание причинно-следственных связей, любовь к науке.",
    bonus: "Персональный набор для опытов + сертификат «Юного исследователя».",
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
            <div className="border-2 border-[#c45e10] rounded-2xl overflow-hidden mb-6">
              <div className="bg-[#fff3e8] px-5 pt-5 pb-4">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-3xl">{SHIFTS[activeShift].emoji}</span>
                  <div>
                    <div className="font-pacifico text-lg text-[#c45e10] leading-tight">{SHIFTS[activeShift].theme}</div>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs bg-white text-[#c45e10] font-semibold px-2 py-0.5 rounded-full">👤 {SHIFTS[activeShift].age}</span>
                      <span className="text-xs bg-white text-gray-500 font-semibold px-2 py-0.5 rounded-full">📅 {SHIFTS[activeShift].duration}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#c45e10] font-semibold italic mt-2">«{SHIFTS[activeShift].slogan}»</p>
              </div>
              <div className="bg-white px-5 py-4 space-y-4">
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Что делаем:</div>
                  <ul className="space-y-1.5">
                    {SHIFTS[activeShift].activities.map((a) => (
                      <li key={a} className="flex gap-2 text-sm text-gray-700">
                        <span className="text-[#c45e10] mt-0.5 flex-shrink-0">🔹</span>{a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#fdf9f5] rounded-xl p-3">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Чему научится:</div>
                  <p className="text-sm text-gray-700">{SHIFTS[activeShift].skills}</p>
                </div>
                <div className="bg-[#fff3e8] rounded-xl p-3 flex gap-2">
                  <span className="text-lg flex-shrink-0">🎁</span>
                  <div>
                    <div className="text-xs font-bold text-[#c45e10] uppercase tracking-wide mb-0.5">Фишка смены:</div>
                    <p className="text-sm text-gray-700">{SHIFTS[activeShift].bonus}</p>
                  </div>
                </div>
                <button
                  onClick={() => { onClose(); scrollTo("запись"); }}
                  className="w-full py-3 bg-[#c45e10] text-white font-bold text-sm rounded-xl hover:bg-[#a34d0c] transition-all"
                >
                  Забронировать место →
                </button>
              </div>
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