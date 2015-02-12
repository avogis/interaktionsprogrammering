var ViewMyDinnerLeft = function(container, model){

	var oldDish = null;
	var oldnrOfGuests = 0;

	model.addObserver(this);

	this.update = function(){
		var currentDish = model.getCurrentDish();
		var addedDish = model.getLastAddedDish();
		if(addedDish !== null && oldDish !== addedDish){
			oldDish = addedDish;
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
			document.getElementById("totalSek").innerHTML = model.getTotalMenuPrice()+" SEK";
		}
		var newNrOfGuests = model.getNumberOfGuests(); 
		if(oldnrOfGuests !== newNrOfGuests && currentDish !== null){
			var dishNameAndCostTBody = document.getElementById("dishNameAndCostTBody");
			var children = dishNameAndCostTBody.children;
			for (var i = 0; i < children.length; i++) {
  				var tableChild = children[i];
  				if(tableChild.id != "dishNameAndCostTR1"){
  					var grandChildren = tableChild.children;
  					var dishId = grandChildren[1].id.replace("cost", "");
  					document.getElementById("cost"+dishId).innerHTML = model.priceForADish(model.getDish(dishId));
  				}
			}
			document.getElementById("dishCost").innerHTML = model.priceForADish(currentDish);
			document.getElementById("totalSek").innerHTML = model.getTotalMenuPrice()+" SEK";
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

    function clearDiv(div){
        div.innerHTML = "";
    }
}