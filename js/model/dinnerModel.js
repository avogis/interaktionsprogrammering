//DinnerModel Object constructor
var DinnerModel = function() {

	var fullMenu = [];
	var lastAddedDish = null;
	var numberOfMyGuests = 1; 
	var observers = [];
	var currentDish = null;
	var currentType = "all";
	var currentFilter = "";
	var apiKey = "dvx96F0ts86514dMmAyK4Jz44kHs47Us";

	//add Observers
	this.addObserver = function(observer) {
		observers.push(observer);
	}

	//notify observers
	notifyObservers = function(dishes) {
		// console.log("notifies");
		// console.log(dishes);
		for(var i = 0; i < observers.length; i++){
			observers[i].update(dishes);
		}
	}

	this.getCurrentDish = function() {
		return currentDish;
	}
	this.setCurrentDish = function(id) {
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
		// console.log("numberOfMyGuests"); //why does it return a number that is +1 the selected?!
		// console.log(numberOfMyGuests); //why does it return a number that is +1 the selected?!
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
	 //  for(key in dishes){
		// 	if(dishes[key].id == id) {
		// 		return dishes[key];
		// 	}
		// }
		var url = "http://api.bigoven.com/recipe/" + recipeID + "?api_key="+apiKey;
		$.ajax({
	        type: "GET",
	        dataType: 'json',
	        cache: false,
	        url: url,
	        success: function (data) {
	        	var dish = {};
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
	        	notifyObservers(dish); 
	        }
	    });
	}


	// the dishes variable contains an array of all the 
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name, 
	// quantity (a number), price (a number) and unit (string 
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	var dishes = [{
		'id':1,
		'name':'French toast',
		'type':'starter',
		'image':'toast.jpg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{ 
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		},{
		'id':2,
		'name':'Sourdough Starter',
		'type':'starter',
		'image':'sourdough.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'active dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'all-purpose flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
		'name':'Baked Brie with Peaches',
		'type':'starter',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
		'name':'Meat balls',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
		'ingredients':[{ 
			'name':'extra lean ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion, diced',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'crushed red pepper flakes',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire sauce',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'grated Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'seasoned bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
		'name':'MD 2',
		'type':'main dish',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 3',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':2,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':10,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':5,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 4',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
		'name':'Chocolat Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':201,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':202,
		'name':'Strawberry',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		}
	];

}