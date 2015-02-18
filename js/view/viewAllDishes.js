var ViewAllDishes = function (container, model) {

    this.images = null;
    this.menuScrollDiv = $("#menuScroll");   
    this.searchBtn= document.getElementById("searchButton");
    this.chosenType = document.getElementById("chooseFood");

    var menu = model.getRecipeJson("Appetizers", "");
    var colNames = ["colOne", "colTwo", "colThree", "colFour", "colFive"];
    var self = this;
    var options = document.getElementById("chooseFood");

    model.addObserver(this);

    this.update = function(dishes) {
        if(dishes.length != 0 && Array.isArray(dishes)){
            ShowAllDishes(dishes, true); 
        }
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
                    LoopDishes(array, index, j, update);
                }
            }
        }
        else{
            for(var i = 0; i < array.length; i++){
                var index = i;
                LoopDishes(array, index, i, update);
            }
        }         
    }

    var LoopDishes = function(array, index, colNameIndex, update){
        var colName = document.getElementById(colNames[colNameIndex]);
        if (update == false){
            setDishContent(colName, array, index);
            //options
        }else{
            setDishContent(colName, array, index);   
        }
    }

    var categories = ["Appetizer", "Main dish", "Dessert"];
    
    for(var i = 0; i < categories.length; i++){
        var option = document.createElement("option");
        option.value = categories[i];
        option.text = categories[i];
        options.appendChild(option);
    }

    function setDishContent(colName, array, index){
        //div for pic
        var dishPicDiv = document.createElement("DIV");
        var dishPic = self.addAnImage(array[index]);
        dishPic.addEventListener("error", ImgOnError);
        dishPic.className = "img-rounded";
        dishPicDiv.appendChild(dishPic);
        //div for name
        var dishNameDiv = document.createElement("DIV");
        var dishName = document.createElement("HEADER");
        dishName.id = "allDishNames";
        dishName.innerText = array[index].name;
        dishNameDiv.appendChild(dishName);
        // //div for descriptio
        // var dishDescDiv = document.createElement("DIV");
        // var dishDesc = document.createElement("P");
        // dishDesc.id = "allDishDescriptions";
        // dishDesc.innerText = array[index].description;
        // dishDescDiv.appendChild(dishDesc);
        //append all
        colName.appendChild(dishNameDiv);
        colName.appendChild(dishPicDiv);
        // colName.appendChild(dishDescDiv);
    }

    function ImgOnError(evt){
        evt.target.src = "images/300.gif";
    }
} 