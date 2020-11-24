import json
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, status
from rest_framework.parsers import JSONParser
from recipes.serializers import usersSerializer, recipesSerializer
from .models import users, recipes, user_recipes
from .forms import UsersRegisterForm
from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from pycdi import Inject, Producer
import string


@Producer(_context='login_failed')
def get_login_failed():
    return 'login failed'


@Producer(_context='registration_failed')
def get_registration_failed():
    return 'registration failed'


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = users.objects.all()
    serializer_class = usersSerializer
    # permission_classes = [permissions.IsAuthenticated]


@Inject(failed_register='registration_failed')
@api_view(['POST'])
def RegisterPage(request, failed_register: str, *args, **kwargs):
    if request.method == 'POST':
        if request.body:
            body = json.loads(request.body)
        else:
            return JsonResponse({'message': 'Error! Expected POST body, found None.'},
                                status=status.HTTP_400_BAD_REQUEST)
        if body.get('username') == '':
            return JsonResponse({'message': failed_register, 'error': 'no username was given'},
                                status=status.HTTP_400_BAD_REQUEST)
        if body.get('password') == '':
            return JsonResponse({'message': failed_register, 'error': 'no password was given'},
                                status=status.HTTP_400_BAD_REQUEST)
        if body.get('email') == '':
            return JsonResponse({'message': failed_register, 'error': 'no email address was given'},
                                status=status.HTTP_400_BAD_REQUEST)

        try:
            recipes_user = users.objects.create_user(username=body.get('username'), password=body.get('password'), email=body.get('email'))
            recipes_user.save()
        except Exception as e:
            return JsonResponse(
                {'message': 'Registration failed', 'error': 'An account with the same username/email already exists.'},
                status=status.HTTP_400_BAD_REQUEST)
        token = Token.objects.create(user=recipes_user)
        return JsonResponse({'message': 'Registration succeeded', 'username': recipes_user.username
                                , 'email': recipes_user.email, "token": token.key}, status=status.HTTP_201_CREATED)
    else:
        return JsonResponse({'message': 'registration failed', 'error': 'post method should be used'},
                            status=status.HTTP_400_BAD_REQUEST)


@Inject(failed_login='login_failed')
@api_view(['POST'])
def LoginPage(request, failed_login: str):
    if request.method == 'POST':
        if request.body:
            body = json.loads(request.body)
        else:
            return JsonResponse({'message': 'Error! Expected POST body, found None.'},
                                status=status.HTTP_400_BAD_REQUEST)
        username = body.get('username')
        password = body.get('password')
        try:
            user = authenticate(request, username=username, password=password)
            recipes_user = users.objects.get(username=username)
            if user is not None:
                token = Token.objects.get(user=recipes_user).key
                return JsonResponse({'message': 'login_succeeded', 'username': username, 'token': token})
            else:
                return JsonResponse({'message': failed_login, 'error': 'Wrong password'},
                                    status=status.HTTP_400_BAD_REQUEST)
        except:
            return JsonResponse({'message': failed_login, 'error': 'No user with this username'},
                                status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({'message': failed_login, 'error': 'post method should be used'},
                            status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def SearchRecipeByIngredients(request, string_ingredients):
    try:
        recipe = recipes.objects.get(string_ingredients=string_ingredients)
    except recipes.DoesNotExist:
        return JsonResponse({'message': 'The recipe does not exist'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        recipes_serializer = recipesSerializer(recipe)
        return JsonResponse(recipes_serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((IsAuthenticated,))
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
@permission_classes((IsAuthenticated,))
def New(request):
    if request.method == 'POST':
        recipe_data = JSONParser().parse(request)
        recipe_serializer = recipesSerializer(data=recipe_data)
        if recipe_serializer.is_valid():
            recipe_serializer.save()
            return JsonResponse(recipe_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(recipe_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def SearchRecipeByName(request, recipe_name: string):
    recipe = recipes.objects.all()
    recipe = recipe.filter(recipe_name__contains=recipe_name)[:500]
    if recipe is not None:
        if request.method == 'GET':
            recipes_serializer = recipesSerializer(recipe, many=True)
            return JsonResponse(recipes_serializer.data, safe=False)
    return JsonResponse({'message': 'The recipe does not exist'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def UsersPage(request):
    return JsonResponse({'username': request.user.username, 'email': request.user.email})


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
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
@permission_classes((IsAuthenticated,))
def DeleteUserRecipe(request, id_to_delete):
    if request.method == 'POST':
        user_recipe_to_delete = get_object_or_404(user_recipes, id=id_to_delete)
        user_recipe_to_delete.delete()
        return JsonResponse({'message': 'Recipe from user database is deleted successfully.'})
    else:
        return JsonResponse({'message': 'Deletion failed', 'error': 'post method should be used'},
                            status=status.HTTP_400_BAD_REQUEST)
