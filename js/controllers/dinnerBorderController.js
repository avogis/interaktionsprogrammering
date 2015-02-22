var DinnerBorderController = function(view, model) {
	
	view.goBackBtn.addEventListener("click",
	   	function(e){
   			document.getElementById("viewAllDishes").style.display = "";
            document.getElementById("viewDinnerOverview").style.display = "none";
            document.getElementById("overviewBorder").style.display = "none";
            document.getElementById("printRecipe").style.display = "none";
	  	}
	);
}