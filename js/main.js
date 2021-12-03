// Add session if it is not created
if (sessionStorage.getItem("items") === null) {
    sessionStorage.setItem("items", []);
}

// Update the ticket price
function updateTicketPrice(TICKETPRICE) {
    const ticketNumber = parseInt(document.querySelector("#ticket-number").value);
    const totalPrice = document.querySelector("#total-price");
    totalPrice.textContent = "S$" + parseFloat(ticketNumber * TICKETPRICE).toFixed(2);
}

// Hamburger menu setting the content to be visible on click
function setMenuActive() {
    const hamburgerContent = document.getElementById("hamburgerContent");
    hamburgerContent.className == "active" ? hamburgerContent.className = "hidden" : hamburgerContent.className = "active";
}

// Loads the items from info.json file
const info = JSON.parse(data);

if (window.location.pathname == "/IDAssignment1/" || window.localStorage.pathname == "/" || window.location.pathname.includes("/index.html")) {
    // Loads songs and members for the home page from info.json file
    const songs = document.getElementById("songs");
    const members = document.getElementById("members");

    info.songs.forEach(song => {
    songs.innerHTML += 
        `
        <div class="card card-song">
            <div class="card-img-top" style="background-image: url('${song.coverPATH}');">
                <button class="btn btn-round" onclick=playAudio(this)>
                    <img src="img/icons/play-arrow.svg" class="icon margin-center" alt="play button">
                </button>
            </div>
            <div class="card-body">
                <h3 title="${song.name}" class="song-name text-center medium prevent-overflow">${song.name}</h3>
            </div>
        </div>
        ` ;
    });

    info.members.forEach(member => {
        members.innerHTML += 
        `
        <div class="card card-member">
            <div class="card-img-top" style="background-image: url('${member.imagePATH}');"></div>
            <div class="card-body">
                <h3 class="medium">${member.name}</h3>
                <p class="margin-top-10">${member.role}</p>
            </div>
        </div>
        ` ;
    });

    // Update Ticket price on ticket number change
    const TICKETPRICE = 100;
    document.querySelector("#ticket-number").addEventListener("change", () => {
        updateTicketPrice(TICKETPRICE);
    });

    updateTicketPrice(TICKETPRICE);

    // minus the ticket onced booked and update the ticket remaining
    let ticketsLeft = 10;
    const ticketRemaining = document.querySelector("#ticket-remaining");
    ticketRemaining.textContent = ticketsLeft.toLocaleString();

    document.querySelector(".book-ticket").addEventListener("submit", event => {
        event.preventDefault();

        if (ticketsLeft - parseInt(document.querySelector("#ticket-number").value) < 0)
        {
            alert("Sorry, theres not enough tickets left!");
            return;
        }

        ticketsLeft -= parseInt(document.querySelector("#ticket-number").value);

        ticketRemaining.textContent = ticketsLeft.toLocaleString();
        alert("Your ticket has been booked!");
    });

}
else if (window.location.pathname.includes("/shop.html")) {
    const itemsElement = document.getElementById("items");

    let items = [];
    info.items.forEach(item => {
        items.push(item);
    });


    const shopSearchSort = document.querySelector("#shop-search-sort");
    
    checkValue(shopSearchSort, items, itemsElement);

    // find the item on the search bar
    const shopSearchInput = document.querySelector("#shop-search-input");
    shopSearchInput.addEventListener("keyup", event => {
        updateItems(items.filter(item => item.name.toLowerCase().includes(shopSearchInput.value.toLowerCase())), itemsElement);
    });

    shopSearchSort.addEventListener("change", event => {
        checkValue(event.target, items, itemsElement);
    });

}

// Sort the items based on the sort by category selected
function checkValue(element, items, itemsElement) {
    if (element.value == "NameAsc") {
        updateItems(items.sort((a, b) => a.name.localeCompare(b.name)), itemsElement);
    }
    else if (element.value == "NameDesc") {
        updateItems(items.sort((a, b) => b.name.localeCompare(a.name)), itemsElement);
    }
    else if (element.value == "MostPopular") {
        updateItems(items.sort((a, b) => parseInt(b.itemsSold) - parseInt(a.itemsSold)), itemsElement);
    }
    else if (element.value == "PriceHighest") {
        updateItems(items.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)), itemsElement);
    }
    else if (element.value == "PriceLowest") {
        updateItems(items.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)), itemsElement);
    }
}

// Update the items on the page
function updateItems(items, itemsElement) {
    console.log(sessionStorage.getItem("items"));
    itemsElement.innerHTML = "";
    items.forEach(item => {
        let x;
        let y;
        if (JSON.parse(sessionStorage.getItem("items").includes(item.name))) {
            x = "btn-red";
            y = "REMOVE ITEM";
        } else {
            x = "btn-outline-main";
            y = "ADD TO CART";
        }

        itemsElement.innerHTML += `<div class="card card-item">
        <div class="card-img-top" style="background-image: url('${item.imagePATH}');"></div>
        <div class="card-body">
            <div class="card-item-info d-flex">
                <span><img src="img/icons/category.svg" alt="category"><p class="d-inline-block">${item.category}</p></span>
                <span><img src="img/icons/sold.svg" alt="items sold"><p class="d-inline-block">${item.itemsSold}</p></span>
            </div>
            <h3 class="medium">${item.name}</h3>
            <p class="card-item-price">S$${item.price}</p>

            <button onclick="toggleState(this)" class="btn ${x}">${y}</button>
        </div>
    </div>
    `;
    });
}

