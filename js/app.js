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
	var viewDinnerOverView = new ViewDinnerOverview($("#dinnerOverview"), model);
	var dinnerOverviewController = new DinnerOverviewController(viewDinnerOverView, model);
	var viewDinnerBorder = new ViewDinnerBorder($("#overviewBorder"), model);
	var dinnerBorderController = new DinnerBorderController(viewDinnerBorder, model);
	var viewPrintDinner = new ViewPrintDinner($("#printRecipe"),model);
});