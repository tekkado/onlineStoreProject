package com.mcubed.estore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mcubed.estore.model.Address;
import com.mcubed.estore.service.AddressService;

@RestController
@RequestMapping("/addresses")
public class AddressController {

	private final AddressService addressService;

	@Autowired
	public AddressController(AddressService addressService) {
		this.addressService = addressService;
	}

	@PostMapping
	public ResponseEntity<Address> createAddress(@RequestBody Address address) {
		Address createdAddress = addressService.createAddress(address);
		return ResponseEntity.ok(createdAddress);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Address> getAddressById(@PathVariable Integer id) {
		Address address = addressService.getAddressById(id);
		if (address == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(address);
	}
}
