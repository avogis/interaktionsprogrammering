$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	
	//And create the needed controllers and views
	var viewStartPage = new ViewStartPage($("#viewStartPage"));
	var viewAllDishes = new ViewAllDishes($("#dinnerDishes"));
	var viewRecipeDetails = new ViewRecipeDetails($("#viewRecipeDetails"));

});