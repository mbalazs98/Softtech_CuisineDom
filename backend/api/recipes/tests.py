from django.test import TestCase
from .models import users, recipes, user_recipes
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.test import Client

# Create your tests here.
class LoginTestCase(TestCase):
    def test_user_authenticate(self):
        user = User.objects.create_user(username='test_user', password='test_password',email='test@email.com')
        user.save()


        recipes_user = users.objects.create()
        recipes_user.username = 'test_user'
        recipes_user.password = 'test_password'
        recipes_user.email = 'test@email.com'

        #recipes_user = users.objects.create_user(username='test_user', password='test_password', email='test@email.com')

        recipes_user.save()

        test_user1 = users.objects.get(username='test_user')

        self.assertEqual(test_user1.username, 'test_user')
        self.assertEqual(test_user1.password, 'test_password')
        self.assertEqual(test_user1.email, 'test@email.com')

        test_user2 = authenticate(username='test_user', password='test_password')

        self.assertIsNotNone(test_user2)

        self.assertEqual(test_user2.username, 'test_user')
        self.assertEqual(test_user2.email, 'test@email.com')
    def test_user_authenticate_neg(self):
        user = User.objects.create_user(username='test_user_neg', password='test_password_neg',email='test@email.com_neg')
        user.save()


        recipes_user = users.objects.create()
        recipes_user.username = 'test_user'
        recipes_user.password = 'test_password'
        recipes_user.email = 'test@email.com'

        #recipes_user = users.objects.create_user(username='test_user', password='test_password', email='test@email.com')

        recipes_user.save()

        test_user1 = users.objects.get(username='test_user')

        self.assertNotEqual(test_user1.username, 'test_user_neg')
        self.assertNotEqual(test_user1.password, 'test_password_neg')
        self.assertNotEqual(test_user1.email, 'test@email.com_neg')

        test_user2 = authenticate(username='test_user_neg', password='test_password_neg')

        self.assertIsNotNone(test_user2)

        self.assertNotEqual(test_user2.username, 'test_user')
        self.assertNotEqual(test_user2.email, 'test@email.com')

    def test_client(self):
        c = Client()

        User.objects.create_user(username='test_user', password='test_password', email='test@email.com')

        recipes_user = users.objects.create()
        recipes_user.username = 'test_user'
        recipes_user.password = 'test_password'
        recipes_user.email = 'test@email.com'

        recipes_user.save()

        logged_in = c.login(username='test_user', password='test_password')
        self.assertEqual(logged_in, True)

        response = c.post('/login/', {'username': 'test_user', 'password' : 'test_password'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b'{"login_succeded": true, "username": "test_user"}')

        response = c.post('/register/', {'username': 'test_user2', 'password' : 'test_password2', 'email':'test@test.test'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b'{"message": "Registration succeded", "username": "test_user2", "email": "test@test.test"}')

        response = c.get('/user/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b'{"username": "test_user", "email": "test@email.com"}')

        recipe = recipes.objects.create()

        recipe.recipe_name = 'test_recipe'
        recipe.cooking_mehtod = 'cook'
        recipe.image = 'test_picture'
        recipe.string_ingredients = 'delicious ingredients'
        recipe.prep_time = 10
        recipe.serving  = 5
        recipe.save()

        user_recipe = user_recipes.objects.create(recipe_id_id = 1, user_id_id = 1)

        user_recipe.save()

        response = c.get('/user/recipes')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b'[{"recipe_id": 1, "recipe_name": "test_recipe", "cooking_method": "", "image": "test_picture",'
                                           b' "string_ingredients": "delicious ingredients", "prep_time": 10, "serving": 5}]')




