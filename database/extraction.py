import csv 
import ast
import json
  
#"data/recipes_82k.csv"

import numpy as np

"""
np_load_old = np.load
np.load = lambda *a,**k: np_load_old(*a, allow_pickle=True, **k)
with np.load('data/simplified-recipes-1M.npz') as data:
    recipes = data['recipes']
    ingredients = data['ingredients']
"""

# Save ingredients
"""
ingredients = [i for i in ingredients if len(i)>2]
print(type(ingredients))
data = {}
data['ingredients'] = ingredients
with open('ingredients.json', 'w') as outfile:
    json.dump(data, outfile)
"""

tags = []
with open('data/recipes_82k.csv', 'r', encoding='utf-8') as file:
    reader = csv.reader(file)
    print(next(reader))
    for row in reader:
        print(row[8])
        if len(row[8]) > 0:
            t = list(map(str.strip, row[8].split(',')))
            tags += t
        #print(t)
    #print(type(t))
    #t = ast.literal_eval(row[4]) 
    #ingred = [i for i in ingredients if i in t[3]]
    #print(t[3])
    #print(ingred)
print(len(tags))
print(set(tags))
print(len(set(tags)))
data = {}
data['tags'] = list(set(tags))
with open('tags.json', 'w') as outfile:
    json.dump(data, outfile)

    
    
    
#https://www.kaggle.com/snehallokesh31096/recipe
#https://www.postgresqltutorial.com/postgresql-python/
    
    
