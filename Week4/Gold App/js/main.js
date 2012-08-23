$('#home').on('pageinit', function(){

});

$('#additem').on('pageinit', function(){
		delete $.validator.methods.date;
		var myForm = $('#toolForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			alert("Please fill in the following missing fields: ");
			},
			submitHandler: function() {
		var data = $(".myForm").serializeArray();
			storeData(data);
		}
	});
	
	$('#reset').click(function() {
	    $('#qty').val('1').slider('refresh');
	    $('#selectType').val('selection').selectmenu('refresh');
		$('#type-2').attr('checked',false).checkboxradio('refresh');
		$('#type-1').attr('checked',true).checkboxradio('refresh');
	});
	
	$("#clear").click(function(){
        clearLocal();
        return false;
    }); 
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

	$("#display").click(function(){
		$.mobile.changePage('#displayitem', { transition: "slide"});
        getData();
        return false;
    });

var autofillData = function (){
	//store JSON data in actual storage
	for(var n in json){
	    var id = Math.floor(Math.random()*100000001);
	    localStorage.setItem(id, JSON.stringify(json[n]));
	}
};

var ge = function (x){
        var element = document.getElementById(x);
        return element;
};

var getData = function(){
	if(localStorage.length === 0){
        	alert("You have no data to display so default data will be added.");
        	autofillData();
        }
	        var makeDiv = document.createElement('div');
	        makeDiv.setAttribute("id", "items");
	        var makeList = document.createElement('div');
	        makeList.setAttribute("id", "ulList");
	        makeDiv.appendChild(makeList);
	        displayitem.appendChild(makeDiv);
	        ge('items').style.display = "block";
	        for(var i=0, len=localStorage.length; i<len; i++){
	            var makeLi = document.createElement('li');
	            makeLi.setAttribute("id", "mainLi");
	            var linksLi = document.createElement('li');
	            linksLi.setAttribute("id", "editDeleteLi");
	            makeList.appendChild(makeLi);
	            var key = localStorage.key(i);
	            var value = localStorage.getItem(key);
	            var obj = JSON.parse(value);
	            var makeSubList = document.createElement('div');
	            makeSubList.setAttribute("id", "subUl");
	            makeLi.appendChild(makeSubList);
	            for(var n in obj){
	                var makeSubLi = document.createElement('li');
	                makeSubList.appendChild(makeSubLi);
	                var optSubText = obj[n][0]+" "+obj[n][1];
	                makeSubLi.innerHTML = optSubText;
	                makeLi.appendChild(linksLi);
            	}
	            makeItemLinks(localStorage.key(i), linksLi); //create edit and delete buttons
            }
};

var makeItemLinks = function(key, linksLi){
    var editLink = document.createElement('a');
    	editLink.setAttribute("id", "edbutton");
    	editLink.href = "#";
    	editLink.key = key;
    var editText = "Edit Item";
    	editLink.addEventListener("click", editItem);
    	editLink.innerHTML = editText;
    	linksLi.appendChild(editLink);
    	
    var deleteLink = document.createElement('a');
    	deleteLink.setAttribute("id", "edbutton");
    	deleteLink.href = "#";
    	deleteLink.key = key;
    var deleteText = "Delete Item";
    	deleteLink.addEventListener("click", deleteItem);
    	deleteLink.innerHTML = deleteText;
    	linksLi.appendChild(deleteLink);
};

var storeData = function(data){
	var key;
	if(!key){
    	var id = Math.floor(Math.random()*100000001);
    }
    else{
    	id = key;
    }

    var item = {};
		item.name = ["Name:", $('#name').val()];
        item.selectType = ["Tool/Item Type:", $('#selectType').val()];
        item.make = ["Make:", $('#make').val()];
        item.mnumber = ["Model Number:", $('#mnumber').val()];
        item.snumber = ["Serial Number:", $('#snumber').val()];
        item.dpurchased = ["Date Purchased:", $('#dpurchased').val()];
        item.wpurchased = ["Where Purchased:", $('#wpurchased').val()];
        item.price = ["Price:", $('#price').val()];
        item.ev = ["Estimated Value:", $('#ev').val()];
        item.condition = ["Purchase Type:", $('input[name=condition]:checked').val()];
        item.qty = ["Quantity:", $('#qty').val()];
        item.dateadded = ["Date Added:", $('#dateadded').val()];
        item.notes = ["Additional notes:", $('#notes').val()];
		
		//save to local storage: use stringify to convert to string
        localStorage.setItem(id, JSON.stringify(item));
        alert("Your item was stored successfully!");
		$('form#toolForm')[0].reset();
		$('#qty').val('1').slider('refresh');
	    $('#selectType').val('selection').selectmenu('refresh');
		$('#type-2').attr('checked',false).checkboxradio('refresh');
		$('#type-1').attr('checked',true).checkboxradio('refresh');
}; 

 var editItem = function(){
    function editItem(){
    	//grab item data from local storage
    	var value = localStorage.getItem(this.key);
    	var item = JSON.parse(value);
    	    	
    	$('#name').val(item.name[1]);
    	$('#selectType').val(item.selectType[1]);
    	$('#make').val(item.make[1]);
    	$('#mnumber').val(item.mnumber[1]);
    	$('#snumber').val(item.snumber[1]);
    	$('#dpurchased').val(item.dpurchased[1]);
    	$('#wpurchased').val(item.wpurchased[1]);
    	$('#price').val(item.price[1]);
    	$('#ev').val(item.ev[1]);

    	ge('#qty').val(item.qty[1]);
    	ge('#dateadded').val(item.dateadded[1]);
    	ge('#notes').val(item.notes[1]);
    	
    	//remove listener from input 'add item' button
    	save.removeEventListener("click", storeData);
    	//change submit value to edit
    	$('#submit').val("Edit Item");
    	var editSubmit = $('#submit');
    	//save key value established
    	editSubmit.addEventListener("click", validate);
    	editSubmit.key = this.key;
    	
    }	
};

var clearLocal = function(){
	if (localStorage.length === 0){
    		alert("You have no data to clear.");
			$.mobile.changePage('#home', { transition: "slide"});			
    	}
    	else{
    		localStorage.clear();
    		alert("Your contents have been deleted.");
			$.mobile.changePage('#home', { transition: "slide"});
			window.location.reload('#displayitem');
		}
	};

var	deleteItem = function (){
	var ask = confirm("Are you sure you want to delete this item?");
    	if(ask){
    		localStorage.removeItem(this.key);
    		alert("Item was deleted.");
    		$.mobile.changePage('#home', { transition: "slide"});
			window.location.reload();
    	}
    	else{
    		alert("Item was not deleted.");
    	}	
};