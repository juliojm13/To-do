from django.urls import path, include
from rest_framework.routers import DefaultRouter
from todoapp.views import ProjectModelViewset, ToDoModelViewset

app_name = 'todoapp'

router = DefaultRouter()
router.register('todo', ToDoModelViewset)
router.register('project', ProjectModelViewset)

urlpatterns = [
    path('', include(router.urls)),
]
