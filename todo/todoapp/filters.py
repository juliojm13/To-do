from django_filters import rest_framework as filters
from .models import ToDo


# For filtering by name of the project code below
# class ToDoFilter(filters.FilterSet):
#     project__name = filters.CharFilter(lookup_expr='contains')
#
#     class Meta:
#         model = ToDo
#         fields = ['project__name']

# For filtering by ID of the project and created data code below
class ToDoFilter(filters.FilterSet):
    class Meta:
        model = ToDo
        fields = {'project': ['exact'],
                  'created': ['year__lte', 'year__gte']
                  }
