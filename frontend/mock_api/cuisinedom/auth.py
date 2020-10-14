import jwt
import functools, datetime
from flask import (
	Blueprint, flash, g, redirect, request, url_for, make_response, jsonify, current_app
)
from cuisinedom.db import get_db

bp = Blueprint('auth', __name__, url_prefix='/auth')

def token_required(f):
	@functools.wraps(f)
	def decorated(*args, **kwargs):
		token = request.args.get('token')
		if not token:
			return jsonify({'message': 'Token missing!'})
		try:
			data = jwt.decode(token, current_app.config['SECRET_KEY'])
		except:
			return jsonify({'message': 'Token invalid!'})
		return f(*args, **kwargs)
	return decorated

@bp.route('/login')
def login():
	auth = request.authorization

	if auth and auth.password == 'password':
		token = jwt.encode({'user': auth.username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, current_app.config['SECRET_KEY'])
		return jsonify({'token': token.decode('utf8')})
	return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})
