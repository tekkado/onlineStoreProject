package com.mcubed.estore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mcubed.estore.model.CartItem;

public interface CartItemDAO extends JpaRepository<CartItem, Integer>{

}
