var DinnerOverview = function(){
	
	var model = new DinnerModel();
	var menu = model.getFullMenu();
	console.log(menu);
	console.log(menu.length);

	function checkMenuLenght(){
		if(menu.length != 0){
			console.log("");
		}
	}

}