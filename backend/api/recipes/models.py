from django.db import models


class tags(models.Model):
    tag_id = models.AutoField(primary_key=True)
    tag_name = models.CharField(max_length=50, unique=True) 


class ingredients(models.Model):
    ingredient_id = models.AutoField(primary_key=True)
    ingredient_name = models.CharField(max_length=50, unique=True) 
    
class cuisines(models.Model):
    cuisines_id = models.AutoField(primary_key=True)
    cuisines_name = models.CharField(max_length=50, unique=True) 
    
class users(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    email = models.CharField(max_length=100, unique=True) 
    
class recipes(models.Model):
    recipe_id = models.AutoField(primary_key=True)
    recipe_name = models.CharField(max_length=50)
    cooking_method = models.TextField(unique=True)
    image = models.TextField(null=True)
    string_ingredients = models.TextField()
    prep_time = models.IntegerField(null=True)
    serving = models.IntegerField(null=True)
    
class recipe_cuisines(models.Model):
    recipe_id = models.ForeignKey(recipes, on_delete=models.CASCADE)
    cuisines_id = models.ForeignKey(cuisines, on_delete=models.CASCADE)
    class Meta:
        constraints = [
        models.UniqueConstraint(fields= ["recipe_id", "cuisines_id"], name='recipe_cuisines_id'),
        ]
    
class recipe_tags(models.Model):
    recipe_id = models.ForeignKey(recipes, on_delete=models.CASCADE)
    tag_id = models.ForeignKey(tags, on_delete=models.CASCADE)
    class Meta:
        constraints = [
        models.UniqueConstraint(fields= ["recipe_id", "tag_id"], name='recipe_tags_id'),
        ]
    
    
class recipe_ingredients(models.Model):
    recipe_id = models.ForeignKey(recipes, on_delete=models.CASCADE)
    ingredient_id = models.ForeignKey(ingredients, on_delete=models.CASCADE)
    class Meta:
        constraints = [
        models.UniqueConstraint(fields= ["recipe_id", "ingredient_id"], name='recipe_ingredients_id'),
        ]
    
class user_recipes(models.Model):
    recipe_id = models.ForeignKey(recipes, on_delete=models.CASCADE)
    user_id = models.ForeignKey(users, on_delete=models.CASCADE)
    class Meta:
        constraints = [
        models.UniqueConstraint(fields= ["recipe_id", "user_id"], name='user_recipes_id'),
        ]
    