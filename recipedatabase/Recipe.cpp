#include "pch.h"
#include "Recipe.h"


Recipe::Recipe()
{
}

Recipe::Recipe(string pName, string pGuide, int pAmountOfIngredients)
{
	name = pName;
	guide = pGuide;
	amountOfIngredients = pAmountOfIngredients;
}

Recipe::Recipe(string pName)
{
	name = pName;
	guide = "";
}

Recipe::~Recipe()
{
}

string Recipe::getName()
{
	return name;
}

string Recipe::getGuide()
{
	return guide;
}

int Recipe::ingredientAmount()
{
	return amountOfIngredients;
}

