from django.shortcuts import render
from rest_framework.viewsets import GenericViewSet, mixins
from .models import User
from .serializers import UserModelSerializer, UserModelSerializerV2


class UserModelViewset(mixins.CreateModelMixin,
                       mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '2':
            return UserModelSerializerV2
        return UserModelSerializer
