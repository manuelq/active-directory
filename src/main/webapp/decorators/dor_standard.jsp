<%@taglib prefix="decorator" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
    <head>
    	<fmt:message key="application.title" var="pageTitle"/>
        <title><decorator:title default="${pageTitle}"/></title>
        <link rel="shortcut icon" href="<%= request.getContextPath() %>/images/mdor_blue/favicon.ico" type="image/vnd.microsoft.icon"/>
   		<meta HTTP-EQUIV="Pragma" content="no-cache"/>
		<meta HTTP-EQUIV="Expires" content="-1"/> 
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
		<link href="<%= request.getContextPath() %>/css/mdor_blue/base_style.css" rel="stylesheet" type="text/css"/>
		<link href="<%= request.getContextPath() %>/css/app_style.css" rel="stylesheet" type="text/css"/>
		<link href="<%= request.getContextPath() %>/css/mdor_blue/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css"/>
		<link href="<%= request.getContextPath() %>/css/mdor_blue/forms.css" rel="stylesheet" type="text/css"/>
		<link href="<%= request.getContextPath() %>/css/mdor_blue/tab-content.css" rel="stylesheet" type="text/css"/>
		<link href="<%= request.getContextPath() %>/css/jquery_overrides.css" rel="stylesheet" type="text/css"/>
		<link href="<%= request.getContextPath() %>/js/jgrowl/custom.jquery.jgrowl.css" rel="stylesheet" type="text/css"/>
		<script type="text/javascript" src="<%= request.getContextPath() %>/js/jquery-1.7.2.js"></script>	
		<script type="text/javascript" src="<%= request.getContextPath() %>/js/jquery-ui-1.8.16.custom.min.js"></script>
		<script type="text/javascript" src="<%= request.getContextPath() %>/js/jquery.livequery.js"></script>	
		<script type="text/javascript" src="<%= request.getContextPath() %>/js/DirtyForm.js"></script>
		<script type="text/javascript" src="<%= request.getContextPath() %>/js/ecrv.js"></script>
		<script type="text/javascript" src="<%= request.getContextPath() %>/js/jgrowl/jquery.jgrowl_minimized.js"></script>
		<decorator:head/>
    </head>
    <body leftmargin="0" topmargin="0" rightmargin="0" bottommargin="0" marginwidth="0" marginheight="0">
		<script type="text/javascript">
			$(document).ready(function(){
				$.ajaxSetup({cache:false});
			});
		</script>
		<div align="center">	   	
		   	<div id="wrapper" align="left">	
			   	<%@ include file="../includes/header.jsp" %>
			    <decorator:body />
		        <%@ include file="../includes/footer.jsp" %>	
		    </div>
	    </div>
    </body>	
</html>