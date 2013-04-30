package com.adtest.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Version;

@Entity
public class Registration {
	
	private Integer id;
	private String username;
	private String password;
	private List<AccessHistory> accessHistory;
	private Address address;
	private Integer version;
	
	public Registration() {
	}

	@Id
	@GeneratedValue
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer user_id) {
		this.id = user_id;
	}
	
	@Version
	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	@Embedded
	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Column(name = "pwd")
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@OneToMany(mappedBy = "registration", cascade = { CascadeType.PERSIST,CascadeType.MERGE },orphanRemoval=true)
	public List<AccessHistory> getAccessHistory() {
		return accessHistory;
	}

	public void setAccessHistory(List<AccessHistory> accessHistory) {
		this.accessHistory = accessHistory;
	}
}