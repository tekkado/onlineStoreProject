CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prod_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    prod_description VARCHAR(500),
    image_url VARCHAR(255),
    category VARCHAR(50),
    brand VARCHAR(50)
);

DROP TABLE IF EXISTS product;