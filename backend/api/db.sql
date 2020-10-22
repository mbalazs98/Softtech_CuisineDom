BEGIN;
--
-- Create model cuisines
--
CREATE TABLE "recipes_cuisines" ("cuisines_id" integer NOT NULL PRIMARY KEY, "cuisines_name" text NOT NULL UNIQUE);
--
-- Create model ingredients
--
CREATE TABLE "recipes_ingredients" ("ingredient_id" integer NOT NULL PRIMARY KEY, "ingredient_name" text NOT NULL UNIQUE);
--
-- Create model recipes
--
CREATE TABLE "recipes_recipes" ("recipe_id" integer NOT NULL PRIMARY KEY, "recipe_name" text NOT NULL UNIQUE, "cooking_method" text NOT NULL UNIQUE, "image" text NULL, "string_ingredients" text NOT NULL, "prep_time" integer NULL, "serving" integer NULL);
--
-- Create model tags
--
CREATE TABLE "recipes_tags" ("tag_id" integer NOT NULL PRIMARY KEY, "tag_name" text NOT NULL UNIQUE);
--
-- Create model users
--
CREATE TABLE "recipes_users" ("user_id" integer NOT NULL PRIMARY KEY, "username" text NOT NULL UNIQUE, "password" text NOT NULL, "email" text NOT NULL UNIQUE);
--
-- Create model recipe_cuisines
--
CREATE TABLE "recipes_recipe_cuisines" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "cuisines_id_id" integer NOT NULL REFERENCES "recipes_cuisines" ("cuisines_id") DEFERRABLE INITIALLY DEFERRED, "recipe_id_id" integer NOT NULL REFERENCES "recipes_recipes" ("recipe_id") DEFERRABLE INITIALLY DEFERRED);
--
-- Create model user_recipes
--
CREATE TABLE "recipes_user_recipes" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "recipe_id_id" integer NOT NULL REFERENCES "recipes_recipes" ("recipe_id") DEFERRABLE INITIALLY DEFERRED, "user_id_id" integer NOT NULL REFERENCES "recipes_users" ("user_id") DEFERRABLE INITIALLY DEFERRED);
--
-- Create model recipe_tags
--
CREATE TABLE "recipes_recipe_tags" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "recipe_id_id" integer NOT NULL REFERENCES "recipes_recipes" ("recipe_id") DEFERRABLE INITIALLY DEFERRED, "tag_id_id" integer NOT NULL REFERENCES "recipes_tags" ("tag_id") DEFERRABLE INITIALLY DEFERRED);
--
-- Create model recipe_ingredients
--
CREATE TABLE "recipes_recipe_ingredients" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "ingredient_id_id" integer NOT NULL REFERENCES "recipes_ingredients" ("ingredient_id") DEFERRABLE INITIALLY DEFERRED, "recipe_id_id" integer NOT NULL REFERENCES "recipes_recipes" ("recipe_id") DEFERRABLE INITIALLY DEFERRED);
CREATE INDEX "recipes_recipe_cuisines_cuisines_id_id_eff2ccfc" ON "recipes_recipe_cuisines" ("cuisines_id_id");
CREATE INDEX "recipes_recipe_cuisines_recipe_id_id_bb014f15" ON "recipes_recipe_cuisines" ("recipe_id_id");
CREATE UNIQUE INDEX "recipes_user_recipes_recipe_id_id_user_id_id_bf8362e5_uniq" ON "recipes_user_recipes" ("recipe_id_id", "user_id_id");
CREATE INDEX "recipes_user_recipes_recipe_id_id_a798f2c8" ON "recipes_user_recipes" ("recipe_id_id");
CREATE INDEX "recipes_user_recipes_user_id_id_7cbb16b8" ON "recipes_user_recipes" ("user_id_id");
CREATE UNIQUE INDEX "recipes_recipe_tags_recipe_id_id_tag_id_id_543e754a_uniq" ON "recipes_recipe_tags" ("recipe_id_id", "tag_id_id");
CREATE INDEX "recipes_recipe_tags_recipe_id_id_7b51e8e2" ON "recipes_recipe_tags" ("recipe_id_id");
CREATE INDEX "recipes_recipe_tags_tag_id_id_65797fb2" ON "recipes_recipe_tags" ("tag_id_id");
CREATE UNIQUE INDEX "recipes_recipe_ingredients_recipe_id_id_ingredient_id_id_e36a30bc_uniq" ON "recipes_recipe_ingredients" ("recipe_id_id", "ingredient_id_id");
CREATE INDEX "recipes_recipe_ingredients_ingredient_id_id_bd863c17" ON "recipes_recipe_ingredients" ("ingredient_id_id");
CREATE INDEX "recipes_recipe_ingredients_recipe_id_id_2af7aac7" ON "recipes_recipe_ingredients" ("recipe_id_id");
COMMIT;
