from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import ToDo, Project
from users.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    user = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ProjectModelSerializerBase(ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(HyperlinkedModelSerializer):
    project = ProjectModelSerializer()
    created_by = UserModelSerializer()

    class Meta:
        model = ToDo
        fields = '__all__'
