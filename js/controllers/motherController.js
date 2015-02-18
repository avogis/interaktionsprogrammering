function MotherController(){

	this.motherProperty = "hej hej hej";

	this.clearDiv = function clearDiv(div){
        div.innerHTML = "";
    }

    this.addAnImage = function addAnImage(dish){
        var dishPic = document.createElement("IMG");
        dishPic.src = dish.image;
        //HUR GÖR VI MED FEL NÄR BILDEN INTE FINNS?
        dishPic.alt = dish.name;
        dishPic.id = dish.id;
        return dishPic;
    }

    function ImgOnError(image){
        //VARFÖR FUNKAR INTE ENNA LÖSNING T.EX.?
        image.onerror = "";
        image.src = "images/lasagna.jpg";
        return true;
    }
}