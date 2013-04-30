package com.adtest.service;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.adtest.dao.UniversalDAO;
import com.adtest.model.AccessHistory;

@Service
public class UniversalServiceImpl implements UniversalService {
	
	@Autowired(required=true)
	private UniversalDAO universalDao; 

	@Override
	public UniversalDAO getUniversalDao() {
		return universalDao;
	}

	@Override
	public void setUniversalDao(UniversalDAO universalDao) {
		this.universalDao = universalDao;
	}

	@Transactional(readOnly=false)
	@Override
	public List<?> getAll(Class<?> clazz) {
		if(!clazz.equals(AccessHistory.class)){
			AccessHistory hist = new AccessHistory();
			hist.setName("Accessing "+ clazz.getName());
			hist.setAccessDate(new Date());
			save(hist);
		}
		return universalDao.getAll(clazz);
	}

	@Transactional(readOnly=true)
	@Override
	public Object get(Serializable id, Class<?> clazz) {
		return universalDao.get(id,clazz);
	}

	@Transactional(readOnly=false)
	@Override
	public Object save(Object objectToPersist) {
		return universalDao.save(objectToPersist);
	}

	@Transactional(readOnly=false)
	@Override
	public void delete(Object object) {
		universalDao.delete(object);
	}

	
}
