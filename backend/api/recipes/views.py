from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from recipes.serializers import recipesSerializer, usersSerializer
from .models import users, recipes
from .forms import UsersRegisterForm
from django.contrib.auth import authenticate, login

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
            user = User.objects.create_user(username=request.POST.get('username'), password=request.POST.get('password'), email=request.POST.get('email'))
            user.save()
    return render(request, "register.html", context)

def LoginPage(request):
    context = {"x" : ""}

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        try:
            user = authenticate(request, username=username, password=password)
            k = users.objects.get(username=username)
            if user is not None:
                login(request, user)
                context["x"] = "Validation successful " + username + " logged in."
            else:
                context["x"] = "Wrong password."
        except:
            context["x"] = 'No user with this username'


    return render(request, "login.html", context)

def SearchRecipeByIngredients(request):
    if request.method == 'GET':
        recipe = recipes.objects.all()
        string_ingredient = request.query_params.get('string_ingredients', None)
        if string_ingredient is not None:
            recipe = recipe.filter(string_ingredient__icontains=string_ingredient)
        recipes_serializer = recipesSerializer(recipe, many=True)
        return JsonResponse(recipes_serializer.data, safe=False)

def RecipeID(request,recipe_id):
    try: 
        recipe = recipes.objects.get(recipe_id=recipe_id) 
    except recipes.DoesNotExist: 
        return JsonResponse({'message': 'The recipe does not exist'}, status=status.HTTP_404_NOT_FOUND) 
    if request.method == 'GET':
        recipes_serializer = recipesSerializer(recipe)
        return JsonResponse(recipes_serializer.data)
    elif request.method == 'PUT':
        recipe_data = JSONParser().parse(request)
        recipes_serializer = recipesSerializer(recipe, data=recipe_data)
        if recipes_serializer.is_valid():
            recipes_serializer.save()
            return JsonResponse(recipes_serializer.data)
        return JsonResponse(recipes_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        recipe.delete()
        return JsonResponse({'message': 'Recipe was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
        
def New(request):
    if request.method == 'POST':
        recipe_data = JSONParser().parse(request)
        recipe_serializer = recipesSerializer(data=recipe_data)
        if recipe_serializer.is_valid():
            recipe_serializer.save()
            return JsonResponse(recipe_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(recipe_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
def SearchRecipeByName(request,recipe_name):
    try: 
        recipe = recipes.objects.get(recipe_name=recipe_name) 
    except recipes.DoesNotExist: 
        return JsonResponse({'message': 'The recipe does not exist'}, status=status.HTTP_404_NOT_FOUND) 
    if request.method == 'GET':
        recipes_serializer = recipesSerializer(recipe)
        return JsonResponse(recipes_serializer.data)