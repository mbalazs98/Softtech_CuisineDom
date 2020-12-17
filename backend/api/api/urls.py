"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import include, path
from rest_framework import routers
import sys, os
sys.path.append(os.path.abspath(os.path.join('..', 'recipes')))
from recipes import views
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('register/', views.RegisterPage),
    path('login/', views.LoginPage),
    path('logout/', views.LogOut),
    path('user/', views.UsersPage),
    path('user/change_settings/', views.UsersSettingsChange),
    path('user/recipes/', views.UserRecipePage),
    path('user/delete_recipe/', views.DeleteUserRecipe),
    path('user/add_recipe/', views.AddUserRecipe),
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('recipes/ingredients', views.SearchRecipeByIngredients),
    path('recipes/<recipe_id>/recipeID', views.RecipeID),
    path('recipes/new', views.New),
    path('recipes/<recipe_name>/search', views.SearchRecipeByName),
    path('recipes/get_ingredients', views.GetIngredients)

]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
