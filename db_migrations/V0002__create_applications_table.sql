CREATE TABLE t_p29674401_children_center_webs.applications (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    messenger VARCHAR(20) NOT NULL DEFAULT 'telegram',
    service VARCHAR(255),
    message TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'new',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);