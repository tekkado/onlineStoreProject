package com.mcubed.estore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mcubed.estore.model.CartItem;
import com.mcubed.estore.model.User;
import com.mcubed.estore.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5500")
public class UserController {
	@Autowired
	private UserService userService;

	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody User user) {
		try {
			user.setFirstName(user.getFirstName());
			user.setLastName(user.getLastName());
			user.setUsername(user.getUsername());
			user.setPassword(user.getPassword());
			user.setEmail(user.getEmail());

			userService.registerUser(user);

			return ResponseEntity.ok("User registered successfully.");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred during user registration.");
		}
	}

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        if (userService.validateUser(user.getUsername(), user.getPassword())) {
            return ResponseEntity.ok("Login successful.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials.");
        }
    }
    
    @PutMapping("/{userId}/cart")
    public ResponseEntity<String> updateCart(@PathVariable Integer userId, @RequestBody List<CartItem> cartItems) {
        // Assuming you have a service method to update the user's cart
        userService.updateUserCart(userId, cartItems);
        return ResponseEntity.ok("User cart updated successfully.");
    }
}