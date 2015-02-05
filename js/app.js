$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	
	//And create the needed controllers and views
	var viewStartPage = new ViewStartPage($("#viewStartPage"));
	var viewAllDishes = new ViewAllDishes($("#dinnerDishes"), model);
	var viewRecipeDetails = new ViewRecipeDetails($("#viewRecipeDetails"), model);
	// var viewDinnerOverview = new ViewDinnerOverview(model);

});