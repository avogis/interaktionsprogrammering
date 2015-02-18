//DinnerModel Object constructor
var DinnerModel = function() {

	var fullMenu = [];
	var lastAddedDish = null;
	var numberOfMyGuests = 0; 
	var observers = [];
	var currentDishID = null;
	var currentType = "all";
	var currentFilter = "";
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
	notifyObservers = function(dishes) {
		for(var i = 0; i < observers.length; i++){
			observers[i].update(dishes);
		}
	}

	this.getCurrentDish = function() {
		return currentDishID;
	}
	this.setCurrentDish = function(id) {
		currentDishID = id;
		this.getDish(id);
	}

	this.setFilter = function(filter) {
		currentFilter = filter;
		notifyObservers(currentFilter);
	}

	this.getFilter = function() {
		return currentFilter;
	}

	this.setType = function(type){
		currentType = type;
		notifyObservers(currentType);
	}

	this.getType = function() {
		return currentType;
	}

	this.getLastAddedDish = function(){
		return lastAddedDish;
	}


	//TODO Lab 2 implement the data structure that will hold number of guest
	// and selected dinner options for dinner menu

	//OR WHAT DO YOU MEAN? DON`T UNDERSTAND
	this.setNumberOfGuests = function(num) {
		numberOfMyGuests = num; 
		notifyObservers(numberOfMyGuests);
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
        var url = "http://api.bigoven.com/recipes?pg=1&rpp=25&include_primarycat="
                  + category
                  + "&api_key="+apiKey;
        $.ajax({
            type: "GET",
            dataType: 'json',
            cache: false,
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
                notifyObservers(dishes);
            }
        });
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
	this.addDishToMenu = function(id) {
		for(key in dishes){
			if(dishes[key].id == id){
				fullMenu.push(dishes[key]);
				lastAddedDish = dishes[key];
				notifyObservers();
				break;
			}
		}
	}

	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
		for(key in dishes){
			if(dishes[key].id == id){
				var index = fullMenu.indexOf(dishes[key]);
				if(index > -1){
					fullMenu.splice(index, 1);
				}
			}
		}
		notifyObservers();
	}

	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	this.getAllDishes = function (type, filter) {

	  	return $(dishes).filter(function(index,dish) {
			var found = true;
			if(filter){
				found = false;
				$.each(dish.ingredients,function(index,ingredient) {
					if(ingredient.name.indexOf(filter)!=-1) {
						found = true;
					}
				});
				if(dish.name.indexOf(filter) != -1)
				{
					found = true;
				}
			}
			if(type == "all"){
				return found;
			}
			else{
				return dish.type == type && found;
			}
	  	});	
	}

	//function that returns a dish of specific ID
	this.getDish = function (recipeID) {
		var dish = {};
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
	        	theDish = dish;
	        	notifyObservers(dish); 
	        }
	    });
	}
}