package com.adtest.model;

import java.math.BigDecimal;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Electric")
public class ElectricCar extends Car {
	BigDecimal watts;

	public BigDecimal getWatts() {
		return watts;
	}

	public void setWatts(BigDecimal watts) {
		this.watts = watts;
	}
}
