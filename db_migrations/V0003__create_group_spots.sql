CREATE TABLE IF NOT EXISTS t_p29674401_children_center_webs.group_spots (
  id SERIAL PRIMARY KEY,
  group_name VARCHAR(100) NOT NULL,
  spots_left INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p29674401_children_center_webs.group_spots (group_name, spots_left) VALUES
  ('Ясельная группа', 2),
  ('Старшая группа', 3),
  ('Группа продлённого дня', 5)
ON CONFLICT DO NOTHING;
