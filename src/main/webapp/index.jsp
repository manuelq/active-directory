<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        welcome <sec:authentication property="principal.username" /> 
        roles:<sec:authentication property="principal.authorities"/>
        <br/>
        <sec:authorize ifAnyGranted="eCRV_Developers">
        	you have the role eCRV_Developers
        </sec:authorize>
    </body>
</html>
