<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Shopping Cart</title>
    <link href="${pageContext.request.contextPath}../../css/style.css" rel="stylesheet" type="text/css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">
                <!-- Your store logo goes here -->
                <a href="../html/index.html">
                    <img src="../assets/logo.png" alt="mCubed Logo">
                </a>
            </div>
            <div class="search-bar">
                <!-- Search bar for product search -->
                <input type="text" placeholder="Search products...">
                <button type="submit">Search</button>
            </div>
            <ul class="menu">
                <li><a href="index.html">Home</a></li>
                <li><a href="../views/catalog.html">Catalog</a></li>
                <li><a href="#">Cart</a></li>
                <li class="account-dropdown">
                    <!-- Dropdown menu for account options -->
                    <a href="#" class="account">Account</a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Sign In</a></li>
                        <li><a href="#">Register</a></li>
                        <!-- Show account options only if the user is signed in -->
                        <li><a href="#">Account Info</a></li>
                        <li><a href="#">Orders</a></li>
                        <li><a href="#">Settings</a></li>
                        <li><a href="#">Sign Out</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    </header>

    <main>
        <section class="cart">
            <h1>Your Shopping Cart</h1>
            <div class="cart-items">
                <!-- Loop through cart items and display details -->
            </div>
            <div class="cart-summary">
                <p>Total: $100.00</p>
                <button>Proceed to Checkout</button>
            </div>
        </section>
    </main>

    <footer>
        <div class="footer-content">

          <div class="footer-section">
            <h3>Contact Us</h3>
            <p>Email: mCubed@yorku.ca</p>
            <p>Phone: (647) 456-7890</p>
          </div>

          <div class="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="../views/catalog.html">Catalog</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h3>Connect with us</h3>
            <p>Stay updated on our professional careers!</p>
            <div class="social-icons">
                <div class="icon">
                  <a href="https://www.linkedin.com/in/shamsminalrahman/" target="_blank">
                    <img src="../assets/icon-linkedin.svg" alt="Minal's LinkedIn">
                    Minal's LinkedIn
                  </a>
                </div>
                <div class="icon">
                  <a href="https://www.linkedin.com/in/marko-zivkovic-99276022b/" target="_blank">
                    <img src="../assets/icon-linkedin.svg" alt="Marko's LinkedIn">
                    Marko's LinkedIn
                  </a>
                </div>
                <div class="icon">
                  <a href="https://www.linkedin.com/in/mostafa-bander/" target="_blank">
                    <img src="../assets/icon-linkedin.svg" alt="Mostafa's LinkedIn">
                    Mostafa's LinkedIn
                  </a>
                </div>
              </div>
          </div>

        </div>

        <div class="footer-bottom">
          <p>&copy; 2023 mCubed Online Store. All rights reserved.</p>
        </div>
      </footer>
</body>
</html>
