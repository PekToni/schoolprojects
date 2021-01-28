#pragma once
#include "Recipe.h"
#include "Ingredient.h"
class Recipes
{
private:
	Recipe** recipes;
	Ingredient** ingredients;
	//shared_ptr<Ingredient> ingredients;
	int recipeAmount;

public:
	Recipes();
	Recipes(int pRecipeAmounts);
	~Recipes();
	void addRecipe(Recipe *pRecipe, Ingredient *pIngredients);
	string showRecipe(int pRecipe);
	string listRecipes();
	int getFreeElement();
	string FindRecipe(string pName);
	void ModifyRecipe(int pIndex);
	void DeleteRecipe(int pIndex);
};

