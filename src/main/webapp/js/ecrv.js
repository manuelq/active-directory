function showLoading() { 
    $("#loadingbg").show(); 
    $("#loadingblock").show();
    var html = $("#loadingblock").html();
    $("#loadingblock").html("");
    $("#loadingblock").html(html);
    $("#loadingblock").center();
} 
	 
function hideLoading() { 
	$("#loadingbg").hide();
	$("#loadingblock").hide();
}

function openNewWindow(encodedURL, title) {
	//encodedURL - not the URL itself but its parameters must be encoded.
	var newWindow = window.open(encodedURL, "viewHtml", "toolbar=no,status=no,menubar=yes,scrollbars=yes,resizable=yes,directories=no,location=no,width=800,height=650");
	newWindow.document.title = title; //$(newWindow.document).attr("title", title)
}

function openNewNamedWindow(encodedURL, name) {
	window.open(encodedURL, name, "toolbar=no,status=no,menubar=yes,scrollbars=yes,resizable=yes,directories=no,location=no,width=800,height=650");
}

function openNewWindowWithHeader(encodedURL, title) {
	//encodedURL - not the URL itself but its parameters must be encoded.
	var newWindow = window.open(encodedURL, "viewHtml", "toolbar=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,directories=yes,location=yes,width=800,height=650");
	newWindow.document.title = title; 
}

function openPDFWindowNoProgressBar(context, url, title) {
	var pdfURL = escape(url);
	var newWindow = window.open(context+'/pdfviewer.jsp?pdfurl='+pdfURL+"&title="+escape(title), "viewPdf", "toolbar=no,status=no,menubar=no,scrollbars=no,resizable=yes,directories=no,location=no,width=650,height=600");
	newWindow.document.title = title;
}

//extend jquery to add center function
jQuery.fn.center = function () { 
    this.css("position","absolute"); 
    this.css("top", ( $(window).height() - this.outerHeight() ) / 2+$(window).scrollTop() + "px"); 
    this.css("left", ( $(window).width() - this.outerWidth() ) / 2+$(window).scrollLeft() + "px"); 
    return this; 
};
 
String.prototype.endsWith = function(str)
{return (this.match(str+"$")==str);};

String.prototype.startsWith = function(str)
{return (this.match("^"+str)==str);};

String.prototype.trim = function()
{return(this.replace(/^[\s\xA0]+/,  "").replace(/[\s\xA0]+$/, ""));};