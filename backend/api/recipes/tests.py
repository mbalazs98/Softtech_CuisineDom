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

        wrong_user1 = authenticate(username='test_user', password='wrong_password')


        self.assertIsNotNone(test_user2)
        self.assertIsNone(wrong_user1)

        self.assertEqual(test_user2.username, 'test_user')
        self.assertEqual(test_user2.email, 'test@email.com')
    def test_user_authenticate(self):
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

        try:
            wrong_user2 = users.objects.get(username='wrong_user')
        except:
            self.assertEqual(True, True)