package com.mcubed.estore.service;

import java.util.List;

import com.mcubed.estore.model.CartItem;

public interface CartItemService {
	void addCartItem(String username, CartItem cartItem);
    void updateCartItem(Integer cartItemId, CartItem cartItem);
    void removeCartItem(Integer cartItemId);
    List<CartItem> getCartItemsByUser(String username);
}
