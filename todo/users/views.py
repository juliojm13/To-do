from django.shortcuts import render
from rest_framework.viewsets import GenericViewSet, mixins
from .models import User
from .serializers import UserModelSerializer


class UserModelViewset(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
