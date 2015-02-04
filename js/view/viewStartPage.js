var ViewStartPage = function (container) {
	
	var createDinner = document.getElementById("createDinnerButton");
    createDinner.addEventListener("click", 
    	function(e){
    		var startPageDiv = document.getElementById("startPage");
    		console.log("do i even get here?");
    		startPageDiv.style.display = "none";
    		console.log(startPageDiv);
    		document.getElementById("viewAllDishes").style.display = "";
    	}
    );

}