CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prod_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    prod_description VARCHAR(500),
    image_url VARCHAR(255),
    category VARCHAR(50),
    brand VARCHAR(50)
);

CREATE TABLE address (
    id INT AUTO_INCREMENT PRIMARY KEY,
    street VARCHAR(100) NOT NULL,
    province VARCHAR(20) NOT NULL,
    country VARCHAR(20) NOT NULL,
    zip VARCHAR(20) NOT NULL,
    phone VARCHAR(20)
);

CREATE TABLE user_account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    username VARCHAR(255),
    acc_password VARCHAR(255),
    email VARCHAR(255),
    address_id INT,
    cart_id INT,
    FOREIGN KEY (address_id) REFERENCES address(id)
);

CREATE TABLE cart_item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (user_id) REFERENCES user_account(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

ALTER TABLE user_account ADD CONSTRAINT fk_user_cart FOREIGN KEY (cart_id) REFERENCES cart_item(id);

describe user_account;
describe cart_item;

ALTER TABLE user_account DROP FOREIGN KEY fk_user_cart;
ALTER TABLE cart_item DROP FOREIGN KEY user_id;
ALTER TABLE cart_item DROP FOREIGN KEY product_id;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS cart_item;
DROP TABLE IF EXISTS address;