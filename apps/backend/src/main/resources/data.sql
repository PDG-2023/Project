-- User
INSERT INTO public.application_user(id, created_at, updated_at, email, first_name, last_name, password, username)
VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'test@gmail.com', 'Paul', 'Test', '1234', 'ptest')
ON CONFLICT DO NOTHING;

-- Inventory
INSERT INTO public.inventory(id, created_at, updated_at, name, owner_id)
VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'test inventory', 1)
ON CONFLICT DO NOTHING;

-- Categories
INSERT INTO public.category (id, created_at, updated_at, name, inventory_id, parent_id)
VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'cat 1', 1, null),
       (2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'cat 2', 1, 1)
ON CONFLICT DO NOTHING;

SELECT setval('inventory_id_seq', (SELECT MAX(id) + 1 FROM public.inventory));
SELECT setval('application_user_id_seq', (SELECT MAX(id) + 1 FROM public.application_user));
SELECT setval('category_id_seq', (SELECT MAX(id) + 1 FROM public.category));