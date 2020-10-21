import sqlite3
import json
import csv
import ast

"""
    DO NOT RUN AGAIN
"""

def main():
    conn = sqlite3.connect('cuisinedom.sqlite3')
    c = conn.cursor()

    """
    # Insert cuisines
    with open('data/cuisines.json') as f:
        data = json.load(f)

    records = [(cuisine, ) for cuisine in data['cuisines']]
    #print(records)

    #insert multiple records in a single query
    c.executemany('INSERT INTO cuisines(cuisine_name) VALUES(?);',records);
    
    print('We have inserted', c.rowcount, 'records to the table.')
    """ 
    
    """
    # Insert ingredients
    with open('data/ingredients.json') as f:
        data = json.load(f)
    records = [(ingredient, ) for ingredient in data['ingredients']]
    c.executemany('INSERT INTO ingredients(ingredient_name) VALUES(?);',records);
    print('We have inserted', c.rowcount, 'records to the table.')
    """ 
    
    """
    # Insert tags
    with open('data/tags.json') as f:
        data = json.load(f)
    records = [(tag, ) for tag in data['tags']]
    c.executemany('INSERT INTO tags(tag_name) VALUES(?);',records);
    print('We have inserted', c.rowcount, 'records to the table.')
    """ 
    
    """
    # Insert recipes
    
    #    recipe_id INTEGER PRIMARY KEY,
    #    recipe_name text UNIQUE NOT NULL,
    #    cooking_method text NOT NULL,
    #    image text,
    #    string_ingredients text NOT NULL,
    #    prep_time text,
    #    serving text
    records = []
    with open('data/recipes_82k.csv', 'r', encoding='utf-8') as file:
        reader = csv.reader(file)
        print(next(reader))
        for row in reader:
            records.append((row[6], row[1], row[3], row[4], row[5], row[7]))
    
    c.executemany('INSERT INTO recipes(recipe_name, cooking_method, image, string_ingredients, prep_time, serving) VALUES(?, ?, ?, ?, ?, ?);',records);
    print('We have inserted', c.rowcount, 'records to the table.')
    """ 
    
    # Inserting recipe cuisines, recipe ingredients, recipe tags
    c.execute("""SELECT * FROM cuisines""")
    query = c.fetchall() 
    query_dict = {q[1]: q[0] for q in query}
    
    c.execute("""SELECT * FROM tags""")
    query = c.fetchall() 
    tag_dict = {q[1]: q[0] for q in query}
    
    c.execute("""SELECT * FROM ingredients""")
    query = c.fetchall() 
    ingred_dict = {q[1]: q[0] for q in query}
    
    with open('data/ingredients.json') as f:
        data = json.load(f)
    ingredients = data['ingredients']
    curr_id = 1
    
    print("Starting insertions")
    #recipes = []
    with open('data/recipes_82k.csv', 'r', encoding='utf-8') as file:
        reader = csv.reader(file)
        print(next(reader))
        #row = next(reader)
        for row in reader:
            recipe_cuisines = []
            recipe_ingredients = []
            recipe_tags = []
            
            if len(row[2]) > 0:
                cu = ast.literal_eval(row[2])
                for i in cu:
                    #print(i, query_dict[i])
                    recipe_cuisines.append((curr_id, query_dict[i]))
            
            if len(row[8]) > 0:
                ta = list(map(str.strip, row[8].split(',')))
                for i in ta:
                    recipe_tags.append((curr_id, tag_dict[i]))
                    
            if len(row[4]) > 0:
                ingred = ast.literal_eval(row[4]) 
                ingred = [i for i in ingredients if any([i in one_ingred for one_ingred in ingred]) ]
                for i in ingred:
                    recipe_ingredients.append((curr_id, ingred_dict[i]))
                    
            curr_id += 1
            
            c.executemany('INSERT INTO recipe_cuisines(recipe_id, cuisine_id) VALUES(?, ?);', recipe_cuisines);
            c.executemany('INSERT INTO recipe_tags(recipe_id, tag_id) VALUES(?, ?);', recipe_cuisines);
            c.executemany('INSERT INTO recipe_ingredients(recipe_id, ingredient_id) VALUES(?, ?);', recipe_ingredients);
            
    
    print("Commiting...")
    #commit the changes to db			
    conn.commit()
    #close the connection
    conn.close()

if __name__ == '__main__':
    main()