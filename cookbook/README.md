Sign in, search for recipes, add them if you want, then delete them if they're gross. :)

Sometimes the recipe won't link to a recipe card, and I'll give you a little error message :(
The API doesn't like certain recipes for some reason. I'm working on manually setting the ingredients and cooking steps instead of using the "recipe card" option that the API offers, as it's unreliable. 

Things that I've learned with this project:

-- Working with a database! This is my first attempt at really using a database in a project. (I used Firebase).

-- Basic Authentication

-- How to give each user their own 'collection', so that the documents will be saved only to the user that's logged in, and every user will have their own unique collection. 

-- How to delete documents specific to the user that is currently logged in, without affecting any other users documents in the database. 

-- How to check the database for existing documents, and not allow duplicate documents to be created. (Which makes sense for this specific project).

-- How to access and modify nested collections/documents. For example: collection(users) > document(currentlySignedInUser) > subCollection(recipes) > document(specificRecipe)

-- Refactoring? I tried to DRY with my DB reads/writes by exporting the repeatable logic into separate functions. I'm still looking in to this. 

-- CSS/Tailwind because...It's a never ending battle. 
