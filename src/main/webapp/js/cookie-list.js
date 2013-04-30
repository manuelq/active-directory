var cookieList = function(cookieName,options) {
	//When the cookie is saved the items will be a comma seperated string
	//So we will split the cookie by comma to get the original array
	var cookie = $.cookie(cookieName);
	//Load the items or a new array if null.
	var items = cookie ? cookie.split(/,/) : new Array();
	
	//Return a object that we can use to access the array.
	//while hiding direct access to the declared items array
	//this is called closures see http://www.jibbering.com/faq/faq_notes/closures.html
	return {
	    "add": function(val) {
	        //Add to the items.
	        items.push(val);
	        //Save the items to a cookie.
	        $.cookie(cookieName, items.join(","),options);
	    },
	    "clear": function() {
	        //clear the cookie.
	    	items = new Array();
	        $.cookie(cookieName, null,options);
	    },
	    "items": function() {
	        //Get all the items.
	        return items;
	    },
	    "hasValue": function(itemValue) {
	    	var val = jQuery.grep(items, function(value) {
				return value == itemValue;     
			});
	    	if(val.length > 0){
	    		return true;
	    	}  else {
	    		return false;
	    	}
	    },
	    "remove": function(removeItem) {
	    	items = jQuery.grep(items, function(value) {
	    				return value != removeItem;     
	    			});
	    	//save cookie
	    	$.cookie(cookieName, items.join(","),options);
	    }
	  }
}

