package com.adtest.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class AccessHistory {
	
	public Integer id;
	private Registration registration;
	private Date accessDate;
	private String name;
	
    @Column         
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
    @Id @GeneratedValue
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column
	public Date getAccessDate() {
		return accessDate;
	}

	public void setAccessDate(Date accessDate) {
		this.accessDate = accessDate;
	}

	
	@ManyToOne()
	@JoinColumn(name="registration_id",nullable=true)
	public Registration getRegistration() {
		return registration;
	}

	public void setRegistration(Registration registration) {
		this.registration = registration;
	}
}
