package com.mcubed.estore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mcubed.estore.model.CartItem;

public interface CartItemDAO extends JpaRepository<CartItem, Integer>{

	List<CartItem> findByUser_Username(String username);

}
