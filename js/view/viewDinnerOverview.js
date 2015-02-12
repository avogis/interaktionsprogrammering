var ViewDinnerOverview = function(container, model){

	var colNames = ["colOneOver", "colTwoOver", "colThreeOver"];

	var self = this;
    this.printBtn= document.getElementById("overviewPrintButton");

	model.addObserver(this);

	this.update = function(){

		self.clearDiv(document.getElementById("displayChosenMenu"));
		var menu = model.getFullMenu();

		if(menu.length !== 0){
			for(var i = 0; i < menu.length; i++){
				setDishContent(colNames[i%3], menu, i);
			}		
	    }

	    document.getElementById("totalCostOver").innerHTML = model.getTotalMenuPrice();
	}

	function setDishContent(colName, array, index){
		var colNameParent = document.createElement("DIV");
		colNameParent.className = "col-md-2";
		colNameParent.id = colName; 
		//div for pic
		var dishPicDiv = document.createElement("DIV");
		var dishPic = self.addAnImage(array[index]);
		dishPic.className = "img-rounded";
		dishPicDiv.appendChild(dishPic);
		//div for name
		var dishNameDiv = document.createElement("DIV");
		var dishName = document.createElement("HEADER");
		dishName.id = "allDishNames";
		dishName.innerText = array[index].name;
		dishNameDiv.appendChild(dishName);
		//div for descriptio
		var dishDescDiv = document.createElement("DIV");
		var dishDesc = document.createElement("P");
		dishDesc.id = "allDishDescriptions";
		dishDesc.innerText = array[index].description;
		dishDescDiv.appendChild(dishDesc);
		//append all
		colNameParent.appendChild(dishNameDiv);
		colNameParent.appendChild(dishPicDiv);
		colNameParent.appendChild(dishDescDiv);
		document.getElementById("displayChosenMenu").appendChild(colNameParent);
	}
}