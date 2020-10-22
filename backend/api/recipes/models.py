from django.db import models


class tags(models.Model):
    tag_id = models.IntegerField(primary_key=True)
    tag_name = models.TextField(unique=True) 


class ingredients(models.Model):
    ingredient_id = models.IntegerField(primary_key=True)
    ingredient_name = models.TextField(unique=True) 
    
class cuisines(models.Model):
    cuisines_id = models.IntegerField(primary_key=True)
    cuisines_name = models.TextField(unique=True) 
    
class users(models.Model):
    user_id = models.IntegerField(primary_key=True)
    username = models.TextField(unique=True)
    password = models.TextField()
    email = models.TextField(unique=True) 
    
class recipes(models.Model):
    recipe_id = models.IntegerField(primary_key=True)
    recipe_name = models.TextField(unique=True)
    cooking_method = models.TextField(unique=True)
    image = models.TextField(null=True)
    string_ingredients = models.TextField()
    prep_time = models.IntegerField(null=True)
    serving = models.IntegerField(null=True)
    
class recipe_cuisines(models.Model):
    recipe_id = models.ForeignKey(recipes, on_delete=models.CASCADE)
    cuisines_id = models.ForeignKey(cuisines, on_delete=models.CASCADE)
    
class recipe_tags(models.Model):
    recipe_id = models.ForeignKey(recipes, on_delete=models.CASCADE)
    tag_id = models.ForeignKey(tags, on_delete=models.CASCADE)
    class Meta:
        unique_together = (("recipe_id", "tag_id"),)
    
    
class recipe_ingredients(models.Model):
    recipe_id = models.ForeignKey(recipes, on_delete=models.CASCADE)
    ingredient_id = models.ForeignKey(ingredients, on_delete=models.CASCADE)
    class Meta:
        unique_together = (("recipe_id", "ingredient_id"),)
    
class user_recipes(models.Model):
    recipe_id = models.ForeignKey(recipes, on_delete=models.CASCADE)
    user_id = models.ForeignKey(users, on_delete=models.CASCADE)
    class Meta:
        unique_together = (("recipe_id", "user_id"),)
    