var ViewMyDinnerLeft = function(container, model){

	var oldDish = null;

	model.addObserver(this);

	this.update = function(){
		var currentDish = model.getCurrentDish();
		if(currentDish !== null){
    		document.getElementById("dishCost").innerHTML = model.priceForADish(currentDish);
		}
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
			var deleteButton = document.createElement("BUTTON");
			deleteButton.className = "btn btn-danger";
			deleteButton.id = "addedBtn"+id;
			deleteButton.innerHTML = "x";
			dishCost.innerHTML = model.getTotalMenuPrice();
			dishNameAndCostTR.appendChild(dishName);
			dishNameAndCostTR.appendChild(dishCost);
			dishNameAndCostTR.appendChild(deleteButton);
			dishNameAndCostTBody.appendChild(dishNameAndCostTR);
			document.getElementById("dishCost").innerHTML = "0.0";
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