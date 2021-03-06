import json
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, status
from rest_framework.parsers import JSONParser
from recipes.serializers import usersSerializer, recipesSerializer, ingredientsSerializer
from .models import users, recipes, user_recipes, ingredients, recipe_ingredients, tags, recipe_tags, recipe_topic
from .forms import UsersRegisterForm
from django.contrib.auth import authenticate, login, checks
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from pycdi import Inject, Producer
import string
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser, FileUploadParser
import base64
from django.core.files.base import ContentFile
from recipes.authentication import EmailOrUsernameAuthBackend
from django.conf import settings

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

WHITELIST = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-#@()!.?"

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
            return JsonResponse({'message': failed_register, 'error': 'No username was given'},
                                status=status.HTTP_400_BAD_REQUEST)
        if body.get('password') == '':
            return JsonResponse({'message': failed_register, 'error': 'No password was given'},
                                status=status.HTTP_400_BAD_REQUEST)
        if body.get('email') == '':
            return JsonResponse({'message': failed_register, 'error': 'No email address was given'},
                                status=status.HTTP_400_BAD_REQUEST)

        for char in body.get('username'):
            if char not in WHITELIST or char == '@':
                return JsonResponse({'message': failed_register, 'error': 'Invalid character in username.'},
                                    status=status.HTTP_400_BAD_REQUEST)

        for char in body.get('password'):
            if char not in WHITELIST:
                return JsonResponse({'message': failed_register, 'error': 'Invalid character in password.'},
                                    status=status.HTTP_400_BAD_REQUEST)

        for char in body.get('email'):
            if char not in WHITELIST:
                return JsonResponse({'message': failed_register, 'error': 'Invalid character in email address.'},
                                    status=status.HTTP_400_BAD_REQUEST)

        if '@' not in body.get('email'):
            return JsonResponse({'message': failed_register, 'error': 'Invalid format of email address.'},
                                status=status.HTTP_400_BAD_REQUEST)

        try:
            recipes_user = users.objects.create_user(username=body.get('username'), password=body.get('password'), email=body.get('email'))
            recipes_user.save()
        except Exception as e:
            return JsonResponse(
                {'message': 'Registration failed', 'error': 'An account with the same username/email already exists.'},
                status=status.HTTP_400_BAD_REQUEST)
        token = Token.objects.create(user=recipes_user)
        return JsonResponse({'message': 'registration succeeded', 'username': recipes_user.username
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
            recipes_user = authenticate(request, username=username, password=password)
            if recipes_user is not None:
                try:
                    token = Token.objects.create(user=recipes_user)
                except Exception as e:
                    return JsonResponse({'message': failed_login, 'error': 'User already logged in'},
                                 status=status.HTTP_400_BAD_REQUEST)
                return JsonResponse({'message': 'login_succeeded', 'username': recipes_user.username, 'token': token.key})
            else:
                return JsonResponse({'message': failed_login, 'error': 'Wrong password'},
                                    status=status.HTTP_400_BAD_REQUEST)
        except:
            return JsonResponse({'message': failed_login, 'error': 'No user with this username'},
                                status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({'message': failed_login, 'error': 'post method should be used'},
                            status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def GetIngredients(request):
    fields = ('ingredient_name')
    ingreds = ingredients.objects.all() #values_list(fields, flat=True)
    if ingreds is not None:
        if request.method == 'GET':
            ingreds_serializer = ingredientsSerializer(ingreds, many=True) #, fields = fields)
            return JsonResponse(ingreds_serializer.data, safe=False)
    else:
        return JsonResponse({'message': 'No ingredients exist'}, status=status.HTTP_404_NOT_FOUND)
        
import itertools


@api_view(['POST'])
def SearchRecipeByIngredients(request):
    if request.body:
        body = json.loads(request.body)
        try:
            ingredient_names = [item['ingredient_name'] for item in body.get('ingredient')]
            ingredient_ids = [item['ingredient_id'] for item in body.get('ingredient')]
            ingredients_found = ingredients.objects.filter(ingredient_name__in=ingredient_names)
            if ingredients_found:
                recipe_ids = recipe_ingredients.objects.filter(ingredient_id__in=ingredient_ids)[:10]
                recipe_ids = [item['recipe_id_id'] for item in recipe_ids.values()]
                recipes_res = recipes.objects.filter(recipe_id__in=recipe_ids)
                res = []
                for item in recipes_res.values():
                    res.append(dict(
                            recipe_id= item['recipe_id'],
                            recipe_name= item['recipe_name'], 
                            image= item['image'], 
                            cooking_method= item['cooking_method']
                    ))
            else:
                raise           
        except:
            return JsonResponse({'message': 'Recipe with these ingredients does not exist'}, status=status.HTTP_404_NOT_FOUND)
        if request.method == 'POST':
            recipes_serializer = recipesSerializer(res, many=True)
            return JsonResponse(recipes_serializer.data, safe=False)
    else:
        return JsonResponse({'message': 'No ingredients given'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def LogOut(request):

    token = Token.objects.get(user_id=request.user.id)
    token.delete()
    request.user.auth_token.delete()
    return JsonResponse({'message': 'User logged out.'}, status=status.HTTP_200_OK)

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

import random

@api_view(['GET'])
# @permission_classes((IsAuthenticated,))
def GetSuggestions(request, recipe_id):
    if request.method == 'GET':
        topic = recipe_topic.objects.get(recipe_id=recipe_id)
        suggestions_ids = sorted(recipe_topic.objects.filter(topic_id=topic.topic_id).values_list('recipe_id', flat=True), key=lambda x: random.random())[:2]
        
        user_recipes_query_set = recipes.objects.filter(recipe_id__in=suggestions_ids)
        serialized_user_recipes = recipesSerializer(user_recipes_query_set, many=True)

        return JsonResponse(serialized_user_recipes.data, safe=False)

        
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
    recipe = recipe.filter(recipe_name__contains=recipe_name)[:10]
    if recipe is not None:
        if request.method == 'GET':
            recipes_serializer = recipesSerializer(recipe, many=True)
            return JsonResponse(recipes_serializer.data, safe=False)
    return JsonResponse({'message': 'The recipe does not exist'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def UsersPage(request):
    if request.method == 'GET':
        try:
            return JsonResponse({'username': request.user.username, 'email': request.user.email, 'profile_picture': 'http://' + request.get_host() + request.user.profile_picture.url})
        except ValueError:
            return JsonResponse({'username': request.user.username, 'email': request.user.email, 'profile_picture':''})

@api_view(['POST','DELETE'])
@permission_classes((IsAuthenticated,))
def UsersSettingsChange(request):
    if request.method == 'POST':
        modification_list = []
        user = request.user
        body = json.loads(request.body)
        if body.get('profile_picture') != "":
            format, imgstr = body.get('profile_picture').split(';base64,')
            ext = format.split('/')[-1]

            data = ContentFile(base64.b64decode(imgstr))

            user.profile_picture.delete(save=True)
            user.profile_picture.save(request.user.username + '_pic' + ext, data, save=True)

            modification_list.append('profile_picture')
        if body.get('username') != "":
            try:
                tmp_u = users.objects.get(username=body.get('username'))
                return JsonResponse({'message': 'Username already exists!'}, status=status.HTTP_400_BAD_REQUEST)
            except:
                user.username = body.get('username')
                user.save()
                modification_list.append('username')
        if body.get('password') != "":
            if user.check_password(body.get('old_password')):
                user.set_password(body.get('password'))
                user.save()
                modification_list.append('password')
            else:
                return JsonResponse({'message': 'Wrong password!'}, status=status.HTTP_400_BAD_REQUEST)

        return JsonResponse({'message' : ', '.join(modification_list) + ' attributes has been successfully modified.'})
    elif request.method == 'DELETE':
        request.user.profile_picture.delete(save=True)
        return JsonResponse({'message': 'Profile picture successfully deleted'})



@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def UserRecipePage(request):
    if request.method == 'GET':
        user_recipes_id = user_recipes.objects.filter(users_id_id=request.user.id)
        user_recipes_id_list = []

        for recipe_user_id_pairs in user_recipes_id.values_list():
            user_recipes_id_list.append(recipe_user_id_pairs[1])

        user_recipes_query_set = recipes.objects.filter(recipe_id__in=user_recipes_id_list)
        serialized_user_recipes = recipesSerializer(user_recipes_query_set, many=True)

        return JsonResponse(serialized_user_recipes.data, safe=False)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def DeleteUserRecipe(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        user_recipe_to_delete = get_object_or_404(user_recipes, recipe_id=body.get('id_to_delete'))
        user_recipe_to_delete.delete()
        return JsonResponse({'message': 'Recipe from user\'s favourites is deleted successfully.'})

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def AddUserRecipe(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        try:
            recipe = recipes.objects.get(recipe_id=body.get('recipe_id'))
            print("Rec", recipe)
            favourite_recipe = user_recipes(recipe_id=recipe, users_id=request.user)
            
            favourite_recipe.save()
            print("Here")
            return JsonResponse({'message': 'Recipe successfully saved as user\'s favourite.'})
        except Exception as e:
            print(e)
            return JsonResponse({'message': 'There is no recipe with the given id.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def IsUserFavouriteRecipe(request, recipe_id):
    try:
        user_recipes.objects.get(recipe_id_id=recipe_id, users_id_id=request.user.id)
        return JsonResponse({'is_favourite_recipe': 1})
    except Exception as e:
        print(e)
        return JsonResponse({'is_favourite_recipe': 0})