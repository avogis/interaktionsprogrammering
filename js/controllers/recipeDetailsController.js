var RecipeDetailsController = function (view, model) {

    var self = this;

	 view.confirmButton.addEventListener("click", 
    	function(e){
            document.getElementById("searchDish").style.display = "";
    		var imageDiv = document.getElementById("imageOfChosenDish");
    		var img = imageDiv.getElementsByTagName("img");
    		var id = img[0].id;
    		model.addDishToMenu(id); //hur kan man lägga in en dish här?????
            model.getDish(id);
            document.getElementById("dishCost").innerHTML = "0.0";
			self.clearDiv(document.getElementById("imageOfChosenDish"));
            document.getElementById("viewRecipeDetails").style.display = "none";
    	}
    );

	view.backButton.addEventListener("click", 
    	function(e){
    		document.getElementById("viewRecipeDetails").style.display = "none";	
    		document.getElementById("searchDish").style.display = "";	
    	}
    );

}