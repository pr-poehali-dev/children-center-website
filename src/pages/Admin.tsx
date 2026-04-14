import { useState, useEffect, useCallback } from "react";

const API_URL = "https://functions.poehali.dev/4d84314d-8994-40f2-80ad-a3feebbc162c";
const SPOTS_API = "https://functions.poehali.dev/caca698d-af1f-4f52-aed6-1c3f2dd75e01";

interface Application {
  id: number;
  name: string;
  phone: string;
  messenger: "telegram" | "whatsapp";
  service: string;
  message: string;
  status: "new" | "in_progress" | "done";
  created_at: string;
}

interface Group {
  id: number;
  group_name: string;
  spots_left: number;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new: { label: "Новая", color: "bg-red-100 text-red-700" },
  in_progress: { label: "В работе", color: "bg-yellow-100 text-yellow-700" },
  done: { label: "Готово", color: "bg-green-100 text-green-700" },
};

function formatPhone(phone: string) {
  return phone.replace(/\D/g, "");
}

function getMessengerLink(app: Application) {
  const digits = formatPhone(app.phone);
  if (app.messenger === "telegram") {
    return { url: `https://t.me/+${digits}`, label: "✈️ Написать в Telegram" };
  }
  return { url: `https://max.ru/+${digits}`, label: "💜 Написать в Макс" };
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function Admin() {
  const [password, setPassword] = useState(() => localStorage.getItem("admin_pwd") || "");
  const [inputPwd, setInputPwd] = useState("");
  const [authed, setAuthed] = useState(false);
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [groups, setGroups] = useState<Group[]>([]);
  const [spotsEditing, setSpotsEditing] = useState<Record<number, string>>({});
  const [spotsSaving, setSpotsSaving] = useState<Record<number, boolean>>({});

  const fetchApps = useCallback(async (pwd: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL, {
        headers: { "X-Admin-Password": pwd },
      });
      if (res.status === 401) {
        setAuthed(false);
        setError("Неверный пароль");
        localStorage.removeItem("admin_pwd");
        return;
      }
      const data = await res.json();
      setApps(data);
      setAuthed(true);
    } catch {
      setError("Ошибка соединения");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (password) fetchApps(password);
  }, [password, fetchApps]);

  useEffect(() => {
    if (authed) {
      fetch(SPOTS_API).then((r) => r.json()).then(setGroups).catch(() => {});
    }
  }, [authed]);

  const saveSpots = async (g: Group) => {
    const val = parseInt(spotsEditing[g.id] ?? String(g.spots_left));
    if (isNaN(val) || val < 0) return;
    setSpotsSaving((p) => ({ ...p, [g.id]: true }));
    await fetch(SPOTS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: g.id, spots_left: val }),
    });
    setGroups((prev) => prev.map((gr) => gr.id === g.id ? { ...gr, spots_left: val } : gr));
    setSpotsEditing((p) => { const n = { ...p }; delete n[g.id]; return n; });
    setSpotsSaving((p) => ({ ...p, [g.id]: false }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("admin_pwd", inputPwd);
    setPassword(inputPwd);
  };

  const updateStatus = async (id: number, status: string) => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Admin-Password": password },
      body: JSON.stringify({ action: "update_status", id, status }),
    });
    setApps((prev) => prev.map((a) => a.id === id ? { ...a, status: status as Application["status"] } : a));
  };

  const logout = () => {
    localStorage.removeItem("admin_pwd");
    setPassword("");
    setAuthed(false);
    setInputPwd("");
  };

  const filtered = filter === "all" ? apps : apps.filter((a) => a.status === filter);
  const counts = {
    all: apps.length,
    new: apps.filter((a) => a.status === "new").length,
    in_progress: apps.filter((a) => a.status === "in_progress").length,
    done: apps.filter((a) => a.status === "done").length,
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#fdf9f5] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-sm p-10 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🐟</div>
            <h1 className="font-bold text-2xl text-gray-800">Админка</h1>
            <p className="text-gray-400 text-sm mt-1">Рыбка Долли</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Пароль"
              value={inputPwd}
              onChange={(e) => setInputPwd(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#fdf9f5] rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e85d3b]/30 focus:border-[#e85d3b] transition-all"
            />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" className="w-full py-3 bg-[#e85d3b] text-white font-bold rounded-xl hover:bg-[#c94d2e] transition-all">
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf9f5]">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🐟</span>
            <div>
              <h1 className="font-bold text-gray-800 text-lg leading-none">Заявки</h1>
              <p className="text-gray-400 text-xs">Рыбка Долли</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => fetchApps(password)} className="text-sm text-[#e85d3b] font-semibold hover:underline">
              Обновить
            </button>
            <button onClick={logout} className="text-sm text-gray-400 hover:text-gray-600">
              Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* УПРАВЛЕНИЕ МЕСТАМИ */}
        {groups.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="font-bold text-gray-800 text-base mb-4">⏳ Свободные места на сентябрь</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {groups.map((g) => (
                <div key={g.id} className="bg-[#fdf9f5] rounded-xl p-4">
                  <div className="text-sm font-semibold text-gray-700 mb-2">{g.group_name}</div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      max={99}
                      value={spotsEditing[g.id] ?? g.spots_left}
                      onChange={(e) => setSpotsEditing((p) => ({ ...p, [g.id]: e.target.value }))}
                      className="w-20 px-3 py-2 text-lg font-bold text-center border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e85d3b]/30 focus:border-[#e85d3b]"
                    />
                    <span className="text-sm text-gray-400">мест</span>
                    {spotsEditing[g.id] !== undefined && (
                      <button
                        onClick={() => saveSpots(g)}
                        disabled={spotsSaving[g.id]}
                        className="ml-auto px-3 py-2 bg-[#e85d3b] text-white text-sm font-semibold rounded-xl hover:bg-[#c94d2e] transition-all disabled:opacity-50"
                      >
                        {spotsSaving[g.id] ? "..." : "Сохранить"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: "all", label: "Все" },
            { key: "new", label: "Новые" },
            { key: "in_progress", label: "В работе" },
            { key: "done", label: "Готово" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${filter === key ? "bg-[#e85d3b] text-white" : "bg-white text-gray-600 border border-gray-200"}`}
            >
              {label} <span className="ml-1 opacity-70">{counts[key as keyof typeof counts]}</span>
            </button>
          ))}
        </div>

        {loading && <p className="text-center text-gray-400 py-10">Загружаем заявки...</p>}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">📭</div>
            <p>Заявок пока нет</p>
          </div>
        )}

        <div className="space-y-4">
          {filtered.map((app) => {
            const link = getMessengerLink(app);
            const s = STATUS_LABELS[app.status];
            return (
              <div key={app.id} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{app.name}</h3>
                    <p className="text-gray-500 text-sm">{app.phone} · {app.messenger === "telegram" ? "✈️ Telegram" : "💜 Макс"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${s.color}`}>{s.label}</span>
                    <span className="text-xs text-gray-400">{formatDate(app.created_at)}</span>
                  </div>
                </div>

                {app.service && (
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Программа:</span> {app.service}
                  </p>
                )}
                {app.message && (
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-semibold">Сообщение:</span> {app.message}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#e85d3b] text-white hover:bg-[#c94d2e] transition-all"
                  >
                    {link.label}
                  </a>
                  {app.status !== "in_progress" && (
                    <button onClick={() => updateStatus(app.id, "in_progress")}
                      className="px-4 py-2 rounded-xl text-sm font-semibold bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-all">
                      В работе
                    </button>
                  )}
                  {app.status !== "done" && (
                    <button onClick={() => updateStatus(app.id, "done")}
                      className="px-4 py-2 rounded-xl text-sm font-semibold bg-green-100 text-green-700 hover:bg-green-200 transition-all">
                      Готово ✓
                    </button>
                  )}
                  {app.status !== "new" && (
                    <button onClick={() => updateStatus(app.id, "new")}
                      className="px-4 py-2 rounded-xl text-sm font-semibold bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all">
                      Вернуть в новые
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}