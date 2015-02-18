var ViewRecipeDetails = function (container, model) {

	this.confirmButton = document.getElementById("confirmDishButton");
	this.backButton = document.getElementById("backButton");
    model.addObserver(this);
    var self = this;

    this.update = function(dish) {
        var nrGuests = model.getNumberOfGuests();
        if(typeof(dish) == "string"){
            nrGuests = dish;
            dish = model.getTheDish();
        }
        if(dish !== null && dish !== undefined && !Array.isArray(dish)){
            var imageDiv = document.getElementById("imageOfChosenDish");
            var addImage = self.addAnImage(dish);
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
            }
            document.getElementById("totalCostViewDish").innerHTML = model.priceForADish(dish);
        }
    }
}