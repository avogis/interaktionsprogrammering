var ViewAllDishes = function (container) {

    var model = new DinnerModel();
    var menu = model.getFullMenu();

    var myTableDiv = document.getElementById("dinnerDishes");
    var table = document.createElement('TABLE');
    table.id = "menu";
    var tableBody = document.createElement('TBODY');

    table.border = '1';
    table.appendChild(tableBody);

    var options = document.getElementById("chooseFood");
    var optionNamesTemp = [];

	for (i = 0; i < menu.length; i++) {
	    var tr = document.createElement('TR');
	    tr.id = "trViewAllDishes";
	    for (j = 0; j < menu[i].length; j++) {
	    	if(i == 2){
	    		var td = document.createElement('TD');
	    		var img = document.createElement('IMG');
	    		img.id = "foodPic";
	    		img.src = "images/"+menu[i][j];
	    		td.appendChild(img);
		        tr.appendChild(td);
		    }
	    	if(i == 0){
				var td = document.createElement('TD');
		        td.id = "foodName"
		        td.appendChild(document.createTextNode(menu[i][j]));
		        tr.appendChild(td);
	    	}
	    	if(i == 1){ //i don't understand why this isn't working
	    		var found = optionNamesTemp.indexOf(menu[i][j]);
				if(found == -1){
					var option = document.createElement("option");
					option.value = menu[i][j];
					option.text = menu[i][j];
					options.appendChild(option);
					optionNamesTemp.push(menu[i][j].key);
				}
			}
	    	if(i==3){
    			var td = document.createElement('TD');
    			td.id = "foodDescription";
		        td.appendChild(document.createTextNode(menu[i][j]));
		        tr.appendChild(td);
		    }
	    }
	    tableBody.appendChild(tr);
	}
    myTableDiv.appendChild(table);

    var e = document.getElementById("chooseFood");
	var chosenOption = e.options[e.selectedIndex].value;

	var chosenIngridient = document.getElementById("chooseIngridient").value;
	alert("chosenIngridient: "+chosenIngridient);

    var temp = document.getElementById("searchButton").onClick(model.getAllDishes(chosenOption, chosenIngridient));
} 