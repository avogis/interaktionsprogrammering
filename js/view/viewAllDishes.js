var ViewAllDishes = function (container, model) {

    var menu = model.getAllAvailableDishes();
    var colNames = ["colOne", "colTwo", "colThree", "colFour", "colFive"];
    var pathToImages = "images/";
    model.addObserver(this);


    var options = document.getElementById("chooseFood");
    var optionNamesTemp = [];
    var allOption = document.createElement("option");
    var allOptionText = "all";
    allOption.value = allOptionText;
    allOption.text = allOptionText;
    options.appendChild(allOption);
    optionNamesTemp.push(allOptionText);

    this.update = function() {
        var allDishesOfAType = model.getAllDishes(model.getType(), model.getFilter());
        ShowAllDishes(allDishesOfAType, true);
    }

    var ShowAllDishes = function(array, update){
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

    ShowAllDishes(menu, false);	

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
            model.setCurrentDish(event.srcElement.id);
            var searchDishDiv = document.getElementById("searchDish");
            searchDishDiv.style.display = "none";
            document.getElementById("viewRecipeDetails").style.display = "";     
        };
    }


    this.searchBtn= document.getElementById("searchButton");

    this.chosenType = document.getElementById("chooseFood");

    this.chosenNrOfGuests= document.getElementById("populateGuestOption");
         

    this.confirmDinDin= document.getElementById("confirmDinner");

} 