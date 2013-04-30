package com.adtest.service;

import java.io.Serializable;
import java.util.List;

import com.adtest.dao.UniversalDAO;

public interface UniversalService {
	public abstract List<?> getAll(Class<?> clazz);

	public abstract Object get(Serializable id, Class<?> clazz);

	public abstract Object save(Object objectToPersist);

	public abstract void delete(Object object);

	public abstract void setUniversalDao(UniversalDAO universalDao);

	public abstract UniversalDAO getUniversalDao();
}
