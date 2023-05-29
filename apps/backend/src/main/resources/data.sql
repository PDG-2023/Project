-- User
INSERT INTO public.application_user(id, created_at, updated_at, email, first_name, last_name, password, username)
VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'test@gmail.com', 'Paul', 'Test', '$argon2id$v=19$m=15360,t=2,p=1$FTX71TkODBI88XrntOaqkpMNjo8lILBeKO100oEL1I0$kLTO4aRn5ricGpV6CGPyq1YBWcReAXGTmrTi50STGHRdVx0L3OfiRiA9oMLAMHTrWwxgFKPu+5q8FXboOiC2NQ', 'ptest')
ON CONFLICT DO NOTHING;

-- Inventory
INSERT INTO public.inventory(id, created_at, updated_at, name, owner_id)
VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'test inventory', 1)
ON CONFLICT DO NOTHING;

-- Categories
INSERT INTO public.category (id, created_at, updated_at, name, inventory_id, parent_id)
VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'cat 1', 1, NULL),
       (2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'cat 2', 1, 1)
ON CONFLICT DO NOTHING;

-- Locations
INSERT INTO public.location(id, created_at, updated_at, description, name, inventory_id, parent_id)
VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'location description', 'location name', 1, NULL),
       (2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'an other description', 'another name', 1, 1)
ON CONFLICT DO NOTHING;

-- needed to set the sequences to start correctly
SELECT SETVAL('inventory_id_seq', (SELECT MAX(id) + 1 FROM public.inventory));
SELECT SETVAL('application_user_id_seq', (SELECT MAX(id) + 1 FROM public.application_user));
SELECT SETVAL('category_id_seq', (SELECT MAX(id) + 1 FROM public.category));
SELECT SETVAL('location_id_seq', (SELECT MAX(id) + 1 FROM public.location));