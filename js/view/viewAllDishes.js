var ViewAllDishes = function (container) {

    var model = new DinnerModel();
    var menu = model.getFullMenu();
    var text = "";

    this.names = container.find("#dinnerName");
	    var myTableDiv = document.getElementById("dinnerDishes");
	    var table = document.createElement('TABLE');
	    var tableBody = document.createElement('TBODY');

	    table.border = '1';
	    table.appendChild(tableBody);

	    //TABLE ROWS
		for (i = 0; i < menu.length; i++) {
		    var tr = document.createElement('TR');
		    for (j = 0; j < menu[i].length; j++) {
		        var td = document.createElement('TD')
		        td.appendChild(document.createTextNode(menu[i][j]));
		        tr.appendChild(td)
		    }
		    tableBody.appendChild(tr);
		}

	    myTableDiv.appendChild(table)

} 