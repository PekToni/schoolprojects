#pragma once
#include "Recipe.h"
#include <iostream>
using namespace std;
class Ingredient :
	public Recipe
{
private:
	string ingredient;
	int amount;
	string unit;
	int ingredientAmount;
public:
	Ingredient();
	Ingredient(string pName, int pAmount, string pUnit);
	~Ingredient();
	string getAmountAndUnits();
};

