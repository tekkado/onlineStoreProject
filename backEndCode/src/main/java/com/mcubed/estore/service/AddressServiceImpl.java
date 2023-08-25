package com.mcubed.estore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mcubed.estore.model.Address;
import com.mcubed.estore.repository.AddressDAO;

@Service
public class AddressServiceImpl implements AddressService {

    private final AddressDAO addressDao;

    @Autowired
    public AddressServiceImpl(AddressDAO addressDao) {
        this.addressDao = addressDao;
    }

    @Override
    public Address createAddress(Address address) {
        return addressDao.save(address);
    }

    @Override
    public Address getAddressById(Integer id) {
        return addressDao.findById(id).orElse(null);
    }
    // Implement other methods
}