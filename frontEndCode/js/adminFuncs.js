function displayCheckoutData() {
    const checkoutTables = JSON.parse(localStorage.getItem("checkoutTables"));

    if (checkoutTables) {
        const adminProductsContainer = document.getElementById("admin-products-container");

        checkoutTables.forEach((checkoutItems, index) => {
            const checkoutTable = document.createElement("div");
            checkoutTable.classList.add("checkout-table");
            checkoutTable.innerHTML = `
                <h3 class="center-text">Checkout Table ${index + 1}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${checkoutItems.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.quantity}</td>
                                <td>${item.price}</td>
                                <td>${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            adminProductsContainer.appendChild(checkoutTable);
        });
    }
}

// Call the function to display checkout data on admin page load
displayCheckoutData();