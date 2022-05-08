from django.db import models
from uuid import uuid4


class User(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    first_name = models.CharField(max_length=96)
    last_name = models.CharField(max_length=96)
    user_name = models.CharField(max_length=64)
    email = models.EmailField(unique=True, blank=False)
    birthday_year = models.PositiveIntegerField()

    def __str__(self):
        return self.user_name
