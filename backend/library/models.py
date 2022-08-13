from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(('email address'), blank=True, unique=True)

    def __str__(self):
        return f'{self.username} {self.first_name} {self.last_name}'

class Project(models.Model):
    name = models.CharField(max_length=64, verbose_name='название проекта')
    url = models.URLField(max_length=64, verbose_name='ссылка на проект')
    users = models.ManyToManyField(User)

    def __str__(self):
        return f'{self.name}'

class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, verbose_name='проект')
    title = models.TextField(verbose_name='текст заметки')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='дата создания')
    update_at = models.DateTimeField(auto_now=True, verbose_name='дата изменения')
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='пользователь')
    is_active = models.BooleanField(default=True, verbose_name='статус')