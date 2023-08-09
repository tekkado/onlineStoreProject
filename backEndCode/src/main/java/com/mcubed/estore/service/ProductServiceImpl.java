package com.mcubed.estore.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mcubed.estore.model.Product;
import com.mcubed.estore.repository.ProductDAO;

@Service
public class ProductServiceImpl implements ProductService {

	private final ProductDAO productDAO;

	@Autowired
	public ProductServiceImpl(ProductDAO productDAO) {
		this.productDAO = productDAO;
	}

	@Override
	public List<Product> getAllProducts() {
		return productDAO.findAll();
	}

	@Override
	public List<Product> getFeaturedProducts(int count) {
		// TODO Auto-generated method stub
		List<Product> allProducts = productDAO.findAll();
		
		if (count <= 0) {
	        throw new IllegalArgumentException("Count must be greater than zero");
	    }

		if (count >= allProducts.size()) {
			return allProducts;
		}

		List<Product> featuredProducts = new ArrayList<>();
		Random random = new Random();

		while (featuredProducts.size() < count) {
			Product randomProduct = allProducts.get(random.nextInt(allProducts.size()));
			if (!featuredProducts.contains(randomProduct)) {
				featuredProducts.add(randomProduct);
			}
		}

		return featuredProducts;
	}
}