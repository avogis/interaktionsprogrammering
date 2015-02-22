function MotherController(){

	this.clearDiv = function clearDiv(div){
        div.innerHTML = "";
    }

    this.addAnImage = function addAnImage(dish){
        var dishPic = document.createElement("IMG");
        dishPic.src = dish.image;
        dishPic.alt = dish.name;
        dishPic.id = dish.id;
        return dishPic;
    }
}