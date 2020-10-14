from string import Template
from flask import (
	Blueprint, jsonify
)
from .auth import token_required
from .db import get_db
#from flask_cors import cross_origin

bp = Blueprint('api', __name__, url_prefix='/v1')

@bp.route('/recipes/<query>')
#@cross_origin()
def get(query):
	db = get_db()
	results = db.execute(
        Template("SELECT * FROM recipe WHERE name LIKE '%${query}%'").substitute(query=query)
    ).fetchall()

	return jsonify({"results": [tuple(row) for row in results]})

@bp.route('/protected')
@token_required
def protected():
	return jsonify({'message': 'This is protected'})
