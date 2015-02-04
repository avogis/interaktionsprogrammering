var ViewRecipeDetails = function (container, dish) {

	var centrFunc = new CentralFunction();

	var imageDiv = document.getElementById("imageOfChosenDish");
    var addImage = centralfunc.addAnImage(dish);
    var dishName = document.getElementById("nameOfDish");
    dishName.innerHTML = dish.name;
    imageDiv.appendChild(addImage);
    document.getElementById(container).style.display = "";



}