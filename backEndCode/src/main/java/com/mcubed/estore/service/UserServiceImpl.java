package com.mcubed.estore.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mcubed.estore.exceptions.EmailTakenException;
import com.mcubed.estore.exceptions.UsernameTakenException;
import com.mcubed.estore.model.CartItem;
import com.mcubed.estore.model.User;
import com.mcubed.estore.repository.UserDAO;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
    private UserDAO userDao;
	
	@Autowired
    private SessionService sessionService;

	@Transactional
	@Override
	public void registerUser(User user) {
		// TODO Auto-generated method stub
		if (userDao.existsByUsername(user.getUsername())) {
			throw new UsernameTakenException("Username is already taken.");
        }

        if (userDao.existsByEmail(user.getEmail())) {
        	throw new EmailTakenException("Email is already registered.");
        }
		userDao.save(user);
		sessionService.setLoggedInUser(user.getUsername());
	}

	@Override
	public boolean validateUser(String username, String accPassword) {
		// TODO Auto-generated method stub
		User existingUser = userDao.findByUsername(username);
		if (existingUser != null && existingUser.getPassword().equals(accPassword)) {
            sessionService.setLoggedInUser(username);
            return true;
        }

        return false;
	}
	
	@Override
	public void updateUserCart(Integer userId, List<CartItem> cartItems) {
		Long userIdLong = userId.longValue();

	    User user = userDao.findById(userIdLong).orElse(null);

	    if (user != null) {
	        user.setCartItems(cartItems);
	        userDao.save(user);
	    }
	}

}
