package com.adtest.controller;

import javax.servlet.ServletException;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller()
@RequestMapping("user")
public class UserController {
	
	
	@RequestMapping("findStuff")
	@PreAuthorize("hasRole('asdf')")
	public String findStuff(){
		return "userRoles";
	}
	
	
	
	@RequestMapping("getRoles")
	@PreAuthorize("hasRole('eCRV_Developers')")
	public ModelAndView getRoles(){
		ModelAndView mav = new ModelAndView("userRoles");
		return mav;
	}
	
	@ExceptionHandler(ServletException.class)
	public String handleTheException(){
		return "myError";
	}
}
