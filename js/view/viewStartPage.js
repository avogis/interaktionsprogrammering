var ViewStartPage = function (container) {
	
	var createDinner = document.getElementById("createDinnerButton");
    createDinner.addEventListener("click", 
    	function(e){
    		var startPageDiv = document.getElementById("startPage");
    		startPageDiv.style.display = "none";
    		document.getElementById("viewAllDishes").style.display = "";
    	}
    );

}