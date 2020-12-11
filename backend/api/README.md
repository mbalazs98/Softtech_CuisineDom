# CuisineDom Backend  

![Backend Django Build](https://github.com/mbalazs98/Softtech_CuisineDom/workflows/CuisineDom%20Backend/badge.svg)


## Incase of migration errors:
```
$ python manage.py makemigrations recipes
$ python manage.py migrate
```
Make sure to delete db.sqlite3, migrations folder, and pycache folder  

## Running with populated database:
Replace the db.sqlite3 file with the database found in database/db.zip.
