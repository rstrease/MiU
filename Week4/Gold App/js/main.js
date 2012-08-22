$('#home').on('pageinit', function(){
	//code needed for home page goes here
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

var autofillData = function (){

};

var getData = function(){
	
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
}; 

var clearLocal = function(){
	if (localStorage.length === 0){
    		alert("You have no data to clear.");
			$.mobile.changePage('#additem', { transition: "slide"});			
    	}
    	else{
    		localStorage.clear();
    		alert("Your contents have been deleted.");
			$.mobile.changePage('#additem', { transition: "slide"});
    	}
	};

var	deleteItem = function (){
		
};