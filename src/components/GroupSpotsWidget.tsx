import { useEffect, useState } from "react";

const API_URL = "https://functions.poehali.dev/caca698d-af1f-4f52-aed6-1c3f2dd75e01";

interface Group {
  id: number;
  group_name: string;
  spots_left: number;
}

interface GroupSpotsWidgetProps {
  scrollTo?: (id: string) => void;
}

export default function GroupSpotsWidget({ scrollTo }: GroupSpotsWidgetProps) {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then(setGroups)
      .catch(() => {});
  }, []);

  if (!groups.length) return null;

  const getColor = (spots: number) => {
    if (spots <= 1) return { bg: "#fff0ed", text: "#e85d3b", dot: "#e85d3b" };
    if (spots <= 3) return { bg: "#fffbeb", text: "#d4840a", dot: "#f7c948" };
    return { bg: "#e8f8f3", text: "#2a8c6e", dot: "#2a8c6e" };
  };

  return (
    <section className="py-14 bg-gradient-to-br from-[#fff8f0] to-[#fdf9f5]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm text-[#e85d3b] font-semibold mb-4 shadow-sm">
            <span>⏳</span> Успейте занять место
          </div>
          <h2 className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-3">
            Хотите, чтобы ребёнок рос счастливым — а вы могли выдохнуть?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            В «РыбкеДолли» мы создали пространство, где дети развиваются с удовольствием, а мамы получают время для себя.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {groups.map((g) => {
            const c = getColor(g.spots_left);
            return (
              <div
                key={g.id}
                className="rounded-2xl p-5 text-center shadow-sm border border-white hover:shadow-md transition-all"
                style={{ background: c.bg }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full animate-pulse inline-block" style={{ background: c.dot }} />
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: c.text }}>
                    {g.spots_left === 0 ? "Мест нет" : g.spots_left <= 2 ? "Почти занято" : "Есть места"}
                  </span>
                </div>
                <div className="font-bold text-gray-800 text-base mb-1">{g.group_name}</div>
                <div className="text-4xl font-pacifico" style={{ color: c.text }}>
                  {g.spots_left}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {g.spots_left === 1 ? "свободное место" : g.spots_left >= 2 && g.spots_left <= 4 ? "свободных места" : "свободных мест"}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={() => scrollTo?.("запись")}
            className="px-8 py-4 bg-[#e85d3b] text-white font-bold text-lg rounded-2xl shadow-lg transition-all duration-200 hover:bg-[#c94d2e] hover:shadow-xl hover:-translate-y-1 hover:scale-105 active:scale-95"
          >
            🎁 Получить консультацию + чек-лист в подарок
          </button>
          <p className="text-xs text-gray-400 mt-3">Мы свяжемся с вами в течение часа</p>
        </div>
      </div>
    </section>
  );
}