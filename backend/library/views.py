from rest_framework.viewsets import ModelViewSet
from .models import User, Project, Todo
from .serializer import UserModelSerializer, ProjectModelSerializer, TodoModelSerializer

class UserModelViewSet(ModelViewSet):
    serializer_class = UserModelSerializer
    queryset = User.objects.all()

class ProjectModelViewSet(ModelViewSet):
    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()

class TodoModelViewSet(ModelViewSet):
    serializer_class = TodoModelSerializer
    queryset = Todo.objects.all()


