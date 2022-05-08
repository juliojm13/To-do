from django.core.management.base import BaseCommand
from users.models import User
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = 'Creates a superuser and some users from User model'

    def add_arguments(self, parser):
        parser.add_argument('quantity_of_users', nargs=1, type=int)

    def handle(self, *args, **options):
        Superuser = get_user_model()
        if not Superuser.objects.filter(username='Jarno'):
            Superuser.objects.create_superuser('Jarno', 'jarno@prog.com', 'adminadmin')

        quantity_of_users = options['quantity_of_users'][0]

        # Удаление существующих тестовых пользователей
        for i in range(quantity_of_users):
            user = User.objects.filter(user_name=f'User{i}')
            user.delete()

        # Создание новых тестовых пользователей
        for i in range(quantity_of_users):
            User.objects.create(user_name=f'User{i}', first_name=f'user{i}',
                                last_name=f'user-user-{i}', birthday_year=f'{i}',
                                email=f'user{i}@user{i}.com')

        self.stdout.write(f'Successfully created {quantity_of_users} users!')
