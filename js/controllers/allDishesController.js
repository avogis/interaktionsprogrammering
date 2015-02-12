var AllDishesController = function (view, model) {
    
    view.searchBtn.addEventListener("click", 
		function(e){
			var choice = document.getElementById("chooseFood");
			var chosenOption = choice.options[choice.selectedIndex].value;
	        var chosenIngridient = document.getElementById("chooseIngridient").value;
	        model.setType(chosenOption);
	        model.setFilter(choosenIngridient);
			e.preventDefault(); 
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

    view.menuScrollDiv.on( "click", "img", function() {
        model.setCurrentDish(event.srcElement.id);
        var searchDishDiv = document.getElementById("searchDish");
        searchDishDiv.style.display = "none";
        document.getElementById("viewRecipeDetails").style.display = ""; 
    });

}