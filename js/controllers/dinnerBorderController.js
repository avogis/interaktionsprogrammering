var DinnerBorderController = function(view, model) {
	
	view.goBackBtn.addEventListener("click",

	   	function(e){
	   		// firstConfirm = false;	
	   		document.getElementById("printRecipe").style.display = "none";
	   		document.getElementById("overviewContent").style.display = "none";
	   		document.getElementById("viewDinnerOverview").style.display = "none";
    		document.getElementById("overviewPrint").style.display = "none";		
	   		document.getElementById("viewAllDishes").style.display = "";	
	   	}
   	);
}