let cartItemsElement = document.querySelector('#cart-items');

if (sessionStorage.getItem("items") === null) {
    sessionStorage.setItem("items", []);
}

displayItems();

function displayItems() {
    if (sessionStorage.getItem("items") === "") {
        cartItemsElement.textContent = 0;
    }
    else {
        cartItemsElement.textContent = sessionStorage.getItem("items").split(',').length;
    }
}

function toggleState(element) {
    const itemName = element.parentNode.querySelector("h3").textContent;
    
    if (element.classList.contains('btn-outline-main')) {
        element.classList.toggle('no-transition');
        element.className = "btn btn-red";
        element.textContent = "REMOVE ITEM";
        element.classList.toggle('no-transition');

        if (sessionStorage.getItem("items") === "") {
            sessionStorage.setItem("items", itemName);
        }
        else {
            sessionStorage.setItem("items", sessionStorage.getItem("items") + "," + itemName);
        }
        
        displayItems();
    }
    else if (element.classList.contains('btn-red')) {

        element.className = "btn btn-outline-main";
        element.textContent = "ADD TO CART";

        let tmp = sessionStorage.getItem("items").split(',');
        tmp.splice(tmp.indexOf(itemName), 1);
        sessionStorage.setItem("items", tmp.join(','));
        
        displayItems();
    }
}
