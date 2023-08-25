function displayCheckoutData() {
    const checkoutData = JSON.parse(localStorage.getItem("checkoutData"));

    if (checkoutData) {
        const adminProductsContainer = document.getElementById("admin-products-container");

        checkoutData.forEach((checkout, index) => {
            const checkoutTableDiv = document.createElement("div");
            checkoutTableDiv.classList.add("checkout-table");
            checkoutTableDiv.innerHTML = `
                <h3 class="center-text">Order by ${checkout.username}:</h3>
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
                        ${checkout.items.map(item => `
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
            adminProductsContainer.appendChild(checkoutTableDiv);
        });
    }
}

displayCheckoutData();