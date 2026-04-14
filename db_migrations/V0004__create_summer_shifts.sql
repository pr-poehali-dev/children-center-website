CREATE TABLE t_p29674401_children_center_webs.summer_shifts (
  id integer PRIMARY KEY,
  theme varchar(100) NOT NULL,
  dates varchar(30) NOT NULL,
  age varchar(20) NOT NULL,
  total_spots integer NOT NULL DEFAULT 15,
  spots_left integer NOT NULL DEFAULT 15,
  updated_at timestamp DEFAULT now()
);

INSERT INTO t_p29674401_children_center_webs.summer_shifts (id, theme, dates, age, total_spots, spots_left) VALUES
  (1, 'Сундук со сказками',       '01.06 – 12.06', '7–9 лет',   15, 15),
  (2, 'Вкусные открытия',         '15.06 – 26.06', '7–12 лет',  15, 15),
  (3, 'Мульти-драйв',             '29.06 – 10.07', '7–10 лет',  15, 15),
  (4, 'Поколение Альфа',          '13.07 – 24.07', '10–14 лет', 15, 15),
  (5, 'Есть ли жизнь на Марсе?', '27.07 – 07.08', '10–14 лет', 15, 15),
  (6, 'Кругосветка',              '10.08 – 21.08', '7–12 лет',  15, 15),
  (7, 'Лаборатория чудес',        '24.08 – 28.08', '7–12 лет',  15, 15);
