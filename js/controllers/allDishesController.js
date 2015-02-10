var AllDishesController = function (view, model) {
    
    view.searchBtn.addEventListener("click", 
		function(e){
			var choice = document.getElementById("chooseFood");
			var chosenOption = choice.options[choice.selectedIndex].value;
	        var chosenIngridient = document.getElementById("chooseIngridient").value;
	        model.setType(chosenOption);
	        model.setFilter(chooseIngridient);
			e.preventDefault(); //making the page not reload
		}
	);

	view.chosenType.addEventListener("change", 
        function(e){
            var chosenType = document.getElementById("chooseFood");
            var chosenOption = chosenType.options[chosenType.selectedIndex].value;
            model.setType(chosenOption);
            e.preventDefault();
        }
    );

    view.chosenNrOfGuests.addEventListener("change", 
        function(e){
            var chosenNrOfGuests = document.getElementById("populateGuestOption");
            var chosenOption = chosenNrOfGuests.options[chosenNrOfGuests.selectedIndex].value;
            model.setNumberOfGuests(chosenOption);
            e.preventDefault();   
        }
    );

    view.confirmDinDin.addEventListener("click", 
        function(e){
            document.getElementById("viewAllDishes").style.display = "none";
            ViewDinnerOverview(model);
            document.getElementById("overviewContent").style.display = "";
            document.getElementById("viewDinnerOverview").style.display = "";
            document.getElementById("overviewPrint").style.display = "";
        }
    );
}