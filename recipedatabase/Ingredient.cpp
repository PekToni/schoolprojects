#include "pch.h"
#include "Ingredient.h"
#include <string>


Ingredient::Ingredient()
{
}

Ingredient::Ingredient(string pName, int pAmount, string pUnit) : Recipe(pName)
{
	amount = pAmount;
	unit = pUnit;
}


Ingredient::~Ingredient()
{
}

string Ingredient::getAmountAndUnits()
{
	string str = to_string(amount) + " " + unit;
	return str;
}

