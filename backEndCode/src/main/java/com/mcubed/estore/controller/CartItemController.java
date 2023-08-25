package com.mcubed.estore.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mcubed.estore.model.CartItem;
import com.mcubed.estore.model.CheckoutRequest;
import com.mcubed.estore.model.User;
import com.mcubed.estore.repository.UserDAO;
import com.mcubed.estore.service.CartItemService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5500")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;
    
    @Autowired
    private UserDAO userDao;
    
    @PostMapping("/checkout")
    public ResponseEntity<Map<String, Object>> checkout(@RequestBody CheckoutRequest checkoutRequest) {
        // Retrieve logged-in user's username from local storage
    	User loggedInUsername = userDao.findByUsername(checkoutRequest.getUsername());
    	

        if (loggedInUsername == null) {
            // User not logged in
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        boolean allItemsInserted = true;

        for (CartItem item : checkoutRequest.getItems()) {
            item.setUser(loggedInUsername); // Set the user for the cart item
            cartItemService.addCartItem(checkoutRequest.getUsername(), item);
           
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", allItemsInserted);

        return ResponseEntity.ok(response);
    }
    
}