var ViewAllDishes = function (container) {

    var model = new DinnerModel();
    var menu = model.getFullMenu();

    var colNames = ["colOne", "colTwo", "colThree", "colFour", "colFive"];
    var optionNamesTemp = [];

    var options = document.getElementById("chooseFood");

    for(i = 0; i < menu.length; i=i+5){
    	for(j = 0; j < 5; j++){
    		var colName = document.getElementById(colNames[j]);
    		//div for pic
    		var dishPicDiv = document.createElement("DIV");
    		var dishPic = document.createElement("IMG");
    		dishPic.src = "images/"+menu[i+j].image;
    		dishPic.alt = menu[i+j].name;
    		dishPic.id = "allDishPics";
    		dishPicDiv.appendChild(dishPic);
    		//div for name
    		var dishNameDiv = document.createElement("DIV");
    		var dishName = document.createElement("HEADER");
    		dishName.id = "allDishNames";
    		dishName.innerText = menu[i+j].name;
    		dishNameDiv.appendChild(dishName);
    		//div for descriptio
    		var dishDescDiv = document.createElement("DIV");
    		var dishDesc = document.createElement("P");
    		dishDesc.id = "allDishDescriptions";
    		dishDesc.innerText = menu[i+j].description;
    		dishDescDiv.appendChild(dishDesc);
    		//append all
    		colName.appendChild(dishNameDiv);
    		colName.appendChild(dishPicDiv);
    		colName.appendChild(dishDescDiv);
    		//oprions
    		var type = menu[i+j].type;
    		var found = optionNamesTemp.indexOf(type);
			if(found == -1){
				var option = document.createElement("option");
				option.value = type;
				option.text = type;
				options.appendChild(option);
				optionNamesTemp.push(type);
			}
    	}
    }	
	  //   	if(i == 1){ //i don't understand why this isn't working
	  //   		var found = optionNamesTemp.indexOf(menu[i][j][0]);
			// 	if(found == -1){
			// 		var option = document.createElement("option");
			// 		option.value = menu[i][j][0];
			// 		option.text = menu[i][j][0];
			// 		options.appendChild(option);
			// 		optionNamesTemp.push(menu[i][j][0]);
			// 	}
			// }


    var temp = document.getElementById("searchButton");
    temp.addEventListener("click", 
    	function(e){
    		var choice = document.getElementById("chooseFood");
			var chosenOption = choice.options[choice.selectedIndex].value;

			var chosenIngridient = document.getElementById("chooseIngridient").value;
			console.log(chosenIngridient);
    		var chosenDish = model.getAllDishes(chosenOption, chosenIngridient);
    		e.preventDefault(); //making the page not reload
    		console.log(chosenDish);
    	}
    	);

} 