from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from .models import ToDo, Project
from .serializers import ProjectModelSerializer, ToDoModelSerializer,ProjectModelSerializerBase,ToDoModelSerializerBase
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from .filters import ToDoFilter


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewset(ModelViewSet):
    queryset = Project.objects.all()
    # serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination

    def get_queryset(self):
        param = self.request.query_params.get('name')
        if param:
            return Project.objects.filter(name__contains=param[0])
        return super().get_queryset()

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ProjectModelSerializer
        return ProjectModelSerializerBase


class ToDoModelViewset(ModelViewSet):
    queryset = ToDo.objects.filter(is_active=True)
    # serializer_class = ToDoModelSerializer
    pagination_class = ToDoLimitOffsetPagination
    filterset_class = ToDoFilter

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ToDoModelSerializer
        return ToDoModelSerializerBase

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

