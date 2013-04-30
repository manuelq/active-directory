package com.adtest.service;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

import junit.framework.Assert;

import org.hibernate.QueryTimeoutException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

import com.adtest.dao.UniversalDAO;
import com.adtest.model.AccessHistory;
import com.adtest.model.Car;
import com.adtest.model.GasCar;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath*:applicationContext-services.xml","classpath*:applicationContext-hibernate.xml"})
@TransactionConfiguration(transactionManager="transactionManager", defaultRollback=true)
public class UniversalServiceMockTest {
	
	@Autowired 
	@InjectMocks
	UniversalService universalService;
	
	
	@Autowired 
	@Spy
	UniversalDAO universalDao;
	
	@Before
	public void setup(){
		GasCar car = new GasCar();
		car.setName("prius");
		car.setGallons(new BigDecimal(11.2));
		universalService.save(car);
		
		MockitoAnnotations.initMocks(this);
		universalService.setUniversalDao(universalDao);   // This must be wired manually.  Mockito is proxying therefore creating a new class.  Reference is lost 
	}
	

	@Test(expected=QueryTimeoutException.class)
	public void testGetAllMockFailure() {
		try{
			Mockito.doThrow(new QueryTimeoutException(  "some exception", new SQLException(), "from dual" )).when(universalDao).getAll(Car.class);
			@SuppressWarnings({ "unused", "unchecked" })
			List<Car> results = (List<Car>) universalService.getAll(Car.class);
		}catch (RuntimeException e) {
			Assert.assertEquals(0, universalService.getAll(AccessHistory.class).size());
			throw e;
		}
	}
}
