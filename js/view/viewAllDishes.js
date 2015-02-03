var ViewAllDishes = function (container) {

    var model = new DinnerModel();
    var menu = model.getFullMenu();
    var colNames = ["colOne", "colTwo", "colThree", "colFour", "colFive"];

    var ShowMenu = function(container, array, update){
        if(update == true){
            for(i = 0; i < colNames.length; i++){
                clearDiv(document.getElementById(colNames[i]));
            }
        }
        console.log(array);
        var options = document.getElementById("chooseFood");
        var optionNamesTemp = [];
        if(array.length > 5){
            for(i = 0; i < array.length; i=i+5){
                for(j = 0; j < 5; j++){
                    var index = (i+j);
                    LoopDishes(options, array, optionNamesTemp, index, j, update);
                }
            }
        }
        else{
            for(i = 0; i < array.length; i++){
                var index = i;
                LoopDishes(options, array, optionNamesTemp, index, i, update);
            }
        }         
    }

    var LoopDishes = function(options, array, optionNamesTemp, index, colNameIndex, update){
        var colName = document.getElementById(colNames[colNameIndex]);
        if (update == false){
            setDishContent(colName, array, index);
            //oprions
            var type = menu[index].type;
            var found = optionNamesTemp.indexOf(type);
            if(found == -1){
                var option = document.createElement("option");
                option.value = type;
                option.text = type;
                options.appendChild(option);
                optionNamesTemp.push(type);
            }
        }else{
            setDishContent(colName, array, index);   
        }
    }

    ShowMenu(container, menu, false);

    //is it prehaps better to replace div content rather clear a whole div? 
    //lets ask someone
    function ReplaceContentInWholeDiv(wholeDiv, dish){
        //replace div pic 
        //replace div name
        //replace div description

    }

    function ReplaceContentInContainer(id, content) {
        var container = document.getElementById(id);
        container.innerHTML = content;
    }	

    function clearDiv(div){
        console.log("YOOO? kommer jag in här?")
        div.innerHTML = "";
    }

    function setDishContent(colName, array, index){
        //div for pic
        var dishPicDiv = document.createElement("DIV");
        var dishPic = document.createElement("IMG");
        dishPic.src = "images/"+array[index].image;
        dishPic.alt = array[index].name;
        dishPic.id = "allDishPics";
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
        colName.appendChild(dishNameDiv);
        colName.appendChild(dishPicDiv);
        colName.appendChild(dishDescDiv);
    }

    populateNrOfGuest("populateGuestOption");

    function populateNrOfGuest(divName){
        var nrOfGuests = document.getElementById(divName);
        for(i = 0; i <= 15; i++){
            var option = document.createElement("option");
            option.value = i;
            option.text = i;
            nrOfGuests.appendChild(option);
        }
    }

    model.setNumberOfGuests("11");
    console.log(model.getNumberOfGuests());

    var temp = document.getElementById("searchButton");
    temp.addEventListener("click", 
    	function(e){
    		var choice = document.getElementById("chooseFood");
			var chosenOption = choice.options[choice.selectedIndex].value;
            var chosenIngridient = document.getElementById("chooseIngridient").value;
			console.log(chosenIngridient);
    		var chosenDish = model.getAllDishes(chosenOption, chosenIngridient);
    		e.preventDefault(); //making the page not reload
            var temp = [];
            for(i = 0; i < chosenDish.length; i++){
                temp.push(chosenDish[i]);
            }
            console.log(temp);
            ShowMenu(container, temp, true);
    	}
    	);

} 