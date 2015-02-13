function getRecipeJson(category, searchword) {
    //prototyp för getAllDishes
        var apiKey = "dvx96F0ts86514dMmAyK4Jz44kHs47Us";
        var url = "http://api.bigoven.com/recipes?pg=1&rpp=25&include_primarycat="
                  + category
                  + "&api_key="+apiKey;
        $.ajax({
            type: "GET",
            dataType: 'json',
            cache: false,
            url: url,
            success: function (data) {
                // alert('success');
                var dishes = [];
                var allInfo = data["Results"];
                for(var i=0; i < allInfo.length; i++){
                    var dishMap = {};
                    var dish = allInfo[i];
                    var id = dish["RecipeID"];
                    var name = dish["Title"];
                    var image = dish["ImageURL120"];
                    var category = dish["Category"];
                    dishMap["name"] = name;
                    dishMap["id"] = id;
                    dishMap["image"] = image;
                    dishMap["category"] = category;
                    dishes.push(dishMap);
                }
                //notifyObservers med listan
                console.log(dishes);
            }
        });
    }

        //     'id':1,
        // 'name':'French toast',
        // 'type':'starter',
        // 'image':'toast.jpg',
        // 'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
        // 'ingredients':[{ 
        //     'name':'eggs',
        //     'quantity':0.5,
        //     'unit':'',
        //     'price':10
        //     },{
        //     'name':'milk',
        //     'quantity':30,
        //     'unit':'ml',
        //     'price':6
        //     },{
        //     'name':'brown sugar',
        //     'quantity':7,
        //     'unit':'g',
        //     'price':1
        //     },{
        //     'name':'ground nutmeg',
        //     'quantity':0.5,
        //     'unit':'g',
        //     'price':12
        //     },{
        //     'name':'white bread',
        //     'quantity':2,
        //     'unit':'slices',
        //     'price':2
        //     }]