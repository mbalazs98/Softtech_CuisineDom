-- Database: cuisinedom

-- DROP DATABASE cuisinedom;

--CREATE DATABASE cuisinedom
--    WITH 
--    OWNER = soft_user
--    ENCODING = 'UTF8'
--    LC_COLLATE = 'Hungarian_Hungary.1250'
--    LC_CTYPE = 'Hungarian_Hungary.1250'
--    TABLESPACE = pg_default
--    CONNECTION LIMIT = -1;
	
CREATE TABLE IF NOT EXISTS tags(
	tag_id INTEGER PRIMARY KEY,
	tag_name text UNIQUE NOT NULL
); 

CREATE TABLE IF NOT EXISTS ingredients(
	ingredient_id INTEGER PRIMARY KEY,
	ingredient_name text UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS cuisines(
	cuisine_id INTEGER PRIMARY KEY,
	cuisine_name text UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS users(
	user_id INTEGER PRIMARY KEY,
	username text UNIQUE NOT NULL,
	password text NOT NULL,
	email text UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS recipes(
	recipe_id INTEGER PRIMARY KEY,
	recipe_name text UNIQUE NOT NULL,
	cooking_method text NOT NULL,
	image text,
	string_ingredients text NOT NULL,
	prep_time INTEGER,
	serving INTEGER
);
CREATE TABLE IF NOT EXISTS recipe_cuisines(
	recipe_id INTEGER NOT NULL,
	cuisine_id INTEGER NOT NULL,
	FOREIGN KEY (recipe_id)
		REFERENCES recipes (recipe_id)
		ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (cuisine_id)
		REFERENCES cuisines (cuisine_id)
		ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS recipe_tags(
	recipe_id INTEGER NOT NULL,
	tag_id INTEGER NOT NULL,
	PRIMARY KEY (recipe_id, tag_id),
	FOREIGN KEY (recipe_id)
		REFERENCES recipes (recipe_id)
		ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (tag_id)
		REFERENCES tags (tag_id)
		ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS recipe_ingredients(
	recipe_id INTEGER NOT NULL,
	ingredient_id INTEGER NOT NULL,
	PRIMARY KEY (recipe_id, ingredient_id),
	FOREIGN KEY (recipe_id)
		REFERENCES recipes (recipe_id)
		ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (ingredient_id)
		REFERENCES ingredients (ingredient_id)
		ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS user_recipes(
	recipe_id INTEGER NOT NULL,
	user_id INTEGER NOT NULL,
	PRIMARY KEY (recipe_id, user_id),
	FOREIGN KEY (recipe_id)
		REFERENCES recipes (recipe_id)
		ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (user_id)
		REFERENCES users (user_id)
		ON UPDATE CASCADE ON DELETE CASCADE
);