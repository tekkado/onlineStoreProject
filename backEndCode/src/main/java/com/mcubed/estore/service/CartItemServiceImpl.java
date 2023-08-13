package com.mcubed.estore.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mcubed.estore.model.CartItem;
import com.mcubed.estore.repository.CartItemDAO;

@Service
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    private CartItemDAO cartItemDao;

    @Override
    public List<CartItem> getCartItemsByUser(Integer userId) {
		return null;
        // Implement the logic to retrieve cart items for a user
    }

	@Override
	public void addCartItem(Integer userId, CartItem cartItem) {
		// TODO Auto-generated method stub
		
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
