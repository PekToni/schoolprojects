#pragma once
#include <iostream>
using namespace std;
class Recipe
{
private:
	string name;
	string guide;
	int amountOfIngredients;
public:
	Recipe();
	Recipe(string pName, string pGuide, int pAmountOfIngredients);
	Recipe(string pName);
	~Recipe();
	string getName();
	string getGuide();
	int ingredientAmount();
};

