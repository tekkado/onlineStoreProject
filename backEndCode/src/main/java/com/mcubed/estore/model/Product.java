package com.mcubed.estore.model;

import jakarta.persistence.Column;
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
    
    @Column(name = "id")
    private Integer id;
    @Column(name = "prod_name")
    private String prodName;
    @Column(name = "price")
    private double price;
    @Column(name = "prod_description")
    private String prodDescription;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "category")
    private String category;
    @Column(name = "brand")
    private String brand;

    public Integer getId() {
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
    
    public String getCategory() {
        return category;
    }

    public String getBrand() {
        return brand;
    }

    public void setId(Integer id) {
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
    
    public void setCategory(String category) {
        this.category = category;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }
}