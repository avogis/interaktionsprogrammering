var ViewAllDishes = function (container) {

    var model = new DinnerModel();
    var menu = model.getAllAvailableDishes();
    var colNames = ["colOne", "colTwo", "colThree", "colFour", "colFive"];
    var pathToImages = "images/";

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

    function addAnImage(dish){
        var dishPic = document.createElement("IMG");
        dishPic.src = pathToImages+dish.image;
        dishPic.alt = dish.name;
        dishPic.id = dish.id;
        return dishPic;
    }

    model.setNumberOfGuests("11");
    console.log(model.getNumberOfGuests());

    model.getSelectedDish("starter");

    var tempArray = [];
    tempArray.push(menu[0]);
    tempArray.push(menu[4]);
    model.getAllIngredients(tempArray);
    // console.log("totalMenuPrice: ");
    // console.log(model.getTotalMenuPrice(tempArray));
    // console.log("add dish to menu: ");
    // console.log(model.addDishToMenu(2));

    var images = document.getElementsByTagName("img");

    //ALL OF THIS SHOULD BE IN IN ANOTHER CONTROLLER
    for(var i = 0; i < images.length; i++) {
        var image = images[i];
        image.onclick = function(event) {
            var nrGuests = model.getNumberOfGuests();
            var searchDishDiv = document.getElementById("searchDish");
            searchDishDiv.style.display = "none";
            var clickedOnImageId = event.srcElement.id;
            var dish = model.getDish(clickedOnImageId);
            var imageDiv = document.getElementById("imageOfChosenDish");
            var addImage = addAnImage(dish);
            var dishName = document.getElementById("nameOfDish");
            dishName.innerHTML = dish.name;
            imageDiv.appendChild(addImage);
            var ingriedientsList = document.getElementById("headerIngriedients");
            ingriedientsList.innerHTML = "Dinner for " + nrGuests + " people";
            var ingriedients = document.getElementById("igredientTable");
            var listOfIngridients = dish.ingredients;
            console.log(listOfIngridients.length);
            var priceForADish = 0;
            for(i = 0; i < listOfIngridients.length; i++){
                var ingriedient = document.createElement("TR");
                var amount = document.createElement("TD");
                var product = document.createElement("TD");
                var sek = document.createElement("TD");
                var price = document.createElement("TD");
                amount.innerHTML = (listOfIngridients[i].quantity  * nrGuests) + " " + listOfIngridients[i].unit;
                product.innerHTML = listOfIngridients[i].name;
                sek.innerHTML = "SEK";
                price.innerHTML = (listOfIngridients[i].price * nrGuests); 
                ingriedient.appendChild(amount);
                ingriedient.appendChild(product);
                ingriedient.appendChild(sek);
                ingriedient.appendChild(price);
                ingriedients.appendChild(ingriedient);
                document.getElementById("description").innerHTML = dish.description;
                priceForADish = priceForADish + (listOfIngridients[i].price * nrGuests);
            }
            document.getElementById("totalCostViewDish").innerHTML = priceForADish;
            document.getElementById("viewRecipeDetails").style.display = "";
        };
    }


    var temp = document.getElementById("searchButton");
    temp.addEventListener("click", 
    	function(e){
    		var choice = document.getElementById("chooseFood");
			var chosenOption = choice.options[choice.selectedIndex].value;
            var chosenIngridient = document.getElementById("chooseIngridient").value;
			//console.log(chosenIngridient);
    		var chosenDish = model.getAllDishes(chosenOption, chosenIngridient);
    		e.preventDefault(); //making the page not reload
            var temp = [];
            for(i = 0; i < chosenDish.length; i++){
                temp.push(chosenDish[i]);
            }
            //console.log(temp);
            ShowMenu(container, temp, true);
    	}
    );

} 