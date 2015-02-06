var ViewAllDishes = function (container, model) {

    var menu = model.getAllAvailableDishes();
    var colNames = ["colOne", "colTwo", "colThree", "colFour", "colFive"];
    var pathToImages = "images/";


    var options = document.getElementById("chooseFood");
    var optionNamesTemp = [];
    var allOption = document.createElement("option");
    var allOptionText = "all";
    allOption.value = allOptionText;
    allOption.text = allOptionText;
    options.appendChild(allOption);
    optionNamesTemp.push(allOptionText);

    var ShowMenu = function(container, array, update){
        if(update == true){
            for(i = 0; i < colNames.length; i++){
                clearDiv(document.getElementById(colNames[i]));
            }
        }
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


    //ALL OF THIS SHOULD BE IN IN ANOTHER CONTROLLER
    var images = document.getElementsByTagName("img");
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
            clearDiv(imageDiv);
            imageDiv.appendChild(addImage);
            var ingriedientsList = document.getElementById("headerIngriedients");
            ingriedientsList.innerHTML = "Dinner for " + nrGuests + " people";
            var ingriedients = document.getElementById("igredientTable");
            clearDiv(ingriedients);
            var listOfIngridients = dish.ingredients;
            var priceForADish = 0;
            for(i = 0; i < listOfIngridients.length; i++){
                var ingriedient = document.createElement("TR");
                var amount = document.createElement("TD");
                var product = document.createElement("TD");
                var sek = document.createElement("TD");
                var price = document.createElement("TD");
                ingriedient.id = "ingriedient"+i;
                amount.id = "amount"+i;
                product.id = "product"+i;
                sek.id = "sek"+i;
                price.id = "price"+i;
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
                document.getElementById("dishCost").innerHTML = priceForADish;
            }
            document.getElementById("totalCostViewDish").innerHTML = priceForADish;
            document.getElementById("viewRecipeDetails").style.display = "";
        };
    }



    // var table= document.getElementById("dishNameAndCostTBody");
    // var allDishesInMenu = table.getElementsByTagName("TR")
    // for(i = 0; i < allDishesInMenu.length; i++){
    //     allDishesInMenu[i].addEventListener("click", 
    //                 function(e){
    //                     console.log(e.srcElement);
    //                 }
    //             );
    // }


    var searchBtn= document.getElementById("searchButton");
    searchBtn.addEventListener("click", 
    	function(e){
    		var choice = document.getElementById("chooseFood");
			var chosenOption = choice.options[choice.selectedIndex].value;
            var chosenIngridient = document.getElementById("chooseIngridient").value;
    		var chosenDish = model.getAllDishes(chosenOption, chosenIngridient);
    		e.preventDefault(); //making the page not reload
            var tempArray= [];
            for(i = 0; i < chosenDish.length; i++){
                tempArray.push(chosenDish[i]);
            }
            ShowMenu(container, tempArray, true);
    	}
    );

    var chosenType= document.getElementById("chooseFood");
    chosenType.addEventListener("change", 
        function(e){
            var chosenType = document.getElementById("chooseFood");
            var chosenOption = chosenType.options[chosenType.selectedIndex].value;
            var allDishesOfAType = model.getSelectedDish(chosenOption);
            e.preventDefault();
            ShowMenu(container, allDishesOfAType, true);     
        }
    );

    var chosenNrOfGuests= document.getElementById("populateGuestOption");
    chosenNrOfGuests.addEventListener("change", 
        function(e){
            var chosenNrOfGuests = document.getElementById("populateGuestOption");
            var chosenOption = chosenNrOfGuests.options[chosenNrOfGuests.selectedIndex].value;
            model.setNumberOfGuests(chosenOption);
            e.preventDefault();   
        }
    );     

    var confirmDinDin= document.getElementById("confirmDinner");
    confirmDinDin.addEventListener("click", 
        function(e){
            document.getElementById("viewAllDishes").style.display = "none";
            ViewDinnerOverview(model);
            document.getElementById("overviewContent").style.display = "";
            document.getElementById("viewDinnerOverview").style.display = "";
            document.getElementById("overviewPrint").style.display = "";
        }
    );
} 