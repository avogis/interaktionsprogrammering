var ViewRecipeDetails = function (container, model) {


	var temp = document.getElementById("confirmDishButton");
    temp.addEventListener("click", 
    	function(e){
    		var imageDiv = document.getElementById("imageOfChosenDish");
    		var img = imageDiv.getElementsByTagName("img");
    		var id = img[0].id;
    		model.addDishToMenu(id);
    		document.getElementById("searchDish").style.display = "";
			clearDiv(document.getElementById("imageOfChosenDish"));
			var dishNameAndCostTBody = document.getElementById("dishNameAndCostTBody");
			var dishNameAndCostTR = document.createElement("TR");
			var dishName = document.createElement("TD");
			dishName.innerHTML = model.getDish(id).name;
			var dishCost = document.createElement("TD");
			dishCost.innerHTML = model.getTotalMenuPrice();
			dishNameAndCostTR.appendChild(dishName);
			dishNameAndCostTR.appendChild(dishCost);
			dishNameAndCostTBody.appendChild(dishNameAndCostTR);
			document.getElementById("dishCost").innerHTML = "0.0";
			document.getElementById("totalSek").innerHTML = model.getTotalMenuPrice()+" SEK";
            document.getElementById("viewRecipeDetails").style.display = "none";
    	}
    );

    function clearDiv(div){
        div.innerHTML = "";
    }

}