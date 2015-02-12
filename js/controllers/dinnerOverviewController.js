var DinnerOverviewController = function(view, model) {

	view.printBtn.addEventListener("click", 
    	function(e){
    		document.getElementById("printRecipe").style.display = "";
            document.getElementById("viewDinnerOverview").style.display = "none";
    	}
    );
}