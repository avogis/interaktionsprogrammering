var ViewRecipeDetails = function (container) {

	var model = new DinnerModel();

	var temp = document.getElementById("confirmDishButton");
    temp.addEventListener("click", 
    	function(e){
    		var imageDiv = document.getElementById("imageOfChosenDish");
    		var img = imageDiv.getElementsByTagName("img");
    		var id = img[0].id;
    		model.addDishToMenu(id);
    		document.getElementById("searchDish").style.display = "";
            document.getElementById("viewRecipeDetails").style.display = "none";
    	}
    );

}