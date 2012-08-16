var parseToolForm = function(data){
	console.log(data);
};

$(document).ready(function(){
	var tform = $('#toolForm');
	tform.validate({
		invalidHandler: function(form, validator){},
		submitHandler: function(){
			var data = tform.serializeArray();
			parseToolForm(data);
		}
	});
});