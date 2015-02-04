CentralFunction = function(){

    function addAnImage(dish){
        var dishPic = document.createElement("IMG");
        dishPic.src = pathToImages+dish.image;
        dishPic.alt = dish.name;
        dishPic.id = dish.id;
        return dishPic;
    }
}