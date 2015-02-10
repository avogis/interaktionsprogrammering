var DinnerOverviewController = function(view, model) {
	view.printBtn.addEventListener("click", 
    	function(e){
    		document.getElementById("overviewContent").style.display = "none";
    		document.getElementById("overviewPrint").style.display = "none";
    		var printDiv = document.getElementById("printRecipe");
    		clearDiv(printDiv);
    		printDiv.style.display = "";
    	}
    );

	function clearDiv(div){
	        div.innerHTML = "";
	}
}