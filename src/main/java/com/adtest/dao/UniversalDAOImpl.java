package com.adtest.dao;
import java.io.Serializable;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;


@Repository
public class UniversalDAOImpl implements UniversalDAO {

	HibernateTemplate hibernateTemplate;
	private SessionFactory sessionFactory;
	
	@Autowired
    @Required
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	
	@Override
	public List<?> getAll(Class<?> clazz) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(clazz);
		criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		return criteria.list();
	}

	@Override
	public Object get(Serializable id, Class<?> clazz) {
		 return sessionFactory.getCurrentSession().get(clazz, id);
	}

	@Override
	public Object save(Object objectToPersist) {
		return sessionFactory.getCurrentSession().merge(objectToPersist);
	}
	
	
	@Override
	public void delete(Object object) {
		sessionFactory.getCurrentSession().delete(object);
	}
	
	
}
