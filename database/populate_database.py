import sqlite3
import json

"""
    DO NOT RUN AGAIN
"""
conn = sqlite3.connect('cuisinedom.db')
c = conn.cursor()

with open('data/cuisines.json') as f:
    data = json.load(f)
#print(data)

#records or rows in a list
records = [(cuisine, ) for cuisine in data['cuisines']]
#print(records)

#insert multiple records in a single query
c.executemany('INSERT INTO cuisines(cuisine_name) VALUES(?);',records);

print('We have inserted', c.rowcount, 'records to the table.')

#commit the changes to db			
conn.commit()
#close the connection
conn.close()