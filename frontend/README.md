## Running the mock api to test the workflow:
```
$ pip install pipenv
$ cd frontend/mock_api
$ pipenv shell 
$ pipenv install flask 
$ set FLASK_ENV=development 
$ set FLASK_APP=cuisinedom 
$ flask init-db
$ flask fill-db
$ flask run  
```
## Running the frontend code after installing expo:
```
$ cd frontend/
$ expo start
```
