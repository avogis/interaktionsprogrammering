var ViewDinnerOverview = function(model){

	var colNames = ["colOneOver", "colTwoOver", "colThreeOver"];
	
	var menu = model.getFullMenu();
	console.log("model");
	console.log(model);
	console.log("menu in DinnerOverview:");
	console.log(menu);
	console.log(menu.length);

	var firstConfirm = true;


	if(firstConfirm !== true){
		console.log("do i ever get in here?");
		for(i = 0; colNames.length; i++){
		    document.getElementById("displayChosenMenu").remove();
		}
	}

	if(menu.length !== 0){
		for(i = 0; i < menu.length; i++){
			setDishContent(colNames[i%3], menu, i)
		}		
    }

    document.getElementById("totalCostOver").innerHTML = model.getTotalMenuPrice();
    document.getElementById("myDinner").innerHTML = "My dinner: " + model.getNumberOfGuests();

	function setDishContent(colName, array, index){
		var colNameParent = document.getElementById(colName); 
		//div for pic
		var dishPicDiv = document.createElement("DIV");
		var dishPic = addAnImage(array[index]);
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
	}

	function addAnImage(dish){
        var dishPic = document.createElement("IMG");
        dishPic.src = "images/"+dish.image;
        dishPic.alt = dish.name;
        dishPic.id = dish.id;
        return dishPic;
    }

    var printBtn= document.getElementById("overviewPrintButton");
    printBtn.addEventListener("click", 
    	function(e){
    		document.getElementById("overviewContent").style.display = "none";
    		document.getElementById("overviewPrint").style.display = "none";
    		var printDiv = document.getElementById("printRecipe")
    		printDiv.style.display = "";
    		if(firstConfirm !== true){
    			clearDiv(printDiv);
    		}
    		for(i = 0; i < menu.length; i++){
    			var printDishRow = document.createElement("DIV");
    			printDishRow.className = "row"
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
    );
	
	var goBackBtn = document.getElementById("backEditButton");
    goBackBtn.addEventListener("click", 
	   	function(e){
	   		firstConfirm = false;	
	   		document.getElementById("printRecipe").style.display = "none";	
	   		document.getElementById("viewDinnerOverview").style.display = "none";	
	   		document.getElementById("viewAllDishes").style.display = "";	
	   	}
   	);

   	function clearDiv(div){
        div.innerHTML = "";
    }

}