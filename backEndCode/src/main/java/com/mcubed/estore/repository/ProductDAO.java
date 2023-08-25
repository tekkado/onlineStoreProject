package com.mcubed.estore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mcubed.estore.model.Product;

@Repository
public interface ProductDAO extends JpaRepository<Product, Long> {
	
	@Query("SELECT DISTINCT p.category FROM Product p")
	List<String> findDistinctCategories();
    // You can add custom query methods here if needed
	
	@Query("SELECT DISTINCT p.brand FROM Product p")
	List<String> findDistinctBrands();

	Product findByProdName(String prodName);
}