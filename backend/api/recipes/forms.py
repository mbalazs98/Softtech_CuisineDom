from django.forms import ModelForm
from recipes.models import users

class UsersRegisterForm(ModelForm):
    class Meta:
        model = users
        fields = ['username', 'password', 'email']