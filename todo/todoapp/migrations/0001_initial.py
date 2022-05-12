# Generated by Django 4.0.4 on 2022-05-12 07:06

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('uid', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=128)),
                ('repo_link', models.URLField(blank=True, verbose_name='link to the repo of the project')),
                ('user', models.ManyToManyField(to='users.user')),
            ],
        ),
        migrations.CreateModel(
            name='ToDo',
            fields=[
                ('uid', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('note', models.TextField(default='There is not a note here! ', max_length=264)),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='creation date of the project')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='updated date')),
                ('is_active', models.BooleanField(default=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user', verbose_name='user that created the note')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todoapp.project')),
            ],
        ),
    ]
