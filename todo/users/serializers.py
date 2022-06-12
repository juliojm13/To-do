from rest_framework.serializers import HyperlinkedModelSerializer,ModelSerializer
from .models import User


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'user_name', 'email', 'birthday_year')
