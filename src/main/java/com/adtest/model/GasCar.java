package com.adtest.model;

import java.math.BigDecimal;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;


@Entity
@DiscriminatorValue("Gas")
public class GasCar extends Car {
	BigDecimal gallons;

	public BigDecimal getGallons() {
		return gallons;
	}

	public void setGallons(BigDecimal gallons) {
		this.gallons = gallons;
	}
}
