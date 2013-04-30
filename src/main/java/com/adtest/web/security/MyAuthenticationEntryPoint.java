package com.adtest.web.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;

public class MyAuthenticationEntryPoint extends
		LoginUrlAuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest request,
			HttpServletResponse response, AuthenticationException authException)
			throws IOException, ServletException {
		// TODO Auto-generated method stub
		super.commence(request, response, authException);
//		SavedRequest savedRequest = (SavedRequest)request.getSession().getAttribute(AbstractProcessingFilter.SPRING_SECURITY_SAVED_REQUEST_KEY);
		
	}

	@Override
	protected String buildRedirectUrlToLoginPage(HttpServletRequest request,
			HttpServletResponse response, AuthenticationException authException) {
		// TODO Auto-generated method stub
		
		SavedRequest savedRequest = new HttpSessionRequestCache().getRequest(request, response);
		String requestUrl = savedRequest.getRedirectUrl();
		request.setAttribute("myLogin", requestUrl);
		request.getParameter("myParm");
		String additionalQuery =""; 
		if(request.getParameter("myParm")!= null)
			additionalQuery = "?myParm="+request.getParameter("myParm");
		return super.buildRedirectUrlToLoginPage(request, response, authException)+additionalQuery;
	}

}
