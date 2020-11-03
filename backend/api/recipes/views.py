from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from recipes.serializers import UserSerializer, usersSerializer
from .models import users
from .forms import UsersRegisterForm

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = users.objects.all()
    serializer_class = usersSerializer
    #permission_classes = [permissions.IsAuthenticated]

def RegisterPage(request, *args, **kwargs):
    form = UsersRegisterForm()
    context = {'form' : form}

    if request.method == 'POST':
        form = UsersRegisterForm(request.POST)
        if form.is_valid():
            form.save()

    return render(request, "register.html", context)

