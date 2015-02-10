var ViewPrintDinner = function(container, model){
	var menu = model.getFullMenu();
	model.addObserver(this);

	this.update = function(){
		if(menu.length > 0){
			var printDiv = document.getElementById("printRecipe");
			clearDiv(printDiv);
			for(var i = 0; i < menu.length; i++){
				var printDishRow = document.createElement("DIV");
				printDishRow.className = "row";
				var printDishPic = document.createElement("DIV");
				printDishPic.className = "col-md-2";
				var printDishName = document.createElement("DIV");
				printDishName.className = "col-md-3";
				var printDishPrep = document.createElement("DIV");
				printDishPrep.className = "col-md-4";
				printDishPic.appendChild(addAnImage(menu[i]));
				printDishName.innerHTML = menu[i].name;
				printDishPrep.innerHTML = menu[i].description;
				printDishRow.appendChild(printDishPic);
				printDishRow.appendChild(printDishName);
				printDishRow.appendChild(printDishPrep);
				printDiv.appendChild(printDishRow);
			}
		}
	}


	function addAnImage(dish){
        var dishPic = document.createElement("IMG");
        dishPic.src = "images/"+dish.image;
        dishPic.alt = dish.name;
        dishPic.id = dish.id;
        return dishPic;
    }

    function clearDiv(div){
        div.innerHTML = "";
    }
}