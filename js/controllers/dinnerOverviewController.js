var DinnerOverviewController = function(view, model) {

	view.printBtn.addEventListener("click", 
    	function(e){
    		document.getElementById("overviewContent").style.display = "none";
    		document.getElementById("overviewPrint").style.display = "none";
    		document.getElementById("printRecipe").style.display = "";
    	}
    );

	function clearDiv(div){
	        div.innerHTML = "";
	}
}