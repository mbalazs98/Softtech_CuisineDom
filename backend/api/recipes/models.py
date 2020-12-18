from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

class tags(models.Model):
    tag_id = models.AutoField(primary_key=True)
    tag_name = models.CharField(max_length=50, unique=True)

class ingredients(models.Model):
    ingredient_id = models.AutoField(primary_key=True)
    ingredient_name = models.CharField(max_length=50, unique=True) 
    
class cuisines(models.Model):
    cuisine_id = models.AutoField(primary_key=True)
    cuisine_name = models.CharField(max_length=50, unique=True) 
 
 
class users(AbstractUser):
    profile_picture = models.ImageField(blank=True, null=True)
    
class recipes(models.Model):
    recipe_id = models.AutoField(primary_key=True)
    recipe_name = models.CharField(max_length=50)
    cooking_method = models.TextField()
    image = models.TextField(null=True)
    string_ingredients = models.TextField(null=True)
    prep_time = models.TextField(null=True)
    serving = models.TextField(null=True)


class recipe_topic(models.Model):
    recipe_id = models.ForeignKey(recipes, on_delete=models.CASCADE)
    topic_id = models.IntegerField()

class recipe_cuisines(models.Model):
    recipe_id = models.ForeignKey(recipes, on_delete=models.CASCADE)
    cuisine_id = models.ForeignKey(cuisines, on_delete=models.CASCADE)
    class Meta:
        constraints = [
        models.UniqueConstraint(fields= ["recipe_id", "cuisine_id"], name='recipe_cuisine_id_constraint'),
        ]
    
class recipe_tags(models.Model):
    recipe_id = models.ForeignKey(recipes, on_delete=models.CASCADE)
    tag_id = models.ForeignKey(tags, on_delete=models.CASCADE)
    class Meta:
        constraints = [
        models.UniqueConstraint(fields= ["recipe_id", "tag_id"], name='recipe_tags_id_constraint'),
        ]
    
    
class recipe_ingredients(models.Model):
    recipe_id = models.ForeignKey(recipes, on_delete=models.CASCADE)
    ingredient_id = models.ForeignKey(ingredients, on_delete=models.CASCADE)
    class Meta:
        constraints = [
        models.UniqueConstraint(fields= ["recipe_id", "ingredient_id"], name='recipe_ingredients_id_constraint'),
        ]
    
class user_recipes(models.Model):
    recipe_id = models.ForeignKey(recipes, on_delete=models.CASCADE)
    users_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    class Meta:
        constraints = [
        models.UniqueConstraint(fields= ["recipe_id", "users_id"], name='user_recipes_id_constraint'),
        ]
    