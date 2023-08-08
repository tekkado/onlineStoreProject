package com.mcubed.estore.model;

import java.math.BigInteger;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    private BigInteger id;
    private String prodName;
    private double price;
    private String prodDescription;
    private String imageUrl;

    public BigInteger getId() {
        return id;
    }

    public String getName() {
        return prodName;
    }

    public double getPrice() {
        return price;
    }

    public String getDescription() {
        return prodDescription;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public void setName(String name) {
        this.prodName = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setDescription(String description) {
        this.prodDescription = description;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}