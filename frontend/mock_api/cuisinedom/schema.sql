DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS recipe;

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE recipe (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE ingredient (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	description TEXT
);

CREATE TABLE recipe_ingredient (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	recipe_id INTEGER NOT NULL,
	ingredient_id INTEGER NOT NULL,
	quantity INTEGER NOT NULL,
	FOREIGN KEY (recipe_id) REFERENCES recipe (id)	
	FOREIGN KEY (ingredient_id) REFERENCES ingredient (id)
);
