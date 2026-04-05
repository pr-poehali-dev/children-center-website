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
  const [formData, setFormData] = useState({ name: "", phone: "", messenger: "telegram", service: "", message: "" });
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
      <section id="запись" aria-labelledby="booking-heading" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#fff0ed] px-4 py-2 rounded-full text-sm text-[#e85d3b] font-semibold mb-4">
              <span aria-hidden="true">✍️</span> Запись
            </div>
            <h2 id="booking-heading" className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-4">Записаться в центр</h2>
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
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Мессенджер для ответа *</label>
                <p className="text-xs text-gray-400 mb-2">Укажите номер, привязанный к мессенджеру</p>
                <div className="flex gap-3 mb-3">
                  <button type="button"
                    onClick={() => setFormData({ ...formData, messenger: "telegram" })}
                    className={`flex-1 py-2.5 px-4 rounded-xl border-2 font-semibold text-sm transition-all ${formData.messenger === "telegram" ? "border-[#2AABEE] bg-[#e8f6fd] text-[#2AABEE]" : "border-gray-200 bg-white text-gray-500"}`}>
                    ✈️ Telegram
                  </button>
                  <button type="button"
                    onClick={() => setFormData({ ...formData, messenger: "whatsapp" })}
                    className={`flex-1 py-2.5 px-4 rounded-xl border-2 font-semibold text-sm transition-all ${formData.messenger === "whatsapp" ? "border-[#25D366] bg-[#e8faf0] text-[#25D366]" : "border-gray-200 bg-white text-gray-500"}`}>
                    💬 WhatsApp
                  </button>
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
                className="w-full py-4 bg-[#e85d3b] text-white font-bold text-lg rounded-2xl transition-all duration-200 shadow-lg hover:bg-[#c94d2e] hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0">
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
      <section id="контакты" aria-labelledby="contacts-heading" className="py-20 bg-[#fdf9f5]"
        itemScope itemType="https://schema.org/LocalBusiness">
        <meta itemProp="name" content="Детский развивающий центр «Рыбка Долли»" />
        <meta itemProp="telephone" content="+79881521698" />
        <meta itemProp="email" content="ribkadolli@mail.ru" />
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm text-[#e85d3b] font-semibold mb-4 shadow-sm">
              <span aria-hidden="true">📍</span> Контакты
            </div>
            <h2 id="contacts-heading" className="font-pacifico text-3xl md:text-4xl text-gray-800 mb-4">Как нас найти</h2>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-sm mb-6 h-64 sm:h-80">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=36.476560%2C45.360614&z=16&pt=36.476560,45.360614,pm2rdm&text=Керчь%2C+ул.+Циолковского%2C+12"
              width="100%" height="100%" frameBorder="0" allowFullScreen
              title="Карта проезда к детскому центру «Рыбка Долли», Керчь, ул. Циолковского, 12"
              loading="lazy" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" style={{ background: "#fff0ed" }} aria-hidden="true">📍</div>
              <h3 className="font-bold text-gray-800 mb-3">Адрес</h3>
              <address className="not-italic" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <p className="text-gray-600 text-sm" itemProp="streetAddress">ул. Циолковского, 12</p>
                <p className="text-gray-600 text-sm"><span itemProp="addressLocality">г. Керчь</span>, <span itemProp="addressRegion">Республика Крым</span></p>
                <meta itemProp="postalCode" content="298300" />
                <meta itemProp="addressCountry" content="RU" />
              </address>
            </div>
            <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" style={{ background: "#e8f8f3" }} aria-hidden="true">📞</div>
              <h3 className="font-bold text-gray-800 mb-3">Телефон</h3>
              <a href="tel:+79881521698" aria-label="Позвонить в центр: +7 988 152-16-98"
                className="block text-[#2a8c6e] font-semibold text-sm hover:underline" itemProp="telephone">
                +7 (988) 152-16-98
              </a>
              <a href="tel:+79787120353" aria-label="Позвонить в центр: +7 978 712-03-53"
                className="block text-[#2a8c6e] font-semibold text-sm hover:underline">
                +7 (978) 712-03-53
              </a>
            </div>
            <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" style={{ background: "#fef9e7" }} aria-hidden="true">🕐</div>
              <h3 className="font-bold text-gray-800 mb-3">Режим работы</h3>
              <p className="text-gray-600 text-sm" itemProp="openingHours" content="Mo-Fr 08:00-18:00">Понедельник — пятница</p>
              <p className="text-gray-600 text-sm">8:00 — 18:00</p>
            </div>
            <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" style={{ background: "#e8f0fb" }} aria-hidden="true">💬</div>
              <h3 className="font-bold text-gray-800 mb-3">Мы в соцсетях</h3>
              <a href="mailto:ribkadolli@mail.ru" className="block text-gray-600 text-sm mb-3 hover:text-[#e85d3b] transition-colors" itemProp="email">
                ribkadolli@mail.ru
              </a>
              <a href="https://vk.com/rybka_dolli" target="_blank" rel="noopener noreferrer"
                aria-label="Группа детского центра «Рыбка Долли» ВКонтакте" itemProp="sameAs"
                className="inline-flex items-center gap-2 px-5 py-2 bg-[#0077FF] text-white text-sm font-semibold rounded-full transition-all duration-200 hover:bg-[#005fcc] hover:-translate-y-1 hover:scale-105 hover:shadow-lg active:scale-95">
                ВКонтакте →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white py-10" role="contentinfo" aria-label="Нижний колонтитул сайта «Рыбка Долли»">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="https://cdn.poehali.dev/projects/ea3a12a1-1eaf-439c-b026-77bfc65eb6b6/bucket/c4844e39-f0a4-402d-b73b-86467b249168.png"
                alt="Логотип детского центра «Рыбка Долли», Керчь"
                className="h-12 w-12 object-contain rounded-xl"
                width="48" height="48" loading="lazy" />
              <div>
                <div className="font-pacifico text-xl text-yellow-300">Рыбка Долли</div>
                <div className="text-sm text-gray-400">Дети наше всё!</div>
              </div>
            </div>
            <nav aria-label="Навигация по странице в подвале">
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                {navLinks.map((link) => (
                  <button key={link} onClick={() => scrollTo(link.toLowerCase())} className="hover:text-white transition-colors">
                    {link}
                  </button>
                ))}
              </div>
            </nav>
            <div className="text-sm text-gray-500">
              <span>© {new Date().getFullYear()} Рыбка Долли</span>
              <span className="block text-xs text-gray-600 mt-1">г. Керчь, ул. Циолковского, 12</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}