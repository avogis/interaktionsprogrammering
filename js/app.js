$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	
	//And create the needed controllers and views
	var viewStartPage = new ViewStartPage($("#viewStartPage"));
	var startPageController = new StartPageController(viewStartPage, model);
	var viewAllDishes = new ViewAllDishes($("#dinnerDishes"), model);
	var allDishesController = new AllDishesController(viewAllDishes, model);
	var viewRecipeDetails = new ViewRecipeDetails($("#viewRecipeDetails"), model);
	var recipeDetailsController = new RecipeDetailsController(viewRecipeDetails, model);

});