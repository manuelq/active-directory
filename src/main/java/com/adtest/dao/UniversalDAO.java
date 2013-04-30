package com.adtest.dao;

import java.io.Serializable;
import java.util.List;

public interface UniversalDAO {

	public abstract List<?> getAll(Class<?> clazz);

	public abstract Object get(Serializable id, Class<?> clazz);

	public abstract Object save(Object objectToPersist);

	public abstract void delete(Object object);

}