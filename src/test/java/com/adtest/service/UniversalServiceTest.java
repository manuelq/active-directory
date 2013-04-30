package com.adtest.service;

import static org.junit.Assert.fail;

import java.math.BigDecimal;
import java.util.List;

import junit.framework.Assert;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

import com.adtest.model.Car;
import com.adtest.model.GasCar;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath*:applicationContext-services.xml","classpath*:applicationContext-hibernate.xml"})
@TransactionConfiguration(transactionManager="transactionManager", defaultRollback=true)
public class UniversalServiceTest {
	
	@Autowired 
	UniversalService universalService;
	
	@Before
	public void setup(){
		GasCar car = new GasCar();
		car.setName("prius");
		car.setGallons(new BigDecimal(11.2));
		universalService.save(car);
	}

	@Test
	public void testGetAll() {
		List<Car> results = (List<Car>) universalService.getAll(GasCar.class);
		Assert.assertTrue(results.size() > 0);
	}

	@Test
	public void testGet() {
		fail("Not yet implemented");
	}

	@Test
	public void testSave() {
		fail("Not yet implemented");
	}

	@Test
	public void testDelete() {
		fail("Not yet implemented");
	}

}
