from rest_framework.relations import StringRelatedField
from rest_framework.serializers import ModelSerializer

from .models import User, Project, Todo


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']

class ProjectModelSerializer(ModelSerializer):
    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'

class TodoModelSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
