$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#additem').on('pageinit', function(){
		delete $.validator.methods.date;
		var myForm = $('#toolForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
	});
	
	$('#reset').click(function() {
	    $('#qty').val('1').slider('refresh');
	    $('#selectType').val('selection').selectmenu('refresh');
		$('#type-2').attr('checked',false).checkboxradio('refresh');
		$('#type-1').attr('checked',true).checkboxradio('refresh');
	});
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){

};

var getData = function(){

};

var storeData = function(data){
	localStorage.name = $('#name').val();
	localStorage.selectType = $('#selectType').val();
	localStorage.make = $('#make').val();
	localStorage.mnumber = $('#mnumber').val();
	localStorage.snumber = $('#snumber').val();
	localStorage.dpurchased = $('#dpurchased').val();
	localStorage.wpurchased = $('#wpurchased').val();
	localStorage.price = $('#price').val();
	localStorage.ev = $('#ev').val();
	localStorage.condition = $('input[name=condition]:checked').val();
	localStorage.qty = $('#qty').val();
	localStorage.dateadded = $('#dateadded').val();
	localStorage.notes = $('#notes').val();
}; 

var	deleteItem = function (){
		
};
					
var clearLocal = function(){
	
};