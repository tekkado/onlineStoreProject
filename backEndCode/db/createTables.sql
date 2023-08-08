CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prodName VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    prodDescription TEXT,
    imageUrl VARCHAR(255)
);

DROP TABLE IF EXISTS product;