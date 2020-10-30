BEGIN;
--
-- Create model cuisines
--
CREATE TABLE "recipes_cuisines" ("cuisine_id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "cuisine_name" varchar(50) NOT NULL UNIQUE);
--
-- Create model ingredients
--
CREATE TABLE "recipes_ingredients" ("ingredient_id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "ingredient_name" varchar(50) NOT NULL UNIQUE);
--
-- Create model recipes
--
CREATE TABLE "recipes_recipes" ("recipe_id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "recipe_name" varchar(50) NOT NULL, "cooking_method" text NOT NULL, "image" text NULL, "string_ingredients" text NULL, "prep_time" integer NULL, "serving" integer NULL);
--
-- Create model tags
--
CREATE TABLE "recipes_tags" ("tag_id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "tag_name" varchar(50) NOT NULL UNIQUE);
--
-- Create model users
--
CREATE TABLE "recipes_users" ("user_id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "username" varchar(50) NOT NULL UNIQUE, "password" varchar(50) NOT NULL, "email" varchar(100) NOT NULL UNIQUE);
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
--
-- Create model recipe_cuisines
--
CREATE TABLE "recipes_recipe_cuisines" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "cuisine_id_id" integer NOT NULL REFERENCES "recipes_cuisines" ("cuisine_id") DEFERRABLE INITIALLY DEFERRED, "recipe_id_id" integer NOT NULL REFERENCES "recipes_recipes" ("recipe_id") DEFERRABLE INITIALLY DEFERRED);
--
-- Create constraint user_recipes_id_constraint on model user_recipes
--
CREATE TABLE "new__recipes_user_recipes" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "recipe_id_id" integer NOT NULL REFERENCES "recipes_recipes" ("recipe_id") DEFERRABLE INITIALLY DEFERRED, "user_id_id" integer NOT NULL REFERENCES "recipes_users" ("user_id") DEFERRABLE INITIALLY DEFERRED, CONSTRAINT "user_recipes_id_constraint" UNIQUE ("recipe_id_id", "user_id_id"));
INSERT INTO "new__recipes_user_recipes" ("id", "recipe_id_id", "user_id_id") SELECT "id", "recipe_id_id", "user_id_id" FROM "recipes_user_recipes";
DROP TABLE "recipes_user_recipes";
ALTER TABLE "new__recipes_user_recipes" RENAME TO "recipes_user_recipes";
CREATE INDEX "recipes_recipe_tags_recipe_id_id_7b51e8e2" ON "recipes_recipe_tags" ("recipe_id_id");
CREATE INDEX "recipes_recipe_tags_tag_id_id_65797fb2" ON "recipes_recipe_tags" ("tag_id_id");
CREATE INDEX "recipes_recipe_ingredients_ingredient_id_id_bd863c17" ON "recipes_recipe_ingredients" ("ingredient_id_id");
CREATE INDEX "recipes_recipe_ingredients_recipe_id_id_2af7aac7" ON "recipes_recipe_ingredients" ("recipe_id_id");
CREATE INDEX "recipes_recipe_cuisines_cuisine_id_id_5265ea9c" ON "recipes_recipe_cuisines" ("cuisine_id_id");
CREATE INDEX "recipes_recipe_cuisines_recipe_id_id_bb014f15" ON "recipes_recipe_cuisines" ("recipe_id_id");
CREATE INDEX "recipes_user_recipes_recipe_id_id_a798f2c8" ON "recipes_user_recipes" ("recipe_id_id");
CREATE INDEX "recipes_user_recipes_user_id_id_7cbb16b8" ON "recipes_user_recipes" ("user_id_id");
--
-- Create constraint recipe_tags_id_constraint on model recipe_tags
--
CREATE TABLE "new__recipes_recipe_tags" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "recipe_id_id" integer NOT NULL REFERENCES "recipes_recipes" ("recipe_id") DEFERRABLE INITIALLY DEFERRED, "tag_id_id" integer NOT NULL REFERENCES "recipes_tags" ("tag_id") DEFERRABLE INITIALLY DEFERRED, CONSTRAINT "recipe_tags_id_constraint" UNIQUE ("recipe_id_id", "tag_id_id"));
INSERT INTO "new__recipes_recipe_tags" ("id", "recipe_id_id", "tag_id_id") SELECT "id", "recipe_id_id", "tag_id_id" FROM "recipes_recipe_tags";
DROP TABLE "recipes_recipe_tags";
ALTER TABLE "new__recipes_recipe_tags" RENAME TO "recipes_recipe_tags";
CREATE INDEX "recipes_recipe_tags_recipe_id_id_7b51e8e2" ON "recipes_recipe_tags" ("recipe_id_id");
CREATE INDEX "recipes_recipe_tags_tag_id_id_65797fb2" ON "recipes_recipe_tags" ("tag_id_id");
--
-- Create constraint recipe_ingredients_id_constraint on model recipe_ingredients
--
CREATE TABLE "new__recipes_recipe_ingredients" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "ingredient_id_id" integer NOT NULL REFERENCES "recipes_ingredients" ("ingredient_id") DEFERRABLE INITIALLY DEFERRED, "recipe_id_id" integer NOT NULL REFERENCES "recipes_recipes" ("recipe_id") DEFERRABLE INITIALLY DEFERRED, CONSTRAINT "recipe_ingredients_id_constraint" UNIQUE ("recipe_id_id", "ingredient_id_id"));
INSERT INTO "new__recipes_recipe_ingredients" ("id", "ingredient_id_id", "recipe_id_id") SELECT "id", "ingredient_id_id", "recipe_id_id" FROM "recipes_recipe_ingredients";
DROP TABLE "recipes_recipe_ingredients";
ALTER TABLE "new__recipes_recipe_ingredients" RENAME TO "recipes_recipe_ingredients";
CREATE INDEX "recipes_recipe_ingredients_ingredient_id_id_bd863c17" ON "recipes_recipe_ingredients" ("ingredient_id_id");
CREATE INDEX "recipes_recipe_ingredients_recipe_id_id_2af7aac7" ON "recipes_recipe_ingredients" ("recipe_id_id");
--
-- Create constraint recipe_cuisine_id_constraint on model recipe_cuisines
--
CREATE TABLE "new__recipes_recipe_cuisines" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "cuisine_id_id" integer NOT NULL REFERENCES "recipes_cuisines" ("cuisine_id") DEFERRABLE INITIALLY DEFERRED, "recipe_id_id" integer NOT NULL REFERENCES "recipes_recipes" ("recipe_id") DEFERRABLE INITIALLY DEFERRED, CONSTRAINT "recipe_cuisine_id_constraint" UNIQUE ("recipe_id_id", "cuisine_id_id"));
INSERT INTO "new__recipes_recipe_cuisines" ("id", "cuisine_id_id", "recipe_id_id") SELECT "id", "cuisine_id_id", "recipe_id_id" FROM "recipes_recipe_cuisines";
DROP TABLE "recipes_recipe_cuisines";
ALTER TABLE "new__recipes_recipe_cuisines" RENAME TO "recipes_recipe_cuisines";
CREATE INDEX "recipes_recipe_cuisines_cuisine_id_id_5265ea9c" ON "recipes_recipe_cuisines" ("cuisine_id_id");
CREATE INDEX "recipes_recipe_cuisines_recipe_id_id_bb014f15" ON "recipes_recipe_cuisines" ("recipe_id_id");
COMMIT;
