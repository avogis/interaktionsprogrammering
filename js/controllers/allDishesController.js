var AllDishesController = function (view, model) {
    
    view.searchBtn.addEventListener("click", 
		function(e){
            $('#waitMessage').trigger('click');
			var choice = document.getElementById("chooseFood");
			var chosenOption = choice.options[choice.selectedIndex].value;
	        var chosenIngridient = document.getElementById("chooseIngridient").value;
            e.preventDefault();
	        // model.setType(chosenOption);
	        model.setFilter(chosenIngridient, chosenOption); 
            chooseIngridient.value = "";
		}
	);

	view.chosenType.addEventListener("change", 
        function(e){
            $('#waitMessage').trigger('click');
            var chosenType = document.getElementById("chooseFood");
            var chosenOption = chosenType.options[chosenType.selectedIndex].value;
            model.getRecipeJson(chosenOption, "");
            // e.preventDefault();
        }
    );

    view.menuScrollDiv.on( "click", "img", function() {
        // $('#waitMessage').trigger('click');
        model.setCurrentDish(event.srcElement.id);
        var searchDishDiv = document.getElementById("searchDish");
        searchDishDiv.style.display = "none";
        document.getElementById("viewRecipeDetails").style.display = ""; 
    });

}