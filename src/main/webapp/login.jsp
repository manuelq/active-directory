<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<body>
<h2>Login</h2>

    <%-- this form-login-page form is also used as the
         form-error-page to ask for a login again.
         --%>
    <c:if test="${not empty param.login_error}">
      <font color="red">
        Your login attempt was not successful, try again.<br/><br/>
        Reason: <c:out value="${SPRING_SECURITY_LAST_EXCEPTION.message}"/>.
      </font>
    </c:if>
	<c:if test="${not empty param.loggedout}">
		<script type="text/javascript">
		$.jGrowl("You have been successfully logged out.");
		</script>
	</c:if>
    <form name="f" action="<c:url value='j_spring_security_check'/>" method="POST">
      <table>
        <tr><td>User:</td><td><input type='text' name='j_username' value='<c:if test="${not empty param.login_error}"><c:out value="${SPRING_SECURITY_LAST_USERNAME}"/></c:if>'/></td></tr>
        <tr><td>Password:</td><td><input type='password' name='j_password'></td></tr>
        <tr><td>Remember Me:</td><td><input type="checkbox" name="_spring_security_remember_me" id="_spring_security_remember_me" /></td></tr>
        <tr><td colspan='2' align="right"><input name="submit" type="submit" value="Login" class="btn"></td></tr>
      </table>
		
    </form>
    
   VALUE: <c:out value="${myLogin}"/>
</body>