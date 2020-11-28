from django.test import TestCase
from .models import users, recipes, user_recipes
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.test import Client
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient

# Create your tests here.
class LoginTestCase(TestCase):
    def test_user_authenticate(self):

        recipes_user = users.objects.create_user(username='test_user', password='test_password', email='test@email.com')

        recipes_user.save()

        test_user1 = users.objects.get(username='test_user')

        self.assertEqual(test_user1.username, 'test_user')
        self.assertEqual(test_user1.email, 'test@email.com')

        test_user2 = authenticate(username='test_user', password='test_password')

        self.assertIsNotNone(test_user2)

        self.assertEqual(test_user2.username, 'test_user')
        self.assertEqual(test_user2.email, 'test@email.com')


        recipes_user2 = users.objects.create_user(username='test_user_neg', password='test_password_neg', email='test@email.com_neg')

        recipes_user2.save()

        test_user1 = users.objects.get(username='test_user')

        self.assertNotEqual(test_user1.username, 'test_user_neg')
        self.assertNotEqual(test_user1.email, 'test@email.com_neg')

        test_user2 = authenticate(username='test_user_neg', password='test_password_neg')

        self.assertIsNotNone(test_user2)

        self.assertNotEqual(test_user2.username, 'test_user')
        self.assertNotEqual(test_user2.email, 'test@email.com')

    def test_client(self):
        c = Client()

        recipes_user = users.objects.create_user(username='test_user', password='test_password', email='test@email.com')
        recipes_user.save()

        response = c.post('/login/', '{"username": "test_user", "password" : "test_password"}', content_type="application/json")
        self.assertEqual(response.status_code, 200)
        string_content = response.content.decode('utf-8')

        self.assertEqual('login_succeeded' in string_content, True)
        self.assertEqual('test_user' in string_content, True)

        response = c.post('/register/', '{"username": "test_user2", "password" : "test_password2", "email":"test@test.test"}', content_type="application/json")
        self.assertEqual(response.status_code, 201)
        string_content = response.content.decode('utf-8')

        self.assertEqual('registration succeeded' in string_content, True)
        self.assertEqual('test_user2' in string_content, True)
        self.assertEqual('test@test.test' in string_content, True)

        token = Token.objects.get(user__username='test_user')

        c = APIClient()

        c.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        response = c.get('/user/')
        self.assertEqual(response.status_code, 200)
        string_content = response.content.decode('utf-8')

        self.assertEqual('test_user' in string_content, True)
        self.assertEqual('test@email.com' in string_content, True)

        recipe = recipes.objects.create()

        recipe.recipe_name = 'test_recipe'
        recipe.cooking_method = 'cook'
        recipe.image = 'test_picture'
        recipe.string_ingredients = 'delicious ingredients'
        recipe.prep_time = '10'
        recipe.serving  = '5'
        recipe.save()

        user_recipe = user_recipes.objects.create(recipe_id_id = 1, user_id_id = 1)

        user_recipe.save()

        response = c.get('/user/recipes')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b'[{"recipe_id": 1, "recipe_name": "test_recipe", "cooking_method": "cook", "image": "test_picture",'
                                           b' "string_ingredients": "delicious ingredients", "prep_time": "10", "serving": "5"}]')

class RecipeTestCase(TestCase):
    def test_get_by_id(self):
        c = Client()
        recipe = recipes.objects.create()

        recipe.recipe_name = 'test'
        recipe.cooking_mehtod = 'cook'
        recipe.image = 'test_picture'
        recipe.string_ingredients = 'delicious ingredients'
        recipe.prep_time = '10'
        recipe.serving  = '5'
        recipe.save()

        response = c.get('/recipes/1/recipeID')

        self.assertEqual(response.status_code, 200)
    def test_get_by_ingredient(self):
        c = Client()
        recipe = recipes.objects.create()
        recipe.recipe_name = 't'
        recipe.cooking_mehtod = 'c'
        recipe.image = 't'
        recipe.string_ingredients = 'd'
        recipe.prep_time = '1'
        recipe.serving  = '5'
        recipe.save()

        response = c.get('/recipes/d/ingredients')

        self.assertEqual(response.status_code, 200)

    def test_get_by_name(self):
        c = Client()
        recipe = recipes.objects.create()

        recipe.recipe_name = 'test'
        recipe.cooking_mehtod = 'cook'
        recipe.image = 'test_picture'
        recipe.string_ingredients = 'delicious ingredients'
        recipe.prep_time = '10'
        recipe.serving  = '5'
        recipe.save()

        response = c.get('/recipes/test/search')

        self.assertEqual(response.status_code, 200)