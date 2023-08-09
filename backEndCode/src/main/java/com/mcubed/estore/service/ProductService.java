package com.mcubed.estore.service;

import java.util.List;

import com.mcubed.estore.model.Product;

public interface ProductService {
    List<Product> getAllProducts();

	List<Product> getFeaturedProducts(int count);
}