package com.mcubed.estore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "http://localhost:5500/frontEndCode/html")
public class BackEndCodeApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackEndCodeApplication.class, args);
	}

}
