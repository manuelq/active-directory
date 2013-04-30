/**
 * form.js 0.3 970811
 * by Manuel Quinones
 * js component for add parms before submit to post
 */

function submitAction(formname,action,parms) { 
    $('#'+formname).attr("action", action);
    if($('#'+formname).are_dirty()){
    	$("#dirty:hidden").val(true);
    }
    if(parms){
		 jQuery.each(parms, function(key,value) {
			if($("#"+formname+ " input[name='"+key+"']").length > 0){
				$("#"+formname+" input[name='"+key+"']").val(value);
			} else {
		    	$('<input />').attr('type', 'hidden') 
	            .attr('name', key) 
	            .attr('value', value) 
	            .appendTo('#'+formname);
		 	}
    	});
    }
    showLoading();
    
    $("#"+formname).submit();
}

function formatCurrency(num) {
	num = num.toString().replace(/\$|\,/g,'');
	if(isNaN(num)) {
		num = "0";
	}

	sign = (num == (num = Math.abs(num)));
	num = Math.floor(num*100+0.50000000001);
	cents = num%100;
	num = Math.floor(num/100).toString();
	if(cents<10) {
		cents = "0" + cents;
	}

	for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++) {
		num = num.substring(0,num.length-(4*i+3))+','+
		num.substring(num.length-(4*i+3));
	}
	
	return (((sign)?'':'-') + '$' + num + '.' + cents);
}

function validateDate(field) {
	var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
	var value = $(field).val();
	
	if(value == '')
		return false;
	
	if( re.test(value)){
		var adata = value.split('/');
		var mm = parseInt(adata[0],10);
		var gg = parseInt(adata[1],10);
		var aaaa = parseInt(adata[2],10);
		var xdata = new Date(aaaa,mm-1,gg);
		if ( ( xdata.getFullYear() == aaaa ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == gg ) )
			validDate = true;
		else
			validDate = false;
	} else {
		validDate = false;
	}
	if(!validDate) {	
		$(field).val('');
		//need to use a timer so that .blur() can finish before you do .focus()
		setTimeout(function() { $(field).focus(); }, 50);
		$(field).focus();
		alert("Please enter a correct date in MM/DD/YYYY format.");
		return false;
	}
}

function setNextFocus() { 
	var formElements = $('input,select,textarea'); 
    var elementName = '';
    var prevElementName = '';
    var tempElementName = '';
    var exitFlag = false;
    var firstElementFlag = false;
    for (var i = 0; i < formElements.length; i++){
        var element = formElements[i];		
	    if ((element.type != 'hidden') && ($(element).parents(".required").length > 0)) {				        			        
	    	if ($(element).parents(".required").length < 0) {continue;} // element is not required, proceed to next element
	        elementName = element.name;
	        tempElementName = elementName.replace(formNameDot, nullString); // this would allow the fields to be referenced
	        if (tempElementName == elementName) { // this is for occasion when the jsp is actually used by two forms 
	        	tempElementName = elementName.replace(altFormNameDot, nullString);
	        	formNameDot = altFormNameDot; // will be used for checking on the nonStandardFields
	        }
	        elementName = tempElementName;
	        if (firstElementFlag == false) { // this is to get the first element
		        firstElementFlag = true;
		        firstElement = elementName;
	        }	
	        if ((elementName != prevElementName) && (exitFlag == true)) {break;} // the next focus had been identified here				        
	        if ((elementName == prevElementName) && (exitFlag == false)) {continue;}
	        switch(element.type) {
	        	case 'text':
		        	if(element.value=='') {exitFlag = true;} break;
	        	case 'textarea':
		        	if(element.value=='') {exitFlag = true;} break;
	        	case 'select-one':
		        	if (!element.selectedIndex && element.selectedIndex==0) {exitFlag = true;} break;
	        	case 'radio':
		        	if (element.checked) {exitFlag = false;}
		        	if (!element.checked) {exitFlag = true;} break;
	        	case 'checkbox':
		        	if (!element.checked) {exitFlag = true;} break;
	        }
	        if (exitFlag == true) {
				$.each(nonStandardFields, function() {
					if (this == elementName) {
				        if ($('input[name='+formNameDot+prevElementName+"]:checked'").val() == 'false') {exitFlag = false;}
					}				   
				});
	        }    	
        	prevElementName = elementName;			        	
        }		        	
    }
    var fieldRef = document.getElementById(firstElement);
    if (exitFlag) {
	    fieldRef = document.getElementById(prevElementName);
	}
    $(fieldRef).focus();				    
}

$(document).ready(function() {
	//This function will provide a default button for each form.
	//A warning will be displayed if a developer has created a form
	//with more than one default button.
	$("form").each(function(i) { 
	    var defaultButtons = $(this).find("button.default");
	    if(defaultButtons.length > 1){
	        alert("Warning.  There are too many default buttons on this page.  There can only be one default button per page.");
	        return;
	    } else if(defaultButtons.length == 1){
	        $(this).keypress(function (e) {  
			    if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {  
			    	$(defaultButtons).click();  
			    	return false;  
			    } else {  
			    	return true;  
			    }  
	        });  
	    }
	});
});

function convertSerializeArrayToNameValuePair(parms){
	var o= {};
	$.each(parms, function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	return o;
}
