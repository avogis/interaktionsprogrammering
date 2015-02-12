var ViewAllDishes = function (container, model) {

    this.images = null;
    this.menuScrollDiv = $("#menuScroll");   
    this.searchBtn= document.getElementById("searchButton");
    this.chosenType = document.getElementById("chooseFood");

    var menu = model.getAllAvailableDishes();
    var colNames = ["colOne", "colTwo", "colThree", "colFour", "colFive"];
    var self = this;
    var options = document.getElementById("chooseFood");
    var optionNamesTemp = [];
    var allOption = document.createElement("option");
    var allOptionText = "all";
    allOption.value = allOptionText;
    allOption.text = allOptionText;
    options.appendChild(allOption);
    optionNamesTemp.push(allOptionText);

    model.addObserver(this);

    this.update = function() {
        var allDishesOfAType = model.getAllDishes(model.getType(), model.getFilter());
        ShowAllDishes(allDishesOfAType, true); 
    }

    var ShowAllDishes = function(array, update){
        if(update == true){
            for(var i = 0; i < colNames.length; i++){
                self.clearDiv(document.getElementById(colNames[i]));
            }
        }
        if(array.length > 5){
            for(var i = 0; i < array.length; i=i+5){
                for(j = 0; j < 5; j++){
                    var index = (i+j);
                    LoopDishes(options, array, optionNamesTemp, index, j, update);
                }
            }
        }
        else{
            for(var i = 0; i < array.length; i++){
                var index = i;
                LoopDishes(options, array, optionNamesTemp, index, i, update);
            }
        }         
    }

    var LoopDishes = function(options, array, optionNamesTemp, index, colNameIndex, update){
        var colName = document.getElementById(colNames[colNameIndex]);
        if (update == false){
            setDishContent(colName, array, index);
            //options
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

    function setDishContent(colName, array, index){
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
        colName.appendChild(dishNameDiv);
        colName.appendChild(dishPicDiv);
        colName.appendChild(dishDescDiv);
    }
} 