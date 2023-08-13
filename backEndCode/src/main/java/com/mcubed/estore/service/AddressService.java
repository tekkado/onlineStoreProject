package com.mcubed.estore.service;

import com.mcubed.estore.model.Address;

public interface AddressService {
	Address createAddress(Address address);
    Address getAddressById(Integer id);
}
