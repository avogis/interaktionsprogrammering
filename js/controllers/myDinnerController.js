var MyDinnerController = function(view, model){
	
	view.chosenNrOfGuests.addEventListener("change", 
        function(e){
            var chosenNrOfGuests = document.getElementById("populateGuestOption");
            var chosenOption = chosenNrOfGuests.options[chosenNrOfGuests.selectedIndex].value;
            model.setNumberOfGuests(chosenOption);
            e.preventDefault();   
        }
    );

    view.tableBody.on( "click", "BUTTON", function() {
    		var srcId = event.srcElement.id;
    		var dishId = srcId.replace("addedBtn", "");
			model.removeDishFromMenu(dishId);
			var trId = "nameAndCostTr"+dishId;
			$("#"+trId).remove();	
    });

    view.confirmDinDin.addEventListener("click", 
        function(e){
            document.getElementById("viewAllDishes").style.display = "none";
            document.getElementById("dinnerOverview").style.display = "";
            document.getElementById("viewDinnerOverview").style.display = "";
            document.getElementById("overviewBorder").style.display = "";
        }
    );
}