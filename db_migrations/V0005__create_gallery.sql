CREATE TABLE t_p29674401_children_center_webs.gallery (
  id serial PRIMARY KEY,
  url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp DEFAULT now()
);

INSERT INTO t_p29674401_children_center_webs.gallery (url, sort_order) VALUES
  ('https://cdn.poehali.dev/files/b7e139c8-93e0-4bbb-b9d3-83e343cd59db.png', 1),
  ('https://cdn.poehali.dev/files/bb83b1db-3a9f-4e90-ab10-e6980a71620a.png', 2),
  ('https://cdn.poehali.dev/files/3e522020-93c1-4155-ac37-1067785b8111.png', 3),
  ('https://cdn.poehali.dev/files/4b6ccfe2-5c36-4d8f-86a3-2d2d0ba4a2df.png', 4);
