var ViewPrintDinner = function(container, model){

	var self = this;
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
					printDishPic.className = "col-md-10";
					
					var printDishName = document.createElement("DIV");
					printDishName.className = "col-md-10";
					var header = document.createElement("H2");
					header.innerHTML = menu[i].name;
					printDishName.appendChild(header);
					
					var printDishPrep = document.createElement("DIV");
					printDishPrep.innerHTML = menu[i].description;
					// printDishPrep.align = "left";
					// printDishPrep.display = "block"
					
					var dishPic = document.createElement("IMG");
					dishPic.src = menu[i].image;
					dishPic.className = "img-rounded";
					dishPic.id = "printPic";
					// dishPic.align = "right";



					printDishRow.appendChild(printDishName);
					printDishPic.appendChild(dishPic);
					printDishPic.appendChild(printDishPrep);
					printDishRow.appendChild(printDishPic);
					// printDishRow.appendChild(printDishPrep);
					printDiv.appendChild(printDishRow);
				}
			}
		}
	}
}