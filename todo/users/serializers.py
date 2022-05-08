from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'user_name', 'email', 'birthday_year')
