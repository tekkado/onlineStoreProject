package com.mcubed.estore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mcubed.estore.model.Product;
import com.mcubed.estore.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5500")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts() {
    	List<Product> products = productService.getAllProducts();
        for (Product product : products) {
            // Use the correct getter to ensure consistency with the entity
            product.setName(product.getName());
            product.setDescription(product.getDescription());
            product.setImageUrl(product.getImageUrl());
            product.setCategory(product.getCategory());
            product.setBrand(product.getBrand());
        }
        return products;
    }
    
    @GetMapping("/featured")
    public List<Product> getFeaturedProducts() {
        return productService.getFeaturedProducts(6);
    }

}