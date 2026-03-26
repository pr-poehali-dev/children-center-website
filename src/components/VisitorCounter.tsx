import { useEffect, useState } from "react";

const VISITORS_URL = "https://functions.poehali.dev/76c7bb6b-d916-4f1b-8f69-9578e96ab544";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(VISITORS_URL, { method: "POST" })
      .then((r) => r.json())
      .then((data) => {
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        setCount(parsed.count);
      })
      .catch(() => {});
  }, []);

  if (count === null) return null;

  return (
    <div className="py-4 text-center border-t border-gray-100">
      <span className="text-xs text-gray-400">
        Посетителей: {count.toLocaleString("ru-RU")}
      </span>
    </div>
  );
}