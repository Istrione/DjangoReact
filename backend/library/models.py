from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(('email address'), blank=True, unique=True)

    def __str__(self):
        return f'{self.username} {self.first_name} {self.last_name}'

class Project(models.Model):
    name = models.CharField(max_length=64)
    url = models.URLField(max_length=64)
    users = models.ManyToManyField(User)

    def __str__(self):
        return f'{self.name}'

class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    title = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True,)
    update_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    def status_active(self, *args, **kwargs):
        self.is_active = False
        self.save()
