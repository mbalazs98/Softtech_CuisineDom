from rest_framework import serializers 
from recipes.models import tags
from recipes.models import ingredients
from recipes.models import cuisines
from recipes.models import users
from recipes.models import recipes
from recipes.models import recipe_cuisines
from recipes.models import recipe_tags
from recipes.models import recipe_ingredients
from recipes.models import user_recipes
from django.contrib.auth.models import User
 
class tagsSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = tags
        fields = ('tag_id',
                  'tag_name')

class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)
                
class ingredientsSerializer(DynamicFieldsModelSerializer):
 
    class Meta:
        model = ingredients
        fields = '__all__' 
        
class cuisinesSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = cuisines
        fields = ('cuisine_id',
                  'cuisine_name')
class usersSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = users
        fields = ('users_id',
                  'username',
                  'password',
                  'email')
class recipesSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = recipes
        fields = ('recipe_id',
                  'recipe_name',
                  'cooking_method',
                  'image',
                  'string_ingredients',
                  'prep_time',
                  'serving')

class recipe_cuisinesSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = recipe_cuisines
        fields = ('recipe_id_id',
                  'cuisine_id_id')
                  
class recipe_tagsSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = recipe_tags
        fields = ('recipe_id_id',
                  'tag_id_id')

class recipe_ingredientsSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = recipe_ingredients
        fields = ('recipe_id_id',
                  'ingredient_id_id')

class user_recipesSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = user_recipes
        fields = ('recipe_id_id',
                  'user_id_id')                  
                  