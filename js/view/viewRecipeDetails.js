var ViewRecipeDetails = function (container, model) {

	this.confirmButton = document.getElementById("confirmDishButton");
	this.backButton = document.getElementById("backButton");
    model.addObserver(this);
    var self = this;

    this.update = function(dish, string) {
        var nrGuests = model.getNumberOfGuests();
        if(string == "currentDish" || string == "numberOfMyGuests"){
            if(typeof(dish) == "string"){
                nrGuests = dish;
                dish = model.getTheDish();
            }
            if(dish !== null && dish !== undefined && !Array.isArray(dish)){
                var imageDiv = document.getElementById("imageOfChosenDish");
                var addImage = self.addAnImage(dish);
                addImage.className = "img-rounded";
                var dishName = document.getElementById("nameOfDish");
                dishName.innerHTML = dish.name;
                self.clearDiv(imageDiv);
                imageDiv.appendChild(addImage);
                var ingriedientsList = document.getElementById("headerIngriedients");
                ingriedientsList.innerHTML = "Dinner for " + nrGuests + " people";
                var ingriedients = document.getElementById("igredientTable");
                self.clearDiv(ingriedients);
                var listOfIngridients = dish.ingredients;
                for(var i = 0; i < listOfIngridients.length; i++){
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
                    var quantity = (listOfIngridients[i].quantity  * nrGuests);
                    if(quantity != 0){
                       amount.innerHTML = quantity.toFixed(2) + " " + listOfIngridients[i].unit;
                    }
                    else{
                        amount.innerHTML = quantity + " " + listOfIngridients[i].unit;
                    }
                    product.innerHTML = listOfIngridients[i].name;
                    sek.innerHTML = "SEK";
                    price.innerHTML = (listOfIngridients[i].price * nrGuests).toFixed(2);
                    ingriedient.appendChild(amount);
                    ingriedient.appendChild(product);
                    ingriedient.appendChild(sek);
                    ingriedient.appendChild(price);
                    ingriedients.appendChild(ingriedient);
                    document.getElementById("descriptionText").innerHTML = dish.description;
                }
                document.getElementById("totalCostViewDish").innerHTML = model.priceForADish(dish).toFixed(2);
            }
        }
    }
}