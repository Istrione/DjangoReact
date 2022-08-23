from rest_framework import mixins
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from .models import User, Project, Todo
from .serializer import UserModelSerializer, ProjectModelSerializer, TodoModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10

class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20

class UserModelViewSet(
mixins.RetrieveModelMixin,
mixins.UpdateModelMixin,
mixins.ListModelMixin,
GenericViewSet
):
    serializer_class = UserModelSerializer
    queryset = User.objects.all()

class ProjectModelViewSet(ModelViewSet):
    pagination_class = ProjectLimitOffsetPagination
    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()

    def get_queryset(self):
        name = self.request.query_params.get('name', None)
        if name:
            return Project.objects.filter(name=name)
        return Project.objects.all()

class TodoModelViewSet(ModelViewSet):

    pagination_class = TodoLimitOffsetPagination
    serializer_class = TodoModelSerializer
    queryset = Todo.objects.all()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response('Установлен статус: не активно')

    def get_queryset(self):
        project = self.request.query_params.get('project', None)
        if project:
            return Todo.objects.filter(project=project)
        return Todo.objects.all()



