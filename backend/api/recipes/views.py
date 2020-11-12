from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, status
from rest_framework.parsers import JSONParser
from recipes.serializers import UserSerializer, usersSerializer, recipesSerializer
from .models import users, recipes, user_recipes
from .forms import UsersRegisterForm
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = users.objects.all()
    serializer_class = usersSerializer
    #permission_classes = [permissions.IsAuthenticated]

@api_view(['POST'])
def RegisterPage(request, *args, **kwargs):
    if request.method == 'POST':
        user = User.objects.create_user(username=request.POST.get('username'), password=request.POST.get('password'), email=request.POST.get('email'))
        user.save()
        recipes_user = users.objects.create()
        recipes_user.username = request.POST.get('username')
        recipes_user.password = request.POST.get('password')
        recipes_user.email = request.POST.get('email')
        return JsonResponse({'message': 'Registration succeded', 'username': recipes_user.username, 'email': recipes_user.email})
    else:
        return JsonResponse({'error': 'Registration failed, post method should be used'})

@api_view(['POST'])
def LoginPage(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        try:
            user = authenticate(request, username=username, password=password)
            k = users.objects.get(username=username)
            if user is not None:
                login(request, user)
                return JsonResponse({'login_succeded' : True, 'username': username})
            else:
                return JsonResponse({'login_succeded' : False, 'error': 'Wrong password'})
        except:
            return JsonResponse({'login_succeded' : False, 'error': 'No user with this username'})
    else:
        return JsonResponse({'error': 'Login failed, post method should be used'})




@api_view(['GET'])
def SearchRecipeByIngredients(request, string_ingredients):
    try:
        recipe = recipes.objects.get(string_ingredients=string_ingredients)
    except recipes.DoesNotExist:
        return JsonResponse({'message': 'The recipe does not exist'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        recipes_serializer = recipesSerializer(recipe)
        return JsonResponse(recipes_serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def RecipeID(request, recipe_id):
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

@api_view(['POST'])
def New(request):
    if request.method == 'POST':
        recipe_data = JSONParser().parse(request)
        recipe_serializer = recipesSerializer(data=recipe_data)
        if recipe_serializer.is_valid():
            recipe_serializer.save()
            print('asd')
            return JsonResponse(recipe_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(recipe_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def SearchRecipeByName(request, recipe_name):
    try:
        recipe = recipes.objects.get(recipe_name=recipe_name)
    except recipes.DoesNotExist:
        return JsonResponse({'message': 'The recipe does not exist'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        recipes_serializer = recipesSerializer(recipe)
        return JsonResponse(recipes_serializer.data)



@login_required(login_url='/login')
def UsersPage(request):
    return JsonResponse({'username' : request.user.username, 'email' : request.user.email})

@login_required(login_url='/login')
def UserRecipePage(request):
    if request.method == 'GET':
        user_recipes_id = user_recipes.objects.filter(user_id_id=request.user.id)
        user_recipes_id_list = []

        for recipe_user_id_pairs in user_recipes_id.values_list():
            user_recipes_id_list.append(recipe_user_id_pairs[1])

        user_recipes_query_set = recipes.objects.filter(recipe_id__in=user_recipes_id_list)
        serialized_user_recipes = recipesSerializer(user_recipes_query_set, many=True)

        return JsonResponse(serialized_user_recipes.data, safe=False)


@api_view(['POST'])
@login_required(login_url='/login')
def DeleteUserRecipe(request, id_to_delete):
    if request.method == 'POST':
        user_recipe_to_delete = get_object_or_404(user_recipes, id=id_to_delete)
        user_recipe_to_delete.delete()
        return HttpResponse('Recipe from user database is deleted successfully.')
