from rest_framework.serializers import ModelSerializer
from .models import User


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('uid','first_name', 'last_name', 'user_name', 'email', 'birthday_year')


class UserModelSerializerV2(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
