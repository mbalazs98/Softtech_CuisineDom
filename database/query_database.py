import sqlite3
import json
import csv
import ast

def query_db():

    conn = sqlite3.connect('cuisinedom.sqlite3')
    c = conn.cursor()

    c.execute("""SELECT * FROM recipe_cuisines""")

    query = c.fetchall() 
    print(query)

    #query_dict = {q[1]: q[0] for q in query}
    #print(query_dict)


def test_recipes():
    conn = sqlite3.connect('cuisinedom.sqlite3')
    c = conn.cursor()

    c.execute("""SELECT * FROM cuisines""")

    query = c.fetchall() 
    print(query)

    query_dict = {q[1]: q[0] for q in query}
    print(query_dict)
    
    c.execute("""SELECT * FROM tags""")

    query = c.fetchall() 
    #print(query)

    tag_dict = {q[1]: q[0] for q in query}
    #print(tag_dict)
    
    c.execute("""SELECT * FROM ingredients""")

    query = c.fetchall() 
    #print(query)

    ingred_dict = {q[1]: q[0] for q in query}
    #print(ingred_dict)
    
    with open('data/ingredients.json') as f:
        data = json.load(f)
    ingredients = data['ingredients']
    curr_id = 1
    
    recipe_cuisines = []
    recipe_ingredients = []
    recipe_tags = []
    recipes = []
    with open('data/recipes_82k.csv', 'r', encoding='utf-8') as file:
        reader = csv.reader(file)
        print(next(reader))
        row = next(reader)
        cu = ast.literal_eval(row[2])
        for i in cu:
            #print(i, query_dict[i])
            recipe_cuisines.append((curr_id, query_dict[i]))
        
        if len(row[8]) > 0:
            ta = list(map(str.strip, row[8].split(',')))
            for i in ta:
                recipe_tags.append((curr_id, tag_dict[i]))
                
        ingred = ast.literal_eval(row[4]) 
        ingred = [i for i in ingredients if any([i in one_ingred for one_ingred in ingred]) ]
        for i in ingred:
            recipe_ingredients.append((curr_id, ingred_dict[i]))
        
        #for row in reader:
            #recipes.append(row[6])
            #print(type(row[6]), row[6])
            #print(type(row[1]), row[1])
            #print(type(row[3]), row[3])
            #print(type(row[4]), row[4])
            #print(type(row[5]), row[5])
            #print(type(row[7]), row[7])
            
    #print(len(recipes))
    #print(len(set(recipes)))
    print(recipe_cuisines)
    print(recipe_tags)
    print(recipe_ingredients)
    """
    for row in reader:
        print(row[8])
        if len(row[8]) > 0:
            t = list(map(str.strip, row[8].split(',')))
            tags += t
    """

def test_rec_db():       
    conn = sqlite3.connect('cuisinedom.sqlite3')
    c = conn.cursor()

    c.execute("""SELECT recipe_name FROM recipes""")

    query = c.fetchall()[:3] 
    print(query)
    
#query_db()