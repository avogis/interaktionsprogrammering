var ViewRecipeDetails = function (container, model) {

	this.confirmButton = document.getElementById("confirmDishButton");
	this.backButton = document.getElementById("backButton");
    this.chosenNrOfGuests = document.getElementById("populateGuestOption");
    model.addObserver(this);


    this.update = function() {
        // clearDiv(container);
        var nrGuests = model.getNumberOfGuests();
        var dish = model.getCurrentDish();
        if(dish !== null){
            var imageDiv = document.getElementById("imageOfChosenDish");
            var addImage = addAnImage(dish);
            var dishName = document.getElementById("nameOfDish");
            dishName.innerHTML = dish.name;
            clearDiv(imageDiv);
            imageDiv.appendChild(addImage);
            var ingriedientsList = document.getElementById("headerIngriedients");
            ingriedientsList.innerHTML = "Dinner for " + nrGuests + " people";
            var ingriedients = document.getElementById("igredientTable");
            clearDiv(ingriedients);
            var listOfIngridients = dish.ingredients;
            var priceForADish = 0;
            for(i = 0; i < listOfIngridients.length; i++){
                var ingriedient = document.createElement("TR");
                var amount = document.createElement("TD");
                var product = document.createElement("TD");
                var sek = document.createElement("TD");
                var price = document.createElement("TD");
                ingriedient.id = "ingriedient"+i;
                amount.id = "amount"+i;
                product.id = "product"+i;
                sek.id = "sek"+i;
                price.id = "price"+i;
                amount.innerHTML = (listOfIngridients[i].quantity  * nrGuests) + " " + listOfIngridients[i].unit;
                product.innerHTML = listOfIngridients[i].name;
                sek.innerHTML = "SEK";
                price.innerHTML = (listOfIngridients[i].price * nrGuests);
                ingriedient.appendChild(amount);
                ingriedient.appendChild(product);
                ingriedient.appendChild(sek);
                ingriedient.appendChild(price);
                ingriedients.appendChild(ingriedient);
                document.getElementById("description").innerHTML = dish.description;
                priceForADish = priceForADish + (listOfIngridients[i].price * nrGuests);
                document.getElementById("dishCost").innerHTML = priceForADish;
            }
            document.getElementById("totalCostViewDish").innerHTML = priceForADish;
        }
    }


    function addAnImage(dish){
        var dishPic = document.createElement("IMG");
        dishPic.src = "images/"+dish.image;
        dishPic.alt = dish.name;
        dishPic.id = dish.id;
        return dishPic;
    }

    function clearDiv(div){
        div.innerHTML = "";
    }
}