-- Needed to avoid sql init error during testing
SET REFERENTIAL_INTEGRITY FALSE;
TRUNCATE TABLE application_user;
TRUNCATE TABLE inventory;
TRUNCATE TABLE category;
TRUNCATE TABLE location;
TRUNCATE TABLE item;
TRUNCATE TABLE item_model;
TRUNCATE TABLE movement;
TRUNCATE TABLE item_category;
TRUNCATE TABLE shared_inventories;
SET REFERENTIAL_INTEGRITY TRUE;

-- User
INSERT INTO application_user(id, created_at, updated_at, email, first_name, last_name, password, username)
VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'test@gmail.com', 'Paul', 'Test',
        '$argon2id$v=19$m=15360,t=2,p=1$FTX71TkODBI88XrntOaqkpMNjo8lILBeKO100oEL1I0$kLTO4aRn5ricGpV6CGPyq1YBWcReAXGTmrTi50STGHRdVx0L3OfiRiA9oMLAMHTrWwxgFKPu+5q8FXboOiC2NQ',
        'ptest'),
       (2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'james@gmail.com', 'not james', 'daniel',
        '$argon2id$v=19$m=15360,t=2,p=1$FTX71TkODBI88XrntOaqkpMNjo8lILBeKO100oEL1I0$kLTO4aRn5ricGpV6CGPyq1YBWcReAXGTmrTi50STGHRdVx0L3OfiRiA9oMLAMHTrWwxgFKPu+5q8FXboOiC2NQ',
        'notjames');

-- Inventory
INSERT INTO inventory(id, created_at, updated_at, name, owner_id)
VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'test inventory', 1);

-- Categories
INSERT INTO category (id, created_at, updated_at, name, inventory_id, parent_id)
VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'cat 1', 1, NULL),
       (2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'cat 2', 1, 1);

-- Locations
INSERT INTO location(id, created_at, updated_at, description, name, inventory_id, parent_id)
VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'location description', 'location name', 1, NULL),
       (2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'an other description', 'another name', 1, 1);

-- ItemModel
INSERT INTO item_model(id, created_at, updated_at, description, name, inventory_id)
VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'description', 'name', 1);

INSERT INTO item(id, created_at, updated_at, model_id)
VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

-- Movements
INSERT INTO movement (id, created_at, updated_at, type, item_id, location_id)
VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'IN', 1, 1);

-- item-model and categories
INSERT INTO item_category(item_id, category_id)
VALUES (1, 1);

ALTER TABLE category
    ALTER COLUMN id RESTART WITH (SELECT MAX(id) + 1 FROM CATEGORY);
ALTER TABLE inventory
    ALTER COLUMN id RESTART WITH (SELECT MAX(id) + 1 FROM inventory);
ALTER TABLE location
    ALTER COLUMN id RESTART WITH (SELECT MAX(id) + 1 FROM LOCATION);
ALTER TABLE application_user
    ALTER COLUMN id RESTART WITH (SELECT MAX(id) + 1 FROM application_user);
ALTER TABLE item_model
    ALTER COLUMN id RESTART WITH (SELECT MAX(id) + 1 FROM item_model);
ALTER TABLE item
    ALTER COLUMN id RESTART WITH (SELECT MAX(id) + 1 FROM item);
ALTER TABLE movement
    ALTER COLUMN id RESTART WITH (SELECT MAX(id) + 1 FROM movement);
