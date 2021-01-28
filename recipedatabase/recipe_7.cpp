// recipebook.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include "pch.h"
#include <iostream>
#include <string>
#include "Ingredient.h"
#include "Recipe.h"
#include "Recipes.h"

using namespace std;

int main()
{
	// ingredients pointerarray with pointer array
	Ingredient **ingredients;
	int recipeAmount = 0;
	cout << "Welcome to recipebook" << endl;
	cout << "---------------------" << endl;
	cout << "to start using, please give number of recipes" << endl;
	cout << "recipe number: ", cin >> recipeAmount;

	// define recipe, ingredient, and recipes pointer arrays
	Recipes* recipes = new Recipes(recipeAmount);
	ingredients = new Ingredient*[recipeAmount];
	Recipe* recipes1 = new Recipe[recipeAmount];
	for (int i{ 0 }; i < recipeAmount; i++)
	{
		ingredients[i] = nullptr;
	}

	//pointers
	//mock data for recipes
	// ingredients recipe 1
	Ingredient* ingreds1 = new Ingredient[3];
	Ingredient* aines1 = new Ingredient("munia", 3, "kpl");
	Ingredient* aines2 = new Ingredient("kerma", 1, "dl");
	Ingredient* aines3 = new Ingredient("suola", 1, "tl");
	// ingredients recipe 2
	Ingredient* ingreds2 = new Ingredient[3];
	Ingredient* aines4 = new Ingredient("makkaraa", 1, "kpl");
	Ingredient* aines5 = new Ingredient("perunoita", 3, "kpl");
	Ingredient* aines6 = new Ingredient("suola", 1, "tl");
	Recipe* recipe1 = new Recipe("munakokkeli", "sotke pannulla", 3);
	Recipe* recipe2 = new Recipe("makkaraperunat", "paista", 3);
	recipes1[0] = *recipe1;
	recipes1[1] = *recipe2;
	ingredients[0] = new Ingredient[3];
	ingredients[0][0] = *aines1;
	ingredients[0][1] = *aines2;
	ingredients[0][2] = *aines3;
	recipes->addRecipe(&recipes1[0], ingredients[0]);
	ingredients[1] = new Ingredient[3];
	ingredients[1][0] = *aines4;
	ingredients[1][1] = *aines5;
	ingredients[1][2] = *aines6;
	recipes->addRecipe(&recipes1[1], ingredients[1]);
	cout << recipes->showRecipe(1) << endl;
	cout << recipes->showRecipe(2) << endl;
	int cont{ 0 };
	int mainoption{ 0 };
	bool mainselect{ true };

	do {
		cout << "Recipe database for 7 weekdays" << endl;
		cout << "------------------------------" << endl;
		cout << "1. Show recipes" << endl;
		cout << "2. Search recipe" << endl;
		cout << "3. Add recipe" << endl;
		cout << "4. Modify recipe" << endl;
		cout << "5. Delete recipe" << endl;
		cout << "6. Quit" << endl;
		cout << "------------------------------" << endl;
		cout << "select: ", cin >> mainoption;
		cin.ignore();
		cout << endl;
		if (mainoption == 1) {
			int select{ 0 };
			cout << endl;
			cout << "This is list of recipes" << endl;
			cout << "---------------------------" << endl;
			cout << recipes->listRecipes() << endl;
			cout << "---------------------------" << endl;
			cout << "select: ", cin >> select;
			cout << "--------------------" << endl;
			cout << recipes->showRecipe(select) << endl;
			cout << "--------------------" << endl;
			cout << endl;
		}
		else if (mainoption == 2) {
			string rname;
			cout << "Search recipe" << endl;
			cout << "---------------" << endl;
			cout << "Give recipe name" << endl;
			getline(cin, rname);
			cout << "---------------------------" << endl;
			cout << endl;
			cout << recipes->FindRecipe(rname) << endl;
			cout << endl;
			cout << "---------------------------" << endl;
		}
		else if (mainoption == 3) {
			// adding new recipe
			int igAmount;
			int element = recipes->getFreeElement();
			string name;
			string guide;
			cout << "Add recipe" << endl;
			cout << "---------------" << endl;
			cout << "Give recipe name" << endl;
			getline(cin, name);
			cout << "Give number of ingredients" << endl;
			cin >> igAmount;
			cin.ignore();
			if (igAmount > 0) {
				// declare new ingredients
				ingredients[element] = new Ingredient[igAmount];
				for (int i{ 0 }; i < igAmount; i++) {
					// loop to add ingredients
					// get data from user input
					string ingredient{ "" };
					string recipeName{ "" };
					string guide{ "" };
					float measure{ 0 };
					string unit{ "" };
					cout << "Add ingredients" << endl;
					cout << "Type ingredient name: " << endl;
					getline(cin, ingredient);
					cout << "Amount: " << endl;
					cin >> measure;
					cin.ignore();
					cout << "Unit : " << endl;
					getline(cin, unit);
					// new ingredient
					Ingredient* aines = new Ingredient(ingredient, measure, unit);
					// access the ingredient values and at to ingredients
					ingredients[element][i] = *aines;
					// delete non needed ingredient
					delete aines;
				}
				cout << "Give instructions" << endl;
				getline(cin, guide);
				Recipe* res = new Recipe(name, guide, igAmount);
				recipes1[element] = *res;
				// add recipe to recipes with reference and ingredients also
				recipes->addRecipe(&recipes1[element], ingredients[element]);
				delete res;
			}
			else {
				cout << "Please give selection above 0" << endl;
			}
		}
		else if (mainoption == 4) {
		int select{ 0 };
			cout << "Modify recipe" << endl;
			cout << "---------------------------" << endl;
			cout << recipes->listRecipes() << endl;
			cout << "---------------------------" << endl;
			cout << "select: ", cin >> select;
			cout << "--------------------" << endl;
			recipes->ModifyRecipe(select);
			cout << "--------------------" << endl;

		}
		else if (mainoption == 5) {
		int select{ 0 };
			cout << "Delete recipe" << endl;
			cout << "---------------------------" << endl;
			cout << recipes->listRecipes() << endl;
			cout << "---------------------------" << endl;
			cout << "select: ", cin >> select;
			cout << "--------------------" << endl;
			// clean helper arrays and free memory, set nullptr to ingredients so memory can be freed in quit
			recipes1[select - 1] = Recipe();
			delete[] ingredients[select - 1];
			ingredients[select - 1] = nullptr;
			recipes->DeleteRecipe(select);
			cout << "--------------------" << endl;
		}
	} while (mainoption < 6);
	//cleaning memory
	delete recipe1;
	cout << "tas" << endl;
	delete recipe2;
	cout << "tas" << endl;
	delete[] recipes1;

	cout << "helper recipes cleaned..." << endl;
	for (int i{ 0 }; i < recipeAmount; i++) {
		if (ingredients[i] == nullptr && ingredients[i + 1] != nullptr)
		{
			i++;
		}
		else if (ingredients[i] == nullptr)
		{
			break;
		}
		else
		{
			delete[] ingredients[i];
			cout << "incredient " << i << ". " << "cleaned..." << endl;
		}
	}
	delete[] ingredients;
	cout << "all ingredients cleaned..." << endl;
	ingredients = NULL;
	delete recipes;
	cout << "recipes cleaned" << endl;
	cout << "program is done." << endl;
}