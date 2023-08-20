package com.mcubed.estore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mcubed.estore.model.Address;

public interface AddressDAO extends JpaRepository<Address, Integer> {

}
