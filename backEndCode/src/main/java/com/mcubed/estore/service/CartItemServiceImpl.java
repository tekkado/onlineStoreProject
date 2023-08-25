package com.mcubed.estore.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mcubed.estore.exceptions.ProductNotFoundException;
import com.mcubed.estore.exceptions.UserNotFoundException;
import com.mcubed.estore.model.CartItem;
import com.mcubed.estore.model.Product;
import com.mcubed.estore.model.User;
import com.mcubed.estore.repository.CartItemDAO;
import com.mcubed.estore.repository.ProductDAO;
import com.mcubed.estore.repository.UserDAO;

@Service
public class CartItemServiceImpl implements CartItemService {

	@Autowired
	private CartItemDAO cartItemDao;
	
	@Autowired
	private UserDAO userDao;
	
	@Autowired
	private ProductDAO prodDao;

	@Override
	public List<CartItem> getCartItemsByUser(String username) {
		return cartItemDao.findByUser_Username(username);
		// Implement the logic to retrieve cart items for a user
	}

	@Override
	public void addCartItem(String username, CartItem cartItem) {
		// TODO Auto-generated method stub
		User user = userDao.findByUsername(username);
		if (user != null) {
			String productName = cartItem.getProductName();
            Product product = prodDao.findRowByProductName(productName);
            System.out.print("poggers " + product);
            
            if (product != null) {
                cartItem.setUser(user);
                cartItem.setProduct(product);
                cartItemDao.save(cartItem);
            } else {
            	throw new ProductNotFoundException("Product not found with name: " + productName);
            }
		} else {
			throw new UserNotFoundException("User not found with username: " + username);
	    
		}
	}

	@Override
	public void updateCartItem(Integer cartItemId, CartItem cartItem) {
		// TODO Auto-generated method stub

	}

	@Override
	public void removeCartItem(Integer cartItemId) {
		// TODO Auto-generated method stub
	}
}
