#include "pch.h"
#include <string>
#include <iostream>
#include "Recipes.h"
using namespace std;


Recipes::Recipes()
{
	recipes = new Recipe*[7];
	ingredients = new Ingredient*[7];
}

Recipes::Recipes(int pRecipeAmount)
{
	recipeAmount = pRecipeAmount;
	recipes = new Recipe*[pRecipeAmount];
	ingredients = new Ingredient*[pRecipeAmount];
	for (int i{ 0 }; i < pRecipeAmount; i++)
	{
		recipes[i] = nullptr;
		ingredients[i] = nullptr;
	}
}

Recipes::~Recipes()
{
	delete[] recipes;
	delete[] ingredients;
}

// adding recipes
void Recipes::addRecipe(Recipe *pRecipe, Ingredient *pIngredients)
{
	for (int i{ 0 }; i < recipeAmount; i++)
	{
		if (recipes[i] == nullptr)
		{
			cout << "Recipe added..." << endl;
			recipes[i] = pRecipe;
			ingredients[i] = pIngredients;
			break;
		}
	}
}

// showing recipes
string Recipes::showRecipe(int pRecipe)
{
	int index = pRecipe - 1;
	string str = "";
	str = "Recipe: " + recipes[index]->getName() + "\n" + "---\n" + "Ingredients: \n" ;
	for (int i{ 0 }; i < recipes[index]->ingredientAmount(); i++)
	{
		str += ingredients[index][i].getName() + " " + ingredients[index][i].getAmountAndUnits() + "\n";
	}
	str += "---\nGuide: " + recipes[index]->getGuide();
	return str;
}

// listing recipes
string Recipes::listRecipes()
{
	string str = "";
	for (int i{ 0 }; i < recipeAmount; i++) {
		if (recipes[i] == nullptr)
		{
			str += to_string(i + 1) + ". " + "No Recipe" + "\n";
		}
		else {
			str += to_string(i + 1) + ". " + recipes[i]->getName() + "\n";
		}
	}
	return str;
}

// helper to get free element in recipes
int Recipes::getFreeElement()
{
	int element = 0;
	for (int i{ 0 }; i < recipeAmount; i++)
	{
		if (recipes[i] == nullptr)
		{
			element = i;
			break;
		}
	}
	return element;
}

// finding recipes
string Recipes::FindRecipe(string pName)
{
	string str = "Recipe not found...";
	for (int i{ 0 }; i < recipeAmount; i++)
	{
		if (recipes[i] == nullptr)
		{
			break;
		}
		if (pName == recipes[i]->getName())
		{
			str = "Recipe: " + recipes[i]->getName() + "\n" + "---\n" + "Ingredients: \n";
			for (int j{ 0 }; j < recipes[i]->ingredientAmount(); j++)
			{
				str += ingredients[i][j].getName() + " " + ingredients[i][j].getAmountAndUnits() + "\n";
			}
			str += "---\nGuide: " + recipes[i]->getGuide();
			break;
		}
	}
	return str;
}

// modifying recipes ingredients or guide
void Recipes::ModifyRecipe(int pIndex)
{
	int select{ 0 };
	string ingredient{ "" };
	string guide{ "" };
	float measure{ 0 };
	string unit{ "" };
	cout << "1. Edit ingredients" << endl;
	cout << "2. Edit guide" << endl;
	cout << "select: ", cin >> select;
	cin.ignore();
	if (select == 1)
	{
		cout << "Space for: " << recipes[pIndex - 1]->ingredientAmount() << " ingredients" << endl;
		int index = 0;
		for (int i{ 0 }; i < recipes[pIndex - 1]->ingredientAmount(); i++)
		{
			cout << "Type ingredient name: " << endl;
			getline(cin, ingredient);
			cout << "Amount: " << endl;
			cin >> measure;
			cin.ignore();
			cout << "Unit : " << endl;
			getline(cin, unit);
			Ingredient* ing = new Ingredient(ingredient, measure, unit);
			ingredients[pIndex - 1][index] = *ing;
			delete ing;
			index++;
		}
	}
	else if (select == 2)
	{
		int amount = recipes[pIndex - 1]->ingredientAmount();
		string name = recipes[pIndex - 1]->getName();
		string guide = "";
		cout << "guide now: " << recipes[pIndex - 1]->getGuide() << endl;
		cout << "Type new guide" << endl;
		getline(cin, guide);
		cout << to_string(amount) << " " << name << " " << guide << endl;
		recipes[pIndex - 1] = new Recipe(name, guide, amount);
		cout << "guide modified..." << endl;
	}
}

// set nullpointers for other methods to work after deleting
void Recipes::DeleteRecipe(int pIndex)
{
	recipes[pIndex - 1] = nullptr;
	ingredients[pIndex - 1] = nullptr;
}
