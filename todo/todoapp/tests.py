import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User as User_auth
from .models import ToDo, Project
from users.models import User
from users.views import UserModelViewset
from .views import ToDoModelViewset, ProjectModelViewset


class TestAuthorViewSet(TestCase):

    def test_get_todo_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/todo/')
        view = ToDoModelViewset.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_project_list(self):
        client = APIClient()
        response = client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_project_detail(self):
        project = mixer.blend(Project)
        client = APIClient()
        response = client.get(f'/api/projects/{project.uid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_project_unauthorized(self):
        user = mixer.blend(User)
        client = APIClient()
        response = client.post('/api/projects/', {'name': 'project',
                                                  'repo_link': 'https://github.com/sde',
                                                  'user': user.uid,
                                                  })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_project(self):
        user = mixer.blend(User)
        client = APIClient()
        admin = User_auth.objects.create_superuser('admin', 'ad@asd.com', 'admin123')
        client.login(username='admin', password='admin123')
        response = client.post('/api/projects/', {'name': 'project',
                                                  'repo_link': 'https://github.com/sde',
                                                  'user': user.uid,
                                                  })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestUserModelViewSet(APITestCase):

    def test_get_user_list(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_detail(self):
        user = mixer.blend(User)
        response = self.client.get(f'/api/users/{user.uid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user_unauthorized(self):
        response = self.client.post(f'/api/users/', {'first_name': 'Juan',
                                                     'last_name': 'Jots',
                                                     'user_name': 'jasc',
                                                     'email': 'asd@daf.com',
                                                     'birthday_year': 1987,
                                                     })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_user(self):
        admin = User_auth.objects.create_superuser('admin', 'ad@asd.com', 'admin123')
        self.client.login(username='admin', password='admin123')
        response = self.client.post(f'/api/users/', {'first_name': 'Juan',
                                                     'last_name': 'Jots',
                                                     'user_name': 'jasc',
                                                     'email': 'asd@daf.com',
                                                     'birthday_year': 1987,
                                                     })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_request_to_create_user(self):
        admin = User_auth.objects.create_superuser('admin', 'ad@asd.com', 'admin123')
        self.client.login(username='admin', password='admin123')
        response = self.client.post(f'/api/users/', {'first_name': 'Juan',
                                                     'last_name': 'Jots',
                                                     'user_name': 'jasc',
                                                     'email': 'asddaf.com',  # email not correct!
                                                     'birthday_year': 1987,
                                                     })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_edit_user(self):
        admin = User_auth.objects.create_superuser('admin', 'ad@asd.com', 'admin123')
        self.client.login(username='admin', password='admin123')
        user = mixer.blend(User)
        response = self.client.put(f'/api/users/{user.uid}/', {'first_name': 'Juan',
                                                               'last_name': 'Jots',
                                                               'user_name': 'jasc',
                                                               'email': 'asd@daf.com',
                                                               'birthday_year': 1987,
                                                               })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = User.objects.get(pk=user.uid)
        self.assertEqual(user.first_name, 'Juan')
        self.assertEqual(user.last_name, 'Jots')
        self.assertEqual(user.user_name, 'jasc')
        self.assertEqual(user.email, 'asd@daf.com')
        self.assertEqual(user.birthday_year, 1987)
