var ViewDinnerBorder = function(container, model){

	model.addObserver(this);
	
	this.goBackBtn = document.getElementById("backEditButton");
	document.getElementById("myDinner").innerHTML = "My dinner: " + model.getNumberOfGuests();
	this.update = function(){
		console.log("Border update + model.getNumberOfGuests()");
		console.log(model.getNumberOfGuests());
		document.getElementById("myDinner").innerHTML = "My dinner: " + model.getNumberOfGuests();
	}
}