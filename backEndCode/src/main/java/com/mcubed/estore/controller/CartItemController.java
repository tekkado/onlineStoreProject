package com.mcubed.estore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mcubed.estore.service.CartItemService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5500")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    // Add more methods for cart actions (add, update, remove)
    
}