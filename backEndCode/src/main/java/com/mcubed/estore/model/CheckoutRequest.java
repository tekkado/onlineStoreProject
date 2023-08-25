package com.mcubed.estore.model;

import java.util.List;

public class CheckoutRequest {
	private String username;
    private List<CartItem> items;

    // Default constructor
    public CheckoutRequest() {
    }

    // Parameterized constructor
    public CheckoutRequest(String username, List<CartItem> items) {
        this.username = username;
        this.items = items;
    }

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }
}
