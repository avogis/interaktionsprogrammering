var ViewRecipeDetails = function (container, model) {


	var temp = document.getElementById("confirmDishButton");
    temp.addEventListener("click", 
    	function(e){
    		var imageDiv = document.getElementById("imageOfChosenDish");
    		var img = imageDiv.getElementsByTagName("img");
    		var id = img[0].id;
    		model.addDishToMenu(id);
    		document.getElementById("searchDish").style.display = "";
			clearDiv(document.getElementById("imageOfChosenDish"));
			var dishNameAndCostTBody = document.getElementById("dishNameAndCostTBody");
			var dishNameAndCostTR = document.createElement("TR");
			dishNameAndCostTR.addEventListener("click", 
                function(e){
                	console.log(e.srcElement);
                	if(e.srcElement.className !== "btn btn-danger"){
	                	var nameOr = e.srcElement.id;
	                   	var dishId = nameOr.replace("added", "");
	                   	if(dishId !== ""){
		                   	var btn = document.getElementById("addedBtn"+dishId);
		                   	if(btn.style.display == "none"){
		                   		btn.style.display = "";
		                   	}else{
		                   		btn.style.display = "none";	
		                   	}
		                	var dish = model.getDish(dishId);
	                	}
                    }
                }
            ); 
			var dishName = document.createElement("TD");
			dishName.innerHTML = model.getDish(id).name;
			dishName.id = "added"+id;
			var dishCost = document.createElement("TD");
			var deleteButton = document.createElement("BUTTON");
			deleteButton.className = "btn btn-danger";
			deleteButton.style.display = "none";
			deleteButton.id = "addedBtn"+id;
			deleteButton.innerHTML = "x";
			deleteButton.addEventListener("click",
                   		function(e){
							model.removeDishFromMenu(id);
							dishNameAndCostTR.remove();	
                   		});
			dishCost.innerHTML = model.getTotalMenuPrice();
			dishNameAndCostTR.appendChild(dishName);
			dishNameAndCostTR.appendChild(dishCost);
			dishNameAndCostTR.appendChild(deleteButton);
			dishNameAndCostTBody.appendChild(dishNameAndCostTR);
			document.getElementById("dishCost").innerHTML = "0.0";
			document.getElementById("totalSek").innerHTML = model.getTotalMenuPrice()+" SEK";
            document.getElementById("viewRecipeDetails").style.display = "none";
    	}
    );


	var temp = document.getElementById("backButton");
    temp.addEventListener("click", 
    	function(e){
    		document.getElementById("viewRecipeDetails").style.display = "none";	
    		document.getElementById("searchDish").style.display = "";	
    	}
    ); 

    var chosenNrOfGuests = document.getElementById("populateGuestOption");
    chosenNrOfGuests.addEventListener("change", 
        function(e){
            var chosenNrOfGuests = document.getElementById("populateGuestOption");
            var chosenOption = chosenNrOfGuests.options[chosenNrOfGuests.selectedIndex].value;
            model.setNumberOfGuests(chosenOption);
            e.preventDefault();
            var ingriedientsList = document.getElementById("headerIngriedients");
            var nrGuests = model.getNumberOfGuests();
            ingriedientsList.innerHTML = "Dinner for " + nrGuests + " people";
            var ingriedients = document.getElementById("igredientTable");
            var image = document.getElementById("viewRecipeDetails").getElementsByTagName("img");
            console.log(image);
            var dish = model.getDish(image[0].id);
            var listOfIngridients = dish.ingredients;
            var priceForADish = 0;
            for(i = 0; i < listOfIngridients.length; i++){
                var ingriedient = document.getElementById("ingriedient"+i);
                var amount = document.getElementById("amount"+i);
                var product = document.getElementById("product"+i);
                var sek = document.getElementById("sek"+i);
                var price = document.getElementById("price"+i);
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
    ); 

    function clearDiv(div){
        div.innerHTML = "";
    }

}