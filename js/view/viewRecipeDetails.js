var ViewRecipeDetails = function (container, dish) {

	var pathToImages = "images/";

	var imageDiv = document.getElementById("imageOfChosenDish");
    var addImage = addAnImage(dish);
    var dishName = document.getElementById("nameOfDish");
    dishName.innerHTML = dish.name;
    imageDiv.appendChild(addImage);
    document.getElementById(container).style.display = "";


    //code repeating!!
    function addAnImage(dish){
        var dishPic = document.createElement("IMG");
        dishPic.src = pathToImages+dish.image;
        dishPic.alt = dish.name;
        dishPic.id = dish.id;
        return dishPic;
    }

}