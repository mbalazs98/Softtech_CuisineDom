import sqlite3
from sqlite3 import Error

def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)

    return conn
    
def create_table(conn, create_table_sql):
    """ create a table from the create_table_sql statement
    :param conn: Connection object
    :param create_table_sql: a CREATE TABLE statement
    :return:
    """
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)

def main():
    database = r"cuisinedom.sqlite3"

    sql_create_tags_table = """ CREATE TABLE IF NOT EXISTS tags(
                                   tag_id INTEGER PRIMARY KEY,
                                   tag_name text UNIQUE NOT NULL
                                ); """

    sql_create_ingredients_table = """CREATE TABLE IF NOT EXISTS ingredients(
                                    ingredient_id INTEGER PRIMARY KEY,
                                    ingredient_name text UNIQUE NOT NULL
                                );"""
                                
    sql_create_cuisines_table = """CREATE TABLE IF NOT EXISTS cuisines(
                                    cuisine_id INTEGER PRIMARY KEY,
                                    cuisine_name text UNIQUE NOT NULL
                                );"""
    sql_create_users_table = """CREATE TABLE IF NOT EXISTS users(
                                    user_id INTEGER PRIMARY KEY,
                                    username text UNIQUE NOT NULL,
                                    password text NOT NULL,
                                    email text UNIQUE NOT NULL
                                );"""
    sql_create_recipes_table = """CREATE TABLE IF NOT EXISTS recipes(
                                    recipe_id INTEGER PRIMARY KEY,
                                    recipe_name text UNIQUE NOT NULL,
                                    cooking_method text NOT NULL,
                                    image text,
                                    string_ingredients text NOT NULL,
                                    prep_time INTEGER,
                                    serving INTEGER
                                );"""
    sql_create_recipe_cuisines_table = """CREATE TABLE IF NOT EXISTS recipe_cuisines(
                                    recipe_id INTEGER NOT NULL,
                                    cuisine_id INTEGER NOT NULL,
                                    FOREIGN KEY (recipe_id)
                                        REFERENCES recipes (recipe_id)
                                        ON UPDATE CASCADE ON DELETE CASCADE,
                                    FOREIGN KEY (cuisine_id)
                                        REFERENCES cuisines (cuisine_id)
                                        ON UPDATE CASCADE ON DELETE CASCADE
                                );"""
    sql_create_recipe_tags_table = """CREATE TABLE IF NOT EXISTS recipe_tags(
                                    recipe_id INTEGER NOT NULL,
                                    tag_id INTEGER NOT NULL,
                                    PRIMARY KEY (recipe_id, tag_id),
                                    FOREIGN KEY (recipe_id)
                                        REFERENCES recipes (recipe_id)
                                        ON UPDATE CASCADE ON DELETE CASCADE,
                                    FOREIGN KEY (tag_id)
                                        REFERENCES tags (tag_id)
                                        ON UPDATE CASCADE ON DELETE CASCADE
                                );"""
    sql_create_recipe_ingredients_table = """CREATE TABLE IF NOT EXISTS recipe_ingredients(
                                    recipe_id INTEGER NOT NULL,
                                    ingredient_id INTEGER NOT NULL,
                                    PRIMARY KEY (recipe_id, ingredient_id),
                                    FOREIGN KEY (recipe_id)
                                        REFERENCES recipes (recipe_id)
                                        ON UPDATE CASCADE ON DELETE CASCADE,
                                    FOREIGN KEY (ingredient_id)
                                        REFERENCES ingredients (ingredient_id)
                                        ON UPDATE CASCADE ON DELETE CASCADE
                                );"""
    sql_create_user_recipes_table = """CREATE TABLE IF NOT EXISTS user_recipes(
                                    recipe_id INTEGER NOT NULL,
                                    user_id INTEGER NOT NULL,
                                    PRIMARY KEY (recipe_id, user_id),
                                    FOREIGN KEY (recipe_id)
                                        REFERENCES recipes (recipe_id)
                                        ON UPDATE CASCADE ON DELETE CASCADE,
                                    FOREIGN KEY (user_id)
                                        REFERENCES users (user_id)
                                        ON UPDATE CASCADE ON DELETE CASCADE
                                );"""

    # create a database connection
    conn = create_connection(database)

    # create tables
    if conn is not None:
        # create projects table
        create_table(conn, sql_create_tags_table)

        # create tasks table
        create_table(conn, sql_create_ingredients_table)
        create_table(conn, sql_create_cuisines_table)
        create_table(conn, sql_create_users_table)
        create_table(conn, sql_create_recipes_table)
        create_table(conn, sql_create_recipe_cuisines_table)
        create_table(conn, sql_create_recipe_tags_table)
        create_table(conn, sql_create_recipe_ingredients_table)
        create_table(conn, sql_create_user_recipes_table)
    else:
        print("Error! cannot create the database connection.")
        
if __name__ == '__main__':
    main()
    
    
"""
CREATE TABLE IF NOT EXISTS tags(
   tag_id serial PRIMARY KEY,
   tag_name VARCHAR (255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS ingredients(
	ingredient_id serial PRIMARY KEY,
	ingredient_name VARCHAR (255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS cuisines(
	cuisine_id serial PRIMARY KEY,
	cuisine_name VARCHAR (255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS users(
	user_id serial PRIMARY KEY,
	username VARCHAR (50) UNIQUE NOT NULL,
	password VARCHAR (50) NOT NULL,
	email VARCHAR (255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS recipes(
	recipe_id serial PRIMARY KEY,
	recipe_name VARCHAR (255) UNIQUE NOT NULL,
	cooking_method VARCHAR NOT NULL,
	image VARCHAR,
	string_ingredients VARCHAR NOT NULL,
	prep_time INT,
	serving INT
);

CREATE TABLE IF NOT EXISTS recipe_cuisines(
	recipe_id INT NOT NULL,
	cuisine_id INT NOT NULL,
	FOREIGN KEY (recipe_id)
		REFERENCES recipes (recipe_id)
		ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (cuisine_id)
		REFERENCES cuisines (cuisine_id)
		ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS recipe_tags(
	recipe_id INT NOT NULL,
	tag_id INT NOT NULL,
	PRIMARY KEY (recipe_id, tag_id),
	FOREIGN KEY (recipe_id)
		REFERENCES recipes (recipe_id)
		ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (tag_id)
		REFERENCES tags (tag_id)
		ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS recipe_ingredients(
	recipe_id INT NOT NULL,
	ingredient_id INT NOT NULL,
	PRIMARY KEY (recipe_id, ingredient_id),
	FOREIGN KEY (recipe_id)
		REFERENCES recipes (recipe_id)
		ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (ingredient_id)
		REFERENCES ingredients (ingredient_id)
		ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_recipes(
	recipe_id INT NOT NULL,
	user_id INT NOT NULL,
	PRIMARY KEY (recipe_id, user_id),
	FOREIGN KEY (recipe_id)
		REFERENCES recipes (recipe_id)
		ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (user_id)
		REFERENCES users (user_id)
		ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tasks (
                                    id integer PRIMARY KEY,
                                    name text NOT NULL,
                                    priority integer,
                                    status_id integer NOT NULL,
                                    project_id integer NOT NULL,
                                    begin_date text NOT NULL,
                                    end_date text NOT NULL,
                                    FOREIGN KEY (project_id) REFERENCES projects (id)
                                );
"""