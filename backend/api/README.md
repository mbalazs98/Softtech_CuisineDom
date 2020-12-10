# CuisineDom Backend  

[![Build Status](https://github.com/mbalazs98/Softtech_CuisineDom.svg?branch=master)](https://travis-ci.org/mbalazs98/Softtech_CuisineDom)


## Incase of migration errors:
```
$ python manage.py makemigrations recipes
$ python manage.py migrate
```
Make sure to delete db.sqlite3, migrations folder, and pycache folder  

## Running with populated database:
Replace the db.sqlite3 file with the database found in database/db.zip.