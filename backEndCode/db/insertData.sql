INSERT INTO product (prod_name, price, prod_description, image_url, category, brand)
VALUES
('Little Prince', 19.99, 'A book for all ages', 'product-1.jpg', 'Books', 'Classic'),
('iPad', 499.99, 'A portable device for personal use', 'product-2.jpg', 'Electronics', 'Apple'),
('DELL XPS 13 Laptop', 1499.99, 'A laptop for personal use', 'product-3.jpg', 'Electronics', 'Dell'),
('iPhone 14', 1099.99, 'A cellular device for personal use', 'product-1.jpg', 'Electronics', 'Apple'),
('Nintendo Switch', 449.99, 'A portable gaming console', 'product-2.jpg', 'Electronics', 'Nintendo'),
('Insulated Travel Mug', 24.99, '12oz Stainless Steel Vacuum Insulated Coffee Travel Mug', 'product-3.jpg', 'Kitchen', 'Tim Hortons'),
('Harry Potter and the Sorcerer\'s Stone', 14.99, 'The first book in the Harry Potter series', 'product-4.jpg', 'Books', 'Fantasy'),
('Samsung Galaxy S22', 799.99, 'A flagship smartphone with advanced features', 'product-5.jpg', 'Electronics', 'Samsung'),
('PlayStation 5', 499.99, 'Next-gen gaming console with powerful graphics', 'product-6.jpg', 'Electronics', 'Sony'),
('Laptop Backpack', 49.99, 'Durable backpack with laptop compartment', 'product-7.jpg', 'Accessories', 'JanSport'),
('Gourmet Chocolate Box', 29.99, 'Assorted gourmet chocolates in a gift box', 'product-8.jpg', 'Food', 'Lindt'),
('Smart TV 55"', 699.99, 'High-definition smart TV with streaming capabilities', 'product-9.jpg', 'Electronics', 'LG'),
('Leather Wallet', 39.99, 'Genuine leather wallet with multiple compartments', 'product-10.jpg', 'Accessories', 'Fossil'),
('Fitness Tracker', 79.99, 'Wearable fitness tracker to monitor your health', 'product-11.jpg', 'Electronics', 'Fitbit'),
('Stainless Steel Cookware Set', 149.99, 'Complete set of stainless steel cookware', 'product-12.jpg', 'Kitchen', 'Cuisinart'),
('Wireless Bluetooth Earbuds', 59.99, 'True wireless earbuds with long battery life', 'product-13.jpg', 'Electronics', 'Sony'),
('Classic Analog Watch', 99.99, 'Elegant analog wristwatch for everyday wear', 'product-14.jpg', 'Accessories', 'Timex'),
('AirPods Pro', 199.99, 'Premium noise-canceling wireless earbuds', 'product-15.jpg', 'Electronics', 'Apple'),
('HD Webcam', 49.99, 'High-definition webcam for video conferencing', 'product-16.jpg', 'Electronics', 'Logitech'),
('Wireless Charging Pad', 29.99, 'Qi-compatible wireless charging pad', 'product-17.jpg', 'Electronics', 'Anker'),
('Portable Bluetooth Speaker', 39.99, 'Compact speaker with impressive sound quality', 'product-18.jpg', 'Electronics', 'JBL'),
('Cooking Utensil Set', 24.99, 'Set of essential cooking utensils', 'product-19.jpg', 'Kitchen', 'OXO'),
('Graphic Design Software', 249.99, 'Professional graphic design software suite', 'product-20.jpg', 'Software', 'Adobe'),
('Hiking Backpack', 79.99, 'Spacious backpack with hydration system compatibility', 'product-21.jpg', 'Outdoor', 'Osprey'),
('Wireless Gaming Mouse', 59.99, 'Precise wireless mouse for gaming enthusiasts', 'product-22.jpg', 'Electronics', 'Razer'),
('Yoga Mat', 34.99, 'Non-slip yoga mat for comfortable workouts', 'product-23.jpg', 'Fitness', 'Gaiam'),
('Coffee Grinder', 49.99, 'Electric coffee grinder for freshly ground beans', 'product-24.jpg', 'Kitchen', 'Breville'),
('Smart Home Hub', 89.99, 'Centralized hub for controlling smart home devices', 'product-25.jpg', 'Electronics', 'Google'),
('Wireless Noise-Canceling Headphones', 149.99, 'Premium headphones with active noise cancellation', 'product-26.jpg', 'Electronics', 'Bose'),
('Duffle Bag', 44.99, 'Sturdy duffle bag for travel and sports', 'product-27.jpg', 'Accessories', 'Under Armour'),
('Tim Hortons Keurig Coffee Cup', 29.99, 'Proud to serve you an amazing cup of coffee whether you enjoy it as your morning wakeup call or as an afternoon pick-me-up', 'product-27.jpg', 'Food', 'Tim Hortons'),
('Robot Vacuum Cleaner', 299.99, 'Autonomous vacuum cleaner for efficient cleaning', 'product-28.jpg', 'Home', 'iRobot');

INSERT INTO user_account (username, acc_password)
VALUES
('admin', 'AdminEECS4413');

SELECT * FROM product;
SELECT * FROM user_account;
SELECT * FROM address;