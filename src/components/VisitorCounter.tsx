import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const VISITORS_URL = "https://functions.poehali.dev/76c7bb6b-d916-4f1b-8f69-9578e96ab544";
const SECRET_CODE = "Savva22";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === SECRET_CODE) {
      setIsAdmin(true);
    }

    fetch(VISITORS_URL, { method: "POST" })
      .then((r) => r.json())
      .then((data) => {
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        setCount(parsed.count);
      })
      .catch(() => {});
  }, []);

  if (!isAdmin || count === null) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-3 bg-[#fff0ed] border-t border-[#f5d0c5]">
      <Icon name="Users" size={16} className="text-[#e85d3b]" />
      <span className="text-sm text-gray-600">
        Уникальных посетителей: <span className="font-bold text-[#e85d3b]">{count.toLocaleString("ru-RU")}</span>
      </span>
    </div>
  );
}
