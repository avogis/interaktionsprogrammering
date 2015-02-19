var ViewMyDinnerLeft = function(container, model){

	var oldDishId = null;
	var oldnrOfGuests = 0;
	var self = this;

	model.addObserver(this);

	this.update = function(what){
		console.log(what);
		var newNrOfGuests = model.getNumberOfGuests(); 
		if(typeof(what) == "string"){
			newNrOfGuests = what;
			//oldnrOfGuests = newNrOfGuests;
		}
		var currentDish = model.getCurrentDish();
		var theDish = model.getTheDish();
		console.log("currentDish");
		console.log(currentDish);
		var addedDish = model.getLastAddedDish();
		console.log("addedDish");
		console.log(addedDish);
		if(addedDish !== null && oldDishId !== addedDish){
			oldnrOfGuests = newNrOfGuests;
			console.log("kommer jag inte här");
			oldDishId = addedDish;
			addedDish = model.getTheDish();
			var id = addedDish.id;
			var dishNameAndCostTBody = document.getElementById("dishNameAndCostTBody");
			dishNameAndCostTR = document.createElement("TR");
			dishNameAndCostTR.id = "nameAndCostTr"+id;
			var dishName = document.createElement("TD");
			dishName.innerHTML = addedDish.name;
			dishName.id = "added"+id;
			var dishCost = document.createElement("TD");
			dishCost.id = "cost"+id;
			var deleteButton = document.createElement("BUTTON");
			deleteButton.className = "btn btn-danger";
			deleteButton.id = "addedBtn"+id;
			deleteButton.innerHTML = "x";
			dishCost.innerHTML = model.priceForADish(addedDish);
			dishNameAndCostTR.appendChild(dishName);
			dishNameAndCostTR.appendChild(dishCost);
			dishNameAndCostTR.appendChild(deleteButton);
			dishNameAndCostTBody.appendChild(dishNameAndCostTR);
			//document.getElementById("totalSek").innerHTML = model.getTotalMenuPrice()+" SEK";
		}
		if(oldnrOfGuests !== newNrOfGuests && theDish !== null){
			oldnrOfGuests = newNrOfGuests;
			console.log("kommer den in här=");
			console.log(theDish);
			var dishNameAndCostTBody = document.getElementById("dishNameAndCostTBody");
			var children = dishNameAndCostTBody.children;
			for (var i = 0; i < children.length; i++) {
  				var tableChild = children[i];
  				if(tableChild.id != "dishNameAndCostTR1"){
  					var grandChildren = tableChild.children;
  					var dishId = grandChildren[1].id.replace("cost", "");
  					//här blir det fel!!!! man ska ju hämta olika dishes....
  					//hur ska jag göra med MENYN?
  					document.getElementById("cost"+dishId).innerHTML = model.priceForADish(theDish);
  				}
			}
			document.getElementById("dishCost").innerHTML = model.priceForADish(theDish);
			//document.getElementById("totalSek").innerHTML = model.getTotalMenuPrice()+" SEK";
		}
	}
	    
	this.chosenNrOfGuests= document.getElementById("populateGuestOption");
         
    this.confirmDinDin= document.getElementById("confirmDinner");

    this.tableBody = $("#dishNameAndCostTBody");

    populateNrOfGuest("populateGuestOption");

    function populateNrOfGuest(divName){
        var nrOfGuests = document.getElementById(divName);
        for(var i = 0; i <= 15; i++){
            var option = document.createElement("option");
            option.value = i;
            option.text = i;
            nrOfGuests.appendChild(option);
        }
    }	
}