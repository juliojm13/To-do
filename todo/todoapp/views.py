from rest_framework.viewsets import ModelViewSet
from .models import ToDo,Project
from .serializers import ProjectModelSerializer,ToDoModelSerializer


class ProjectModelViewset(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class ToDoModelViewset(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
