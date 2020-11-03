from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from recipes.serializers import UserSerializer, usersSerializer
from .models import users
from .forms import UsersRegisterForm
from django.contrib.auth import authenticate

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

def LoginPage(request):
    context = {"x" : "Nothing"}

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        try:
            k = users.objects.get(username=username)
            if password == k.password:
                context["x"] = username
            else:
                context["x"] = 'invalid paswword'
        except:
            context["x"] = 'No user with this username'


    return render(request, "login.html", context)
