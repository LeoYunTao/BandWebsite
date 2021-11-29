function setMenuActive() {
    const hamburgerContent = document.getElementById("hamburgerContent");
    hamburgerContent.className == "active" ? hamburgerContent.className = "hidden" : hamburgerContent.className = "active";
}

function playAudio(element) {
    const icon = element.firstElementChild;

    const audio = element.nextElementSibling;
    if (audio.paused) {
        icon.src = "img/icons/pause.svg";
        audio.play();
    }
    else {
        icon.src = "img/icons/play-arrow.svg";
        audio.pause();
    }

}

console.log(window.location.pathname);

const info = JSON.parse(data);

if (window.location.pathname == "/" || window.location.pathname == "/index.html") {
const songs = document.getElementById("songs");
const members = document.getElementById("members");

info.songs.forEach(song => {
   songs.innerHTML += 
    `
    <div class="card card-song">
        <div class="card-img-top" style="background-image: url('${song.coverPATH}');">
            <button onclick="playAudio(this)" class="btn btn-round">
                <img src="img/icons/play-arrow.svg" class="icon margin-center" alt="play button">
            </button>
            <audio src="${song.audioPATH}" type="audio/mp3" style="display: none;"></audio>
        </div>
        <div class="card-body">
            <h3 title="${song.name}" class="text-center medium prevent-overflow">${song.name}</h3>
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
}
else if (window.location.pathname == "/shop.html") {
const items = document.getElementById("items");
info.items.forEach(item => {
    items.innerHTML += 
    `
    <div class="card card-item">
        <div class="card-img-top" style="background-image: url('${item.imagePATH}');"></div>
        <div class="card-body">
            <div class="card-item-info d-flex">
                <span><img src="img/icons/category.svg" alt="category"><p class="d-inline-block">${item.category}</p></span>
                <span><img src="img/icons/sold.svg" alt="items sold"><p class="d-inline-block">${item.itemsSold}</p></span>
            </div>
            <h3 class="medium">${item.name}</h3>
            <p class="card-item-price">S$${item.price}</p>

            <button class="btn btn-outline-main">ADD TO CART</button>
        </div>
    </div>
    ` ;
});
}
