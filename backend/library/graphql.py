import graphene
from graphene_django import DjangoObjectType

from library.models import User, Project, Todo


class UserObjectType(DjangoObjectType):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']

class ProjectObjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'

class TodoObjectType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'

class Query(graphene.ObjectType):
    all_users = graphene.List(UserObjectType)
    all_projects = graphene.List(ProjectObjectType)
    all_todos = graphene.List(TodoObjectType)

    def resolve_all_users(self, info):
        return User.objects.all()

    def resolve_all_projects(self, info):
        return Project.objects.all()

    def resolve_all_todos(self, info):
        return Todo.objects.all()



schema = graphene.Schema(query=Query)