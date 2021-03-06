from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter
from users.views import UserModelViewset
from todoapp.views import ProjectModelViewset, ToDoModelViewset
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from graphene_django.views import GraphQLView

router = DefaultRouter()
router.register('users', UserModelViewset)
router.register('todo', ToDoModelViewset)
router.register('projects', ProjectModelViewset)

schema_view = get_schema_view(
    openapi.Info(
        title='To do',
        default_version='1',
        description='Documentation to out project',
        contact=openapi.Contact(email='admin@admin.ec'),
        license=openapi.License(name='MIT License'),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),

    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path("graphql/", GraphQLView.as_view(graphiql=True)),
]
