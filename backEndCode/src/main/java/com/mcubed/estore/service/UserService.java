package com.mcubed.estore.service;

import com.mcubed.estore.model.User;

public interface UserService {

	void registerUser(User user);
	boolean validateUser(String username, String accPassword);

}
