//DinnerModel Object constructor
var DinnerModel = function() {

	var fullMenu = [];
	var lastAddedDish = null;
	var numberOfMyGuests = 0; 
	var observers = [];
	var currentDish = null;
	var apiKey = "dvx96F0ts86514dMmAyK4Jz44kHs47Us";
	var theDish = null;

	this.getTheDish = function(){
		return theDish;
	}

	//add Observers
	this.addObserver = function(observer) {
		observers.push(observer);
	}

	//notify observers
	notifyObservers = function(dishes, string) {
		for(var i = 0; i < observers.length; i++){
			observers[i].update(dishes, string);
		}
	}

	this.getCurrentDish = function() {
		return currentDish;
	}

	this.setCurrentDish = function(recipeID) {
		var dish={};
		var url = "http://api.bigoven.com/recipe/" + recipeID + "?api_key="+apiKey;
        $.ajax({
            type: "GET",
            dataType: 'json',
            cache: false,
            url: url,
            success: function (data) {
            	dish["id"] = data["RecipeID"];
	        	dish["name"] = data["Title"];
	        	dish["description"] = data["Instructions"];
	        	dish["image"]  = data["ImageURL"];
	        	var tempIngridients = data["Ingredients"];
	        	var ingredientsList = [];
	        	for(var i =0; i < tempIngridients.length; i++){
	        		var ingredientsMap = {};;
	        		ingredientsMap["name"] = tempIngridients[i]["Name"];
	        		var quantityTemp = tempIngridients[i]["Quantity"];
	        		ingredientsMap["quantity"] = tempIngridients[i]["Quantity"];
	        		ingredientsMap["price"] = quantityTemp;
	        		var unit = tempIngridients[i]["Unit"];
	        		if(unit == null){
	        			ingredientsMap["unit"] = "";	
	        		}else{
	        			ingredientsMap["unit"] = unit;
	        		}
	        		ingredientsList.push(ingredientsMap);
	        	}
	        	dish["ingredients"] = ingredientsList;
	        	internCurrentDish(dish);
            },
        	error: errorFunction
        });
	}

	internCurrentDish = function(dish){
		currentDish = dish;
		notifyObservers(dish, "currentDish");
	}

	this.setFilter = function(keyword, category) {
        var url = "http://api.bigoven.com/recipes?pg=1&rpp=25&include_primarycat="
          + category + "&any_kw="
          + keyword + "&api_key="+apiKey;
        $.ajax({
            type: "GET",
            dataType: 'json',
            cache: true,
            url: url,
            success: function (data) {
                var dishes = [];
                var allInfo = data["Results"];
                for(var i=0; i < allInfo.length; i++){
                    var dishMap = {};
                    var dish = allInfo[i];
                    var id = dish["RecipeID"];
                    var name = dish["Title"];
                    var image = dish["ImageURL120"];
                    var category = dish["Category"];
                    dishMap["name"] = name;
                    dishMap["id"] = id;
                    dishMap["image"] = image;
                    dishMap["category"] = category;
                    dishes.push(dishMap);
                }
                notifyObservers(dishes, "availableDishes");
            },
            error: errorFunction
        });
		
	}

	this.getLastAddedDish = function(){
		return lastAddedDish;
	}


	//TODO Lab 2 implement the data structure that will hold number of guest
	// and selected dinner options for dinner menu

	//OR WHAT DO YOU MEAN? DON`T UNDERSTAND
	this.setNumberOfGuests = function(num) {
		numberOfMyGuests = num; 
		notifyObservers(numberOfMyGuests, "numberOfMyGuests");
	}

	// should return 
	this.getNumberOfGuests = function() {
		return numberOfMyGuests;
	}

	//Returns the dish that is on the menu for selected type 
	this.getSelectedDish = function(type) {
		if(type == "all"){
			return dishes;
		}else{
			var arrayToReturn = [];
			for(i = 0; i < dishes.length; i++){
				if(dishes[i].type === type){
					arrayToReturn.push(dishes[i]);
				}
			}
			return arrayToReturn;
		}
	}

	//Returns all the dishes on the menu.
	//missinterpreted this one!
	//i think that the menu should be passed throught the controller right?
	//remove the parameter menu afterwards
	this.getFullMenu = function() {
		return fullMenu;
	}

	//HOW DO I ACCESS THE DISHES OTHERWISE?
	this.getRecipeJson = function(category, searchword) {
    //prototyp för getAllDishes
        var url = "http://api.bigoven.com/recipes?pg=1&rpp=100&include_primarycat="
                  + category
                  + "&api_key="+apiKey;
        $.ajax({
            type: "GET",
            dataType: 'json',
            cache: true,
            url: url,
            success: function (data) {
                // alert('success');
                var dishes = [];
                var allInfo = data["Results"];
                for(var i=0; i < allInfo.length; i++){
                    var dishMap = {};
                    var dish = allInfo[i];
                    var id = dish["RecipeID"];
                    var name = dish["Title"];
                    var image = dish["ImageURL120"];
                    var category = dish["Category"];
                    dishMap["name"] = name;
                    dishMap["id"] = id;
                    dishMap["image"] = image;
                    dishMap["category"] = category;
                    dishes.push(dishMap);
                }
                //notifyObservers med listan
                // console.log(dishes);
                notifyObservers(dishes, "availableDishes");
            },
           	error: errorFunction
        });
    }

    errorFunction = function(xhr, ajaxOptions, thrownError){
  //  		if(xhr.status == 0){
		// 	alert("It appears that you do not have access to internet. Please connect to wifi."+
		// 		"The site needs to be connected to the internet or otherwise it will not function properly.");
		// }
		notifyObservers(null, "error");	
    }


	//Returns all ingredients for all the dishes on the menu. 
	//added parameter "menu"
	//remove menu afterwards
	this.getAllIngredients = function() {
		var menu = this.getFullMenu();
		var ingredientsArray = [];
		for(i = 0; i < menu.length; i++){
			ingredientsArray.push(menu[i].ingredients);
		}
		return ingredientsArray;
	}

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	//remove parameter menu
	this.getTotalMenuPrice = function() {
		var allIngredients = this.getAllIngredients(fullMenu);
		var totalPrice = 0;
		for(i = 0; i < allIngredients.length; i++){
			for(j = 0; j < allIngredients[i].length; j++){
				totalPrice = totalPrice + allIngredients[i][j].price;
			}
		}
		return totalPrice * parseInt(this.getNumberOfGuests());	
	}

	this.priceForADish = function(dish){
		var listOfIngridients = dish.ingredients;	
		var priceForADish = 0;
            for(var i = 0; i < listOfIngridients.length; i++){
            	priceForADish = priceForADish + (listOfIngridients[i].price * this.getNumberOfGuests());
            }
        return priceForADish;
	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	//don't really understand...
	this.addDishToMenu = function(recipeID) {
		// lastAddedDishId = id;
		// fullMenu.push(id);
		var dish={};
		var url = "http://api.bigoven.com/recipe/" + recipeID + "?api_key="+apiKey;
        $.ajax({
            type: "GET",
            dataType: 'json',
            cache: true,
            url: url,
            success: function (data) {
            	dish["id"] = data["RecipeID"];
	        	dish["name"] = data["Title"];
	        	dish["description"] = data["Instructions"];
	        	dish["image"]  = data["ImageURL"];
	        	var tempIngridients = data["Ingredients"];
	        	var ingredientsList = [];
	        	for(var i =0; i < tempIngridients.length; i++){
	        		var ingredientsMap = {};;
	        		ingredientsMap["name"] = tempIngridients[i]["Name"];
	        		var quantityTemp = tempIngridients[i]["Quantity"];
	        		ingredientsMap["quantity"] = tempIngridients[i]["Quantity"];
	        		ingredientsMap["price"] = quantityTemp;
	        		var unit = tempIngridients[i]["Unit"];
	        		if(unit == null){
	        			ingredientsMap["unit"] = "";	
	        		}else{
	        			ingredientsMap["unit"] = unit;
	        		}
	        		ingredientsList.push(ingredientsMap);
	        	}
	        	dish["ingredients"] = ingredientsList;
	        	toMenu(dish);
            },

            error: errorFunction
        });
	}

	toMenu = function(dish){
		fullMenu.push(dish);
		lastAddedDish = dish;
		notifyObservers(fullMenu, "fullMenu");
	}

	//Removes dish from menu
	this.removeDishFromMenu = function(recipeID) {
		var dish = {};
		var url = "http://api.bigoven.com/recipe/" + recipeID + "?api_key="+apiKey;
		$.ajax({
	        type: "GET",
	        dataType: 'json',
	        cache: true,
	        url: url,
	        success: function (data) {
	        	dish["id"] = data["RecipeID"];
	        	dish["name"] = data["Title"];
	        	dish["description"] = data["Instructions"];
	        	dish["image"]  = data["ImageURL"];
	        	var tempIngridients = data["Ingredients"];
	        	var ingredientsList = [];
	        	for(var i =0; i < tempIngridients.length; i++){
	        		var ingredientsMap = {};;
	        		ingredientsMap["name"] = tempIngridients[i]["Name"];
	        		var quantityTemp = tempIngridients[i]["Quantity"];
	        		ingredientsMap["quantity"] = tempIngridients[i]["Quantity"];
	        		ingredientsMap["price"] = quantityTemp;
	        		var unit = tempIngridients[i]["Unit"];
	        		if(unit == null){
	        			ingredientsMap["unit"] = "";	
	        		}else{
	        			ingredientsMap["unit"] = unit;
	        		}
	        		ingredientsList.push(ingredientsMap);
	        	}
	        	dish["ingredients"] = ingredientsList;
	        	removeDish(dish); 
	        },
	        error: errorFunction
	    });
	}

	removeDish = function(dish){
		var dishId = dish["id"];
		for(var i = 0; i < fullMenu.length; i++){
			var tempId = fullMenu[i]["id"];
			var index = i;
			if(dishId == tempId){
				fullMenu.splice(index, 1);
			}
		}
		notifyObservers(fullMenu, "removeMenu");
	}

	this.getDish = function (recipeID) {
		var dish = {};
		var url = "http://api.bigoven.com/recipe/" + recipeID + "?api_key="+apiKey;
		$.ajax({
	        type: "GET",
	        dataType: 'json',
	        cache: true,
	        url: url,
	        success: function (data) {
	        	dish["id"] = data["RecipeID"];
	        	dish["name"] = data["Title"];
	        	dish["description"] = data["Instructions"];
	        	dish["image"]  = data["ImageURL"];
	        	var tempIngridients = data["Ingredients"];
	        	var ingredientsList = [];
	        	for(var i =0; i < tempIngridients.length; i++){
	        		var ingredientsMap = {};;
	        		ingredientsMap["name"] = tempIngridients[i]["Name"];
	        		var quantityTemp = tempIngridients[i]["Quantity"];
	        		ingredientsMap["quantity"] = tempIngridients[i]["Quantity"];
	        		ingredientsMap["price"] = quantityTemp;
	        		var unit = tempIngridients[i]["Unit"];
	        		if(unit == null){
	        			ingredientsMap["unit"] = "";	
	        		}else{
	        			ingredientsMap["unit"] = unit;
	        		}
	        		ingredientsList.push(ingredientsMap);
	        	}
	        	dish["ingredients"] = ingredientsList;
	        	theDish = dish;
	        	//console.log(theDish);
	        	notifyObservers(dish, "chosenDish"); 
	        },
	        error: errorFunction
	    });
	}
}