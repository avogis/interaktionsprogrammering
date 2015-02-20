var ViewPrintDinner = function(container, model){

	var self = this;
	// var menu = model.getFullMenu();
	model.addObserver(this);

	this.update = function(menu, string){
		if(string == "fullMenu"){
			var printDiv = document.getElementById("printRecipe");
			self.clearDiv(printDiv);
			if(menu.length > 0){
				for(var i = 0; i < menu.length; i++){
					var printDishRow = document.createElement("DIV");
					printDishRow.className = "row";
					var printDishPic = document.createElement("DIV");
					printDishPic.className = "col-md-2";
					var printDishName = document.createElement("DIV");
					printDishName.className = "col-md-3";
					var printDishPrep = document.createElement("DIV");
					printDishPrep.className = "col-md-4";
					printDishPic.appendChild(self.addAnImage(menu[i]));
					printDishName.innerHTML = menu[i].name;
					printDishPrep.innerHTML = menu[i].description;
					printDishRow.appendChild(printDishPic);
					printDishRow.appendChild(printDishName);
					printDishRow.appendChild(printDishPrep);
					printDiv.appendChild(printDishRow);
				}
			}
		}
	}
}