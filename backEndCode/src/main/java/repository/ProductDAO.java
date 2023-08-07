package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import model.Product;

@Repository
public interface ProductDAO extends JpaRepository<Product, Long> {
    // You can add custom query methods here if needed
}