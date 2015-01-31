var ViewAllDishes = function (container) {

    var model = new DinnerModel();
    var menu = model.getFullMenu();

    this.dishes = container.find("#dinnerModel");
    for (key in menu){
        alert(menu[key]);
        this.dishes.html(menu[key]);
    }

} 