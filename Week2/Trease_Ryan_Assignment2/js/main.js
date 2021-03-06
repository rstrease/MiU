//project 2
//Ryan Trease

//Wait until DOM is loaded
window.addEventListener("DOMContentLoaded", function(){
    
    //variables
    //var toolType = ["--Select Type--", "Hand Tool", "Power Tool", "Power Tool Accessory", "Hardware", "Lumber"];
    var purchaseType;
    var errMsg = ge('errors');
   
    //getElementById function
    function ge(x){
        var element = document.getElementById(x);
        return element;
    }
    
    /*//select field element and populate
    function chooseToolType(){
        var formTag = document.getElementsByTagName("fieldset");
        var select = ge('select');
        var makeSelect = document.createElement('select');
        makeSelect.setAttribute("id", "select");
        for(var i = 0, j=toolType.length; i<j; i++){
            var makeOption = document.createElement('option');
            var optText = toolType[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        select.appendChild(makeSelect);
    }
    chooseToolType();*/
    
    //find value of selected radio button
    function getSelected(){
        var radioNewUsed = document.forms[0].condition;
        for(var i = 0; i<radioNewUsed.length; i++){
            if(radioNewUsed[i].checked){
                purchaseType = radioNewUsed[i].value;
            }
        }
    }
    
        function toggleControls(n) {
        switch (n) {
            case "on":
                ge('inputs').style.display = "none";
				ge('footer').style.display = "none";
                ge('clear').style.display = "inline";
                ge('display').style.display = "none";
                ge('addnew').style.display = "inline";
                break;
            case "off":
                ge('inputs').style.display = "block";
				ge('clear').style.display = "inline";
                ge('display').style.display = "inline";
                ge('addnew').style.display = "none";
                ge('items').style.display = "none";
				ge('footer').style.display = "inline";
                break;
            default:
            return false;
        }
    }
    
    //select data and submit
    function storeData(key){
    	if(!key){
    		var id = Math.floor(Math.random()*100000001);
    	}
    	else{
    		id = key;
    	}
        getSelected();
        var item = {};
            item.name = ["*Name:", ge('name').value];
            item.select = ["*Tool/Item Type: ", ge('select').value];
            item.make = ["*Make: ", ge('make').value];
            item.mnumber = ["*Model Number: ", ge('mnumber').value];
            item.snumber = ["Serial Number: ", ge('snumber').value];
            item.dpurchased = ["Date Purchased: ", ge('dpurchased').value];
            item.wpurchased = ["Where Purchased: ", ge('wpurchased').value];
            item.price = ["Price: ", ge('price').value];
            item.ev = ["Estimated Value: ", ge('ev').value];
            item.condition = ["New or Used: ", purchaseType];
            item.qty = ["Quantity: ", ge('qty').value];
            item.dateadded = ["Date Added: ", ge('dateadded').value];
            item.notes = ["Additional notes: ", ge('notes').value];
            
        //save to local storage: use stringify to convert to string
        localStorage.setItem(id, JSON.stringify(item));
        alert("Your item was stored successfully!");
        window.location.reload();
    }
    
    //write data to display in browser
    function displayData(){
		toggleControls("on");
        if(localStorage.length === 0){
        	alert("You have no data to display so default data will be added.");
        	autoFillData();
        }
	        var makeDiv = document.createElement('div');
	        makeDiv.setAttribute("id", "items");
	        var makeList = document.createElement('div');
	        makeList.setAttribute("id", "ulList");
	        makeDiv.appendChild(makeList);
	        additem.appendChild(makeDiv);
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
	            getImage(obj.select[1], makeSubList);
	            for(var n in obj){
	                var makeSubLi = document.createElement('li');
	                makeSubList.appendChild(makeSubLi);
	                var optSubText = obj[n][0]+" "+obj[n][1];
	                makeSubLi.innerHTML = optSubText;
	                makeLi.appendChild(linksLi);
            	}
	            makeItemLinks(localStorage.key(i), linksLi); //create edit and delete buttons
            }
    }
    
    function getImage(toolName, makeSubList){
    	var imagesLi = document.createElement('li');
    	makeSubList.appendChild(imagesLi);
    	var newImage = document.createElement('img');
    	var setSource = newImage.setAttribute("src", "images/" + toolName + ".png");
    	imagesLi.appendChild(newImage);
    }
        
    function autoFillData(){
	    //store JSON data in actual storage
	    for(var n in json){
		    var id = Math.floor(Math.random()*100000001);
		    localStorage.setItem(id, JSON.stringify(json[n]));
	    }
    }
    
    //makes item links
    function makeItemLinks(key, linksLi){
    	var editLink = document.createElement('a');
    	editLink.setAttribute("id", "edButtons");
    	editLink.href = "#";
    	editLink.key = key;
    	var editText = "Edit Item";
    	editLink.addEventListener("click", editItem);
    	editLink.innerHTML = editText;
    	linksLi.appendChild(editLink);
    	
    	var deleteLink = document.createElement('a');
    	deleteLink.setAttribute("id", "edButtons");
    	deleteLink.href = "#";
    	deleteLink.key = key;
    	var deleteText = "Delete Item";
    	deleteLink.addEventListener("click", deleteItem);
    	deleteLink.innerHTML = deleteText;
    	linksLi.appendChild(deleteLink);
    }
    
    function editItem(){
    	//grab item data from local storage
    	var value = localStorage.getItem(this.key);
    	var item = JSON.parse(value);
    	//show form
    	toggleControls("off");
    	
    	ge('name').value = item.name[1];
    	ge('select').value = item.select[1];
    	ge('make').value = item.make[1];
    	ge('mnumber').value = item.mnumber[1];
    	ge('snumber').value = item.snumber[1];
    	ge('dpurchased').value = item.dpurchased[1];
    	ge('wpurchased').value = item.wpurchased[1];
    	ge('price').value = item.price[1];
    	ge('ev').value = item.ev[1];
    	var radios = document.forms[0].condition;
    	for(var i = 0; i<radios.length; i++){
    		if(radios[i].value == "New" && item.condition[1] == "New"){
    			radios[i].setAttribute("checked", "checked");
    		}
    		else if(radios[i].value == "Used" && item.condition[1] == "Used"){
    			radios[i].setAttribute("checked", "checked");
    		}
    	}
    	ge('qty').value = item.qty[1];
    	ge('dateadded').value = item.dateadded[1];
    	ge('notes').value = item.notes[1];
    	
    	//remove listener from input 'add item' button
    	save.removeEventListener("click", storeData);
    	//change submit value to edit
    	ge('submit').value = "Edit Item";
    	var editSubmit = ge('submit');
    	//save key value established
    	editSubmit.addEventListener("click", validate);
    	editSubmit.key = this.key;
    	
    }
    
    function deleteItem(){
    	var ask = confirm("Are you sure you want to delete this item?");
    	if(ask){
    		localStorage.removeItem(this.key);
    		alert("Item was deleted.");
    		window.location.reload();
    	}
    	else{
    		alert("Item was not deleted.");
    	}
    }
    
    function clearData(){
    	if (localStorage.length === 0){
    		alert("You have no data to clear.");		
    	}
    	else{
    		localStorage.clear();
    		alert("Your contents have been deleted.");
    		window.location.reload();
    		return false;
    	}
    }
    
    function validate(e){
    	//define elements to check
    	var getName = ge('name');
    	var getSelect = ge('select');
    	var getMake = ge('make');
    	var getMnumber = ge('mnumber');
    	
    	//reset error messages
    	errMsg.innerHTML = "";
    	getName.style.border = "1px solid #999999";
    	getSelect.style.border = "1px solid #999999";
    	getMake.style.border = "1px solid #999999";
    	getMnumber.style.border = "1px solid #999999";
    	
    	//error messages
    	var errorMessageArray = [];
    	//name error message
    	if(getName.value === ""){
    		var nameError = "*Please enter a name.";
    		getName.style.border = "1px solid red";
    		errorMessageArray.push(nameError);
    	}
    	
    	//group error message
    	if(getSelect.value === "type"){
    		var groupError = "*Please enter a tool type.";
    		getSelect.style.border = "1px solid red";
    		errorMessageArray.push(groupError);
    	}
    	
    	//make error message
    	if(getMake.value === ""){
    		var makeError = "*Please enter a make.";
    		getMake.style.border = "1px solid red";
    		errorMessageArray.push(makeError);
    	}
    	
    	//model number error message
    	if(getMnumber.value === ""){
    		var mnumberError = "*Please enter a model number.";
    		getMnumber.style.border = "1px solid red";
    		errorMessageArray.push(mnumberError);
    	}
    	
    	if(errorMessageArray.length >=1){
    		for(var i = 0, j=errorMessageArray.length; i < j; i++){
    			var txt = document.createElement('li');
    			txt.innerHTML = errorMessageArray[i];
    			errMsg.appendChild(txt);
    		}
        	e.preventDefault();
        	return false;
    	}
    	else{
    		//if data is entered correctly it gets stored here
    		storeData(this.key);
    	}
    }
    
    //Links & click events
    var display = ge('display');
    display.addEventListener("click", displayData);
    
    var clear = ge('clear');
    clear.addEventListener("click", clearData);
    
    var save = ge('submit');
    save.addEventListener("click", validate);
});