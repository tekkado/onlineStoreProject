package com.mcubed.estore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mcubed.estore.model.User;
import com.mcubed.estore.repository.UserDAO;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
    private UserDAO userDao;

	@Override
	public void registerUser(User user) {
		// TODO Auto-generated method stub
		userDao.save(user);
	}

	@Override
	public boolean validateUser(String username, String accPassword) {
		// TODO Auto-generated method stub
		User existingUser = userDao.findByUsername(username);
        return existingUser != null && existingUser.getPassword().equals(accPassword);
	}

}
