from recipes.models import users
from django.contrib.auth.backends import BaseBackend

class EmailOrUsernameAuthBackend(BaseBackend):
    """
    This is a ModelBacked that allows authentication with either a username or an email address.
    """
    def authenticate(self, request, username=None, password=None):
        try:
            if '@' in username:
                user = users.objects.get(email=username)
            else:
                user = users.objects.get(username=username)
            if user.check_password(password):
                return user
        except:
            return None

    def get_user(self, user_id):
        try:
            return users.objects.get(id=user_id)
        except:
            return None