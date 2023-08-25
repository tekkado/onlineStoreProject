package com.mcubed.estore.service;

import java.util.List;

import com.mcubed.estore.model.CartItem;
import com.mcubed.estore.model.User;

public interface UserService {

	void registerUser(User user);
	boolean validateUser(String username, String accPassword);
	void updateUserCart(Integer userId, List<CartItem> cartItems);

}
