var recipe = function(name, calories, ingredients, difficulty, diet, health, summary, yield, image, recipe) {
	this.name = name;
	this.calories = calories;
	this.ingredients = ingredients;
	this.difficulty = difficulty;
	this.diet = diet;
	this.health = health;
	this.summary = summary;
	this.yield = yield;
	this.image = image;
	this.recipe = recipe;
}

module.exports = recipe;