package com.mcubed.estore.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_account")
public class User {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	
	@Column(name = "id")
	private Integer id;
	@Column(name = "first_name")
    private String firstName;
	@Column(name = "last_name")
    private String lastName;
	@Column(name = "username")
    private String username;
	@Column(name = "acc_password")
    private String accPassword;
	@Column(name = "email")
    private String email;
	
	@ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

	@OneToMany(mappedBy = "user")
    private List<CartItem> cartItems;

    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return accPassword;
    }

    public void setPassword(String acc_password) {
        this.accPassword = acc_password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = cartItems;
    }
}
