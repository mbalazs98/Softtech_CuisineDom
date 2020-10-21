import sqlite3
import json

"""
    DO NOT RUN AGAIN
"""

def main():
    conn = sqlite3.connect('cuisinedom.sqlite3')
    c = conn.cursor()

     
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
    
    
    #commit the changes to db			
    conn.commit()
    #close the connection
    conn.close()

if __name__ == '__main__':
    main()