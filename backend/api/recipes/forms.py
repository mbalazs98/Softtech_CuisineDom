from django.forms import ModelForm
from recipes.models import users
from django import forms

class UsersRegisterForm(ModelForm):
    class Meta:
        model = users
        fields = ['username', 'password', 'email']
        widgets = {
            'password' : forms.PasswordInput()
        }