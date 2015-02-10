var StartPageController = function (view, model) {
	
	    view.createDinner.addEventListener("click", 
    	function(e){
    		var startPageDiv = document.getElementById("startPage");
    		startPageDiv.style.display = "none";
    		document.getElementById("viewAllDishes").style.display = "";
    	}
    );
}