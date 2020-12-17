from recipes.models import users

class EmailOrUsernameAuthBackend(object):
    """
    This is a ModelBacked that allows authentication with either a username or an email address.

    """
    def authenticate(self, username=None, password=None):
        print("Happening")
        try:
            if '@' in username:
                user = users.objects.get(email=username)
            else:
                user = users.objects.get(username=username)
            if user.check_password(password):
                return user
        except:
            return None