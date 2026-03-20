import { useState } from "react";

const navLinks = ["О центре", "Услуги", "Специалисты", "Галерея", "Прайс", "Отзывы", "Контакты"];

const services = [
  { title: "Ясельная группа" },
  { title: "Старшая группа" },
  { title: "Логопед" },
  { title: "Группа продлённого дня" },
  { title: "Английский язык" },
  { title: "Летний клуб" },
];

interface ContactSectionProps {
  scrollTo: (id: string) => void;
}

export default function ContactSection({ scrollTo }: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://functions.poehali.dev/67816b86-b772-48a1-859b-33286ed93c0d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Не удалось отправить заявку. Позвоните нам по телефону.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ЗАПИСЬ */}
      <section id="запись" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#fff0ed] px-4 py-2 rounded-full text-sm text-[#e85d3b] font-semibold mb-4">
              <span>✍️</span> Запись
            </div>
            <h2 className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-4">Записаться в центр</h2>
            <p className="text-gray-500">Оставьте заявку и мы свяжемся с вами в течение часа</p>
          </div>
          {submitted ? (
            <div className="bg-[#e8f8f3] rounded-3xl p-10 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-pacifico text-2xl text-gray-800 mb-2">Заявка принята!</h3>
              <p className="text-gray-600">Мы позвоним вам в ближайшее время. Ждём вас в гости!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[#fdf9f5] rounded-3xl p-8 shadow-sm space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ваше имя *</label>
                  <input
                    type="text" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Анна Петрова"
                    className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e85d3b]/30 focus:border-[#e85d3b] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Телефон *</label>
                  <input
                    type="tel" required value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e85d3b]/30 focus:border-[#e85d3b] transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Интересующая программа</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e85d3b]/30 focus:border-[#e85d3b] transition-all"
                >
                  <option value="">Выберите программу</option>
                  {services.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Сообщение</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Возраст ребёнка, вопросы..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e85d3b]/30 focus:border-[#e85d3b] transition-all resize-none"
                />
              </div>
              {error && <p className="text-center text-sm text-red-500">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full py-4 bg-[#e85d3b] text-white font-bold text-lg rounded-2xl hover:bg-[#c94d2e] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? "Отправляем..." : "Отправить заявку 🚀"}
              </button>
              <p className="text-center text-xs text-gray-400">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </form>
          )}
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="контакты" className="py-20 bg-[#fdf9f5]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm text-[#e85d3b] font-semibold mb-4 shadow-sm">
              <span>📍</span> Контакты
            </div>
            <h2 className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-4">Как нас найти</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: "📍", title: "Адрес", lines: ["ул. Циолковского, 12", "г. Керчь"], color: "#fff0ed" },
              { emoji: "📞", title: "Телефон", lines: ["+7 (988) 152-16-98", "+7 (978) 712-03-53"], color: "#e8f8f3" },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-all">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" style={{ background: c.color }}>
                  {c.emoji}
                </div>
                <h3 className="font-bold text-gray-800 mb-3">{c.title}</h3>
                {c.lines.map((line) => (
                  <p key={line} className="text-gray-600 text-sm">{line}</p>
                ))}
              </div>
            ))}
            <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" style={{ background: "#e8f0fb" }}>
                💬
              </div>
              <h3 className="font-bold text-gray-800 mb-3">Мы в соцсетях</h3>
              <p className="text-gray-600 text-sm mb-3">ribkadolli@mail.ru</p>
              <a href="https://vk.com/rybka_dolli" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 bg-[#0077FF] text-white text-sm font-semibold rounded-full hover:bg-[#005fcc] transition-all">
                ВКонтакте →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/c4844e39-f0a4-402d-b73b-86467b249168.png" alt="Рыбка Долли" className="h-12 w-12 object-contain rounded-xl" />
              <div>
                <div className="font-pacifico text-xl text-yellow-300">Рыбка Долли</div>
                <div className="text-sm text-gray-400">Дети наше всё!</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              {navLinks.map((link) => (
                <button key={link} onClick={() => scrollTo(link.toLowerCase())} className="hover:text-white transition-colors">
                  {link}
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-500">© 2024 Рыбка Долли</div>
          </div>
        </div>
      </footer>
    </>
  );
}