package com.mcubed.estore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mcubed.estore.model.User;

@Repository
public interface UserDAO extends JpaRepository<User, Long> {
	User findByUsername(String username);
}
