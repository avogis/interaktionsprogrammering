var ViewDinnerBorder = function(container, model){

	model.addObserver(this);
	
	this.goBackBtn = document.getElementById("backEditButton");
	document.getElementById("myDinner").innerHTML = "My dinner: " + model.getNumberOfGuests();
	
	this.update = function(){
		document.getElementById("myDinner").innerHTML = "My dinner: " + model.getNumberOfGuests();
	}
}