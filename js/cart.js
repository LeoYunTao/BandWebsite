// Search the for the item object based on the item name
function searchItem(itemName) {
    let itemx;
    info.items.forEach(item => {
        if (item.name === itemName) {
            itemx = item;
            return;
        }
    });
    return itemx;
}

// Change the price of the item based on the quantity
function changePrice(element) {
    const tr = element.parentNode.parentNode;

    const itemName = tr.querySelector('.item-name').textContent;
    const priceElement = tr.querySelector('.cart-price');

    const item = searchItem(itemName);

    let newPrice = (element.value * parseFloat(item.price)).toFixed(2);
    priceElement.textContent = "S$" + newPrice;
}

// Remove item from cart
function removeItem(element) {
    if (confirm('Are you sure you want to delete this item?')) {
        const tr = element.parentNode.parentNode;
        const itemName = tr.querySelector('.item-name').textContent;
        tr.parentNode.removeChild(tr);
        
        let tmp = sessionStorage.getItem("items").split(',');
        tmp.splice(tmp.indexOf(itemName), 1);
        sessionStorage.setItem("items", tmp.join(','));
        
        console.log(sessionStorage);
        prices = document.querySelectorAll(".cart-price");
        updatePrice();
    }
}

// Update the items in the cart to DOM
sessionStorage.getItem("items").split(',').forEach(itemName => {
    let item = searchItem(itemName);

    document.querySelector("#cart-body").innerHTML += `
     <tr>
        <td class="d-flex">
            <!-- <div class="background-image" style="background-image: url('img/shop/item-1.jpg');"></div> -->
            <h4 class="item-name">${item.name}</h4>
        </td>
        <td>
            <select name="size" id="size">
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>
        </td>
        <td>
            <input onchange="changePrice(this)" type="number" name="quantity" class="quantity" min="1" max="10" value="1">
        </td>
        <td>
            <p class="cart-price">S$${item.price}</p>
        </td>
        <td><button class="btn btn-red" onclick="removeItem(this)">Remove</button></td>
    </tr> `;
});

const totalPriceElement = document.querySelector('#total-price');
let totalPrice = 0;

let prices = document.querySelectorAll(".cart-price");

document.querySelectorAll(".quantity").forEach(element => {
    element.addEventListener("change", () => {
        updatePrice();
    });
});

updatePrice();

// Update the total price of all the items in the cart
function updatePrice() {
    totalPrice = 0;
    prices.forEach(price => {
        totalPrice += parseFloat(price.textContent.substring(2));
    });

    totalPriceElement.textContent = "S$" + totalPrice.toFixed(2);
}

// Checkout once 
function checkOut() {
    alert("Thank you for your purchase!");
    sessionStorage.clear();
}
