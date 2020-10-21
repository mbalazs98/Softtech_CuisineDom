import sqlite3
import json

conn = sqlite3.connect('cuisinedom.db')
c = conn.cursor()

c.execute("""SELECT * FROM cuisines""")

query = c.fetchall() 
print(query)

query_dict = {q[1]: q[0] for q in query}
print(query_dict)