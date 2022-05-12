from django.db import models
from uuid import uuid4
from users.models import User


class Project(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    name = models.CharField(max_length=128)
    repo_link = models.URLField(verbose_name='link to the repo of the project', blank=True)
    user = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class ToDo(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    note = models.TextField(max_length=264, default='There is not a note here! ')
    created = models.DateTimeField(verbose_name='creation date of the project', auto_now_add=True)
    updated = models.DateTimeField(verbose_name='updated date', auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='user that created the note')
    is_active = models.BooleanField(blank=False, default=True)

    def __str__(self):
        return self.note
