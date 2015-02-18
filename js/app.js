$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	
	//And create the needed controllers and views
	var viewStartPage = new ViewStartPage($("#viewStartPage"));
	var startPageController = new StartPageController(viewStartPage, model);
	ViewAllDishes.prototype = new MotherController();
	var viewAllDishes = new ViewAllDishes($("#dinnerDishes"), model);
	var allDishesController = new AllDishesController(viewAllDishes, model);
// 	var viewMyDinnerLeft = new ViewMyDinnerLeft($("#pageLeft"), model);
// 	var myDinnerController = new MyDinnerController(viewMyDinnerLeft ,model);
	ViewRecipeDetails.prototype = new MotherController();
	var viewRecipeDetails = new ViewRecipeDetails($("#viewRecipeDetails"), model);
	RecipeDetailsController.prototype = new MotherController();
	var recipeDetailsController = new RecipeDetailsController(viewRecipeDetails, model);
// 	ViewDinnerOverview.prototype = new MotherController();
// 	var viewDinnerOverView = new ViewDinnerOverview($("#dinnerOverview"), model);
// 	var dinnerOverviewController = new DinnerOverviewController(viewDinnerOverView, model);
// 	var viewDinnerBorder = new ViewDinnerBorder($("#overviewBorder"), model);
// 	var dinnerBorderController = new DinnerBorderController(viewDinnerBorder, model);
// 	ViewPrintDinner.prototype = new MotherController();
// 	var viewPrintDinner = new ViewPrintDinner($("#printRecipe"),model);
});