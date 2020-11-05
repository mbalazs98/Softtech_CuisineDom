from django.test import TestCase
from .models import users
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

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

