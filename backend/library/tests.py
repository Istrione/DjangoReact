from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, force_authenticate, APITestCase
from mixer.backend.django import mixer

from .models import User
from .views import UserModelViewSet


class UserTestCase(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        user = User.objects.create_superuser(username='testuser', password='testuser')
        force_authenticate(request, user=user)
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class UserClientTestCase(TestCase):
    def setUp(self) -> None:
        self.client = APIClient()

    def test_get_list(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class UserAPITestCase(APITestCase):
    def setUp(self) -> None:
        self.user = User.objects.create_user(username='testuser', password='testuser')
        self.testuser = mixer.blend(User)

    def test_get_list(self):
        self.client.force_authenticate(self.user)
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

